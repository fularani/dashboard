import * as React from 'react';
import {Page,PageGroup,PageNavigation,Toolbar,ToolbarContent,ToolbarItem,Masthead,MastheadToggle,MastheadMain,MastheadBrand,MastheadContent,PageSidebar,PageToggleButton, Nav, NavItem, NavList,Text,TextVariants } from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import FolderOpenIcon	from "@patternfly/react-icons/dist/esm/icons/adn-icon"
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import ResourceContent from './ResourceContent';

const NavSection = () => {

  const [activeItem, setActiveItem] = React.useState(0);

  const onSelect = (result: { itemId: number | string }) => {
    setActiveItem(result.itemId as number);
  };

  const [isNavOpen, setIsNavOpen] = React.useState(true);

  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const headerToolbar = (
    <Toolbar id="group-section-toolbar">
      <ToolbarContent>
        <ToolbarItem>header-tools</ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  const header = (
    <Masthead>
      <MastheadToggle>
        <PageToggleButton
          variant="plain"
          aria-label="Global navigation"
          isNavOpen={isNavOpen}
          onNavToggle={onNavToggle}
          id="group-section-nav-toggle"
        >
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand href="https://patternfly.org" target="_blank">
          Logo
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );

  const sidebar = <PageSidebar nav="Navigation" isNavOpen={isNavOpen} id="group-section-sidebar"/>;

  const navTitle=[(<div className='nav-content'><HelpIcon noVerticalAlign/><Text component={TextVariants.h2}>Dashboard</Text></div>),
                  (<div className='nav-content'><FolderOpenIcon noVerticalAlign/><Text component={TextVariants.h2}>Block</Text></div>),
                  (<div className='nav-content'><HelpIcon noVerticalAlign/><Text component={TextVariants.h2}>File</Text></div>),
                  (<div className='nav-content'><FolderOpenIcon noVerticalAlign/><Text component={TextVariants.h2}>Protection</Text></div>),
                  (<div className='nav-content'><HelpIcon noVerticalAlign/><Text component={TextVariants.h2}>Lifecycle</Text></div>),
                  (<div className='nav-content'><FolderOpenIcon noVerticalAlign/><Text component={TextVariants.h2}>Resources</Text></div>),
                  (<div className='nav-content'><HelpIcon noVerticalAlign/><Text component={TextVariants.h2}>Monitoring</Text></div>)];

  const nav=(<Nav onSelect={onSelect} variant="horizontal" theme="light" aria-label="Horizontal global nav">
                <NavList>
                    {Array.apply(0, navTitle).map(function(_item, index: number) {
                    const num = index;
                    return (
                        <NavItem
                           preventDefault
                           key={num}
                           itemId={num}
                           isActive={activeItem === num}
                           id={`horizontal-pageHeader-${num}`}
                           to={`#horizontal-pageHeader-${num}`}
                        >
                          {navTitle[num]}
                        </NavItem>
                    );
                    })}
                </NavList>
            </Nav>
        );

  return (
    <Page header={header} sidebar={sidebar}>
      <PageGroup>
      <PageNavigation children={nav}/>      
      {/* <PageSection variant={PageSectionVariants.light}>Resources</PageSection>       */}
      </PageGroup>
      <ResourceContent/>
    </Page>       
  )
}

export default NavSection