import React, { forwardRef, useContext, useCallback } from 'react';
import classNames from 'classnames';

import { TabsContext } from './Tabs';

import './Tab.scss';

interface BaseTabProps {
  tab: number | string;
  icon?: React.ReactNode;
  as?: React.ElementType;
}

export type TabProps = React.HTMLAttributes<HTMLButtonElement> & BaseTabProps;

const Tab = forwardRef<JSX.Element, TabProps>(function Tab(
  {
    className,
    as = 'button',
    tab,
    onClick,
    onFocus,
    icon: iconProp,
    children,
    ...props
  },
  ref
) {
  const { activeTab, setActiveTab, selectionFollowsFocus } =
    useContext(TabsContext);

  const Component = as;

  const onTabClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setActiveTab(tab);

      if (onClick) {
        onClick(e);
      }
    },
    [setActiveTab, tab, onClick]
  );

  const onTabFocus = useCallback(
    (e: React.FocusEvent<HTMLButtonElement>) => {
      if (selectionFollowsFocus && activeTab !== tab) {
        setActiveTab(tab);
      }

      if (onFocus) {
        onFocus(e);
      }
    },
    [setActiveTab, selectionFollowsFocus, activeTab, tab, onFocus]
  );

  const icon = iconProp && <span className="icon">{iconProp}</span>;

  return (
    <Component
      ref={ref}
      className={classNames(className, 'tab')}
      type={Component === 'button' ? 'button' : null}
      role="tab"
      tabIndex={activeTab === tab ? 0 : -1}
      aria-selected={activeTab === tab ? 'true' : 'false'}
      onClick={onTabClick}
      onFocus={onTabFocus}
      {...props}
    >
      {icon}
      {children}
    </Component>
  );
});

export default Tab;
