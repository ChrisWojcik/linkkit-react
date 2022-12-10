import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';

import { TabsContext } from './Tabs';

import './TabPanel.scss';

interface BaseTabPanelProps {
  tab: number | string;
  as?: React.ElementType;
}

export type TabPanelProps = React.HTMLAttributes<HTMLElement> &
  BaseTabPanelProps;

const TabPanel = forwardRef<JSX.Element, TabPanelProps>(function TabPanel(
  { className, as = 'div', tab, children, ...props },
  ref
) {
  const { activeTab } = useContext(TabsContext);

  const Component = as;

  return (
    <Component
      ref={ref}
      className={classNames(className, 'tabpanel')}
      role="tabpanel"
      tabIndex="0"
      hidden={activeTab !== tab}
      {...props}
    >
      {activeTab === tab && children}
    </Component>
  );
});

export default TabPanel;
