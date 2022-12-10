import React, { forwardRef, createContext, useMemo, useState } from 'react';
import classNames from 'classnames';

import './Tabs.scss';

interface TabsContextInterface {
  activeTab: number | string;
  selectionFollowsFocus: boolean;
  setActiveTab: (tab: number | string) => void;
}

export const TabsContext = createContext<TabsContextInterface>({
  activeTab: 0,
  selectionFollowsFocus: false,
  setActiveTab: () => {},
});

type BaseTabsProps = {
  initialActiveTab?: number | string;
  activeTab?: number | string;
  selectionFollowsFocus?: boolean;
  onSelectTab?: (tab: number | string) => any;
  as?: React.ElementType;
};

export type TabProps = React.HTMLAttributes<HTMLElement> & BaseTabsProps;

const Tabs = forwardRef<JSX.Element, TabProps>(function Tabs(
  {
    className,
    as = 'div',
    initialActiveTab = 0,
    activeTab: controlledActiveTab,
    onSelectTab = () => {},
    selectionFollowsFocus = false,
    children,
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
        setActiveTab: (tab: number | string) => {
          onSelectTab(tab);
        },
      };
    } else {
      return {
        activeTab,
        selectionFollowsFocus,
        setActiveTab: (tab: number | string) => {
          setActiveTab(tab);
          onSelectTab(tab);
        },
      };
    }
  }, [activeTab, controlledActiveTab, selectionFollowsFocus, onSelectTab]);

  const Component = as;

  return (
    <TabsContext.Provider value={contextValue}>
      <Component ref={ref} className={classNames(className, 'tabs')} {...props}>
        {children}
      </Component>
    </TabsContext.Provider>
  );
});

export default Tabs;
