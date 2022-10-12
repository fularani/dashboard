import * as React from 'react';
import {PageSection, PageSectionVariants, Text, TextVariants,TextContent,Button,Tabs,Tab,TabTitleText,TabContent,TabContentBody,Panel, PanelMain, PanelMainBody, PanelHeader} from '@patternfly/react-core';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

interface Repository {
    name: string;
    branches: string;
    prs: string;
    workspaces: string;
    lastCommit: string;
}

const ResourceContent = () => {

  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const contentRef1: React.RefObject<HTMLElement> = React.createRef<HTMLElement>();
  const contentRef2: React.RefObject<HTMLElement> = React.createRef<HTMLElement>();

  // Toggle currently active tab
  const handleTabClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: number | string) => {
    event.preventDefault();
    setActiveTabKey(eventKey)
  };

  const repositories: Repository[] = [
    { name: 'Global', branches: '', prs: '', workspaces: '3', lastCommit: '1' },
    // { name: 'a', branches: 'two', prs: 'k', workspaces: 'four', lastCommit: 'five' },    
  ];

  const columnNames = {
    name: 'Node Pool Name',
    branches: 'Created By',
    prs: 'Created Date',
    workspaces: '#Nodes',
    lastCommit: '#Users'
  };

  const isRepoSelectable = (repo: Repository) => repo.name !== 'a'; // Arbitrary logic for this example
  const selectableRepos = repositories.filter(isRepoSelectable);

  // In this example, selected rows are tracked by the repo names from each row. This could be any unique identifier.
  // This is to prevent state from being based on row order index in case we later add sorting.
  const [selectedRepoNames, setSelectedRepoNames] = React.useState<string[]>([]);
  const setRepoSelected = (repo: Repository, isSelecting = true) =>
    setSelectedRepoNames(prevSelected => {
      const otherSelectedRepoNames = prevSelected.filter(r => r !== repo.name);
      return isSelecting && isRepoSelectable(repo) ? [...otherSelectedRepoNames, repo.name] : otherSelectedRepoNames;
    });
  const selectAllRepos = (isSelecting = true) =>
    setSelectedRepoNames(isSelecting ? selectableRepos.map(r => r.name) : []);
  const areAllReposSelected = selectedRepoNames.length === selectableRepos.length;
  const isRepoSelected = (repo: Repository) => selectedRepoNames.includes(repo.name);

  // To allow shift+click to select/deselect multiple rows
  const [recentSelectedRowIndex, setRecentSelectedRowIndex] = React.useState<number | null>(null);
  const [shifting, setShifting] = React.useState(false);

  const onSelectRepo = (repo: Repository, rowIndex: number, isSelecting: boolean) => {
    // If the user is shift + selecting the checkboxes, then all intermediate checkboxes should be selected
    if (shifting && recentSelectedRowIndex !== null) {
      const numberSelected = rowIndex - recentSelectedRowIndex;
      const intermediateIndexes =
        numberSelected > 0
          ? Array.from(new Array(numberSelected + 1), (_x, i) => i + recentSelectedRowIndex)
          : Array.from(new Array(Math.abs(numberSelected) + 1), (_x, i) => i + rowIndex);
      intermediateIndexes.forEach(index => setRepoSelected(repositories[index], isSelecting));
    } else {
      setRepoSelected(repo, isSelecting);
    }
    setRecentSelectedRowIndex(rowIndex);
  };

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShifting(true);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShifting(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);


  return (
    <div>
        <PageSection variant={PageSectionVariants.default} className="page-section-01">
            <TextContent><Text component={TextVariants.h1}>Resources</Text></TextContent>
            <Button variant="primary">Discover Resources</Button>
        </PageSection>
        <PageSection variant={PageSectionVariants.default} className="page-section-02"> 
            <Tabs activeKey={activeTabKey} variant="default" onSelect={handleTabClick} isBox={true} aria-label="Tabs in the body and padding example" role="region" className='tabs'>
                <Tab
                   eventKey={0}
                   title={<TabTitleText>All Resources</TabTitleText>}
                   tabContentId="tab1SectionBodyPadding"
                   tabContentRef={contentRef1}
                />
                <Tab
                   eventKey={1}
                   title={<TabTitleText>Node Pools</TabTitleText>}
                   tabContentId="tab2SectionBodyPadding"
                   tabContentRef={contentRef2}
                />        
            </Tabs>
        <div className='tab-content-container'>
                <TabContent eventKey={0} id="tab1SectionBodyPadding" ref={contentRef1}>
                    <TabContentBody hasPadding> 
                    <Panel variant="bordered">
                            <PanelHeader className='panel-header'>
                                <div className='panel-header-01'>
                                <Button variant="primary" className='btn-01'>Run Inventary</Button>
                                <Button variant="tertiary" className='btn-02'>Remove</Button>
                                <Button variant="tertiary" className='btn-03'>Update Resources</Button>
                                <Button variant="tertiary" className='btn-04'>Export report</Button>
                                <Button variant="tertiary" className='btn-05'>Change Resource State to</Button>
                                </div>                                
                            </PanelHeader>
                        <PanelMain>
                            <PanelMainBody>
                                panel table
                            </PanelMainBody>
                        </PanelMain>
                    </Panel>
                    </TabContentBody>
                    </TabContent>
                    <TabContent
                        eventKey={1}
                        id="tab2SectionBodyPadding"
                        ref={contentRef2}
                        hidden
                        >
                    <TabContentBody hasPadding>
                        <Panel variant="bordered">
                            <PanelHeader className='panel-header'>
                                <div className='panel-header-02'>
                                <Button variant="primary" className='btn-01'>Create</Button>
                                <Button variant="tertiary" className='btn-02'>Modify</Button>
                                <Button variant="tertiary" className='btn-03'>View Details</Button>
                                <Button variant="tertiary" className='btn-04'>Remove</Button>
                                </div>                                
                            </PanelHeader>
                        <PanelMain>
                            <PanelMainBody>
                            <TableComposable aria-label="Selectable table">
                                <Thead>
                                    <Tr>
                                    <Th select={{onSelect: (_event, isSelecting) => selectAllRepos(isSelecting), isSelected: areAllReposSelected}}/>
                                    <Th>{columnNames.name}</Th>
                                    <Th>{columnNames.branches}</Th>
                                    <Th>{columnNames.prs}</Th>
                                    <Th>{columnNames.workspaces}</Th>
                                    <Th>{columnNames.lastCommit}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                {repositories.map((repo, rowIndex) => (
                                    <Tr key={repo.name}>
                                        <Td select={{rowIndex,onSelect: (_event, isSelecting) => onSelectRepo(repo, rowIndex, isSelecting),isSelected: isRepoSelected(repo),disable: !isRepoSelectable(repo)}}/>
                                        <Td dataLabel={columnNames.name}>{repo.name}</Td>
                                        <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
                                        <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
                                        <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
                                        <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
                                    </Tr>
                                ))}
                                </Tbody>
                            </TableComposable>
                            </PanelMainBody>
                        </PanelMain>
                        </Panel>
                    </TabContentBody>
                </TabContent>        
        </div>
        </PageSection>
    </div>    
  )
}

export default ResourceContent