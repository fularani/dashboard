import * as React from 'react';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import "./App.css";

interface Repository {
    name: string;
    branches: string | null;
    prs: string | null;
    workspaces: string;
    lastCommit: string;
  }

const App2 = () => {

  const repositories: Repository[] = [
        { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
        { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
        { name: 'one - 3', branches: 'two - 3', prs: 'three - 3', workspaces: 'four - 3', lastCommit: 'five - 3' }
    ];

  const columnNames = {
        name: 'Repositories',
        branches: 'Branches',
        prs: 'Pull requests',
        workspaces: 'Workspaces',
        lastCommit: 'Last commit'
    };

  return (
    <div>
        <TableComposable
        aria-label="Simple table"
        variant='compact'
      >
        <Thead>
          <Tr>
            <Th>{columnNames.name}</Th>
            <Th>{columnNames.branches}</Th>
            <Th>{columnNames.prs}</Th>
            <Th>{columnNames.workspaces}</Th>
            <Th>{columnNames.lastCommit}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {repositories.map(repo => (
            <Tr key={repo.name}>
              <Td dataLabel={columnNames.name}>
                <a href="#">{repo.name}</a>                
              </Td>
              <Td dataLabel={columnNames.branches}>{repo.branches}</Td>
              <Td dataLabel={columnNames.prs}>{repo.prs}</Td>
              <Td dataLabel={columnNames.workspaces}>{repo.workspaces}</Td>
              <Td dataLabel={columnNames.lastCommit}>{repo.lastCommit}</Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </div>
  )
}

export default App2