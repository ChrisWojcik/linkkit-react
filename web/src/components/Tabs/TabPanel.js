import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TabsContext } from './Tabs';

import styles from './Tabs.module.scss';

const TabPanel = forwardRef(function TabPanel(
  { className, component, tab, children, ...props },
  ref
) {
  const { activeTab } = useContext(TabsContext);

  const Component = component;
  const tabPanelClassNames = classNames(className, styles.tabpanel);

  return (
    <Component
      ref={ref}
      className={tabPanelClassNames}
      role="tabpanel"
      tabIndex="0"
      hidden={activeTab !== tab}
      {...props}
    >
      {activeTab === tab && children}
    </Component>
  );
});

TabPanel.propTypes = {
  /**
   * The identifier for this tabpanel (should match a tab in the same context)
   */
  tab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * Use a custom element type
   */
  component: PropTypes.elementType,
};

TabPanel.defaultProps = {
  component: 'div',
};

export default TabPanel;
