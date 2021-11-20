import React, { forwardRef, createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TabList from './TabList';
import Tab from './Tab';
import TabPanel from './TabPanel';

import styles from './Tabs.module.scss';

export const TabsContext = createContext({
  activeTab: 0,
  selectionFollowsFocus: false,
  setActiveTab: () => {},
});

/**
 * Component for displaying sections of content, one at a time
 */
const Tabs = forwardRef(function Tabs(
  {
    className,
    component,
    initialActiveTab,
    activeTab: controlledActiveTab,
    children,
    onSelect,
    selectionFollowsFocus,
    ...props
  },
  ref
) {
  const [activeTab, setActiveTab] = useState(
    controlledActiveTab != null ? controlledActiveTab : initialActiveTab
  );

  const contextValue = useMemo(() => {
    if (controlledActiveTab != null) {
      return {
        activeTab: controlledActiveTab,
        selectionFollowsFocus,
        setActiveTab: (tab) => {
          onSelect(tab);
        },
      };
    } else {
      return {
        activeTab,
        selectionFollowsFocus,
        setActiveTab: (tab) => {
          setActiveTab(tab);
          onSelect(tab);
        },
      };
    }
  }, [activeTab, controlledActiveTab, selectionFollowsFocus, onSelect]);

  const Component = component;
  const tabsClassNames = classNames(className, styles.tabs);

  return (
    <TabsContext.Provider value={contextValue}>
      <Component ref={ref} className={tabsClassNames} {...props}>
        {children}
      </Component>
    </TabsContext.Provider>
  );
});

Tabs.propTypes = {
  /**
   * Use a custom element type
   */
  component: PropTypes.elementType,
  /**
   * Setting this prop makes this a "controlled" component.
   * Otherwise the state is managed internally
   */
  activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The initially active tab.
   * Ignored if this is a "controlled" component.
   */
  initialActiveTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Callback function run when the a different tab is selected.
   */
  onSelect: PropTypes.func,
  /**
   * Should moving focus to a tab with the arrow keys automatically
   * select that tab instead of requiring a manual click?
   *
   * see: https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_selection_follows_focus
   */
  selectionFollowsFocus: PropTypes.bool,
};

Tabs.defaultProps = {
  component: 'div',
  activeTab: null,
  initialActiveTab: 0,
  onSelect: function () {},
  selectionFollowsFocus: false,
};

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;

export default Tabs;
