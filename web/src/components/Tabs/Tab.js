import React, { forwardRef, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TabsContext } from './Tabs';

import styles from './Tabs.module.scss';

const Tab = forwardRef(function Tab(
  {
    className,
    component,
    tab,
    onClick,
    onFocus,
    type,
    icon: iconProp,
    children,
    ...props
  },
  ref
) {
  const { activeTab, setActiveTab, selectionFollowsFocus } =
    useContext(TabsContext);

  const Component = component;
  type =
    typeof type !== 'undefined'
      ? type
      : Component === 'button'
      ? 'button'
      : null;

  const tabClassNames = classNames(className, styles.tab);

  const onTabClick = useCallback(
    (e) => {
      setActiveTab(tab);

      if (onClick) {
        onClick(e);
      }
    },
    [setActiveTab, tab, onClick]
  );

  const onTabFocus = useCallback(
    (e) => {
      if (selectionFollowsFocus && activeTab !== tab) {
        setActiveTab(tab);
      }

      if (onFocus) {
        onFocus(e);
      }
    },
    [setActiveTab, selectionFollowsFocus, activeTab, tab, onFocus]
  );

  const icon = iconProp && <span className={styles.icon}>{iconProp}</span>;

  return (
    <Component
      ref={ref}
      className={tabClassNames}
      type={type}
      role="tab"
      tabIndex={activeTab === tab ? null : '-1'}
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

Tab.propTypes = {
  /**
   * The index for this tab (should match a tabpanel in the same context)
   */
  tab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * Element placed before children
   */
  icon: PropTypes.node,
  /**
   * Use a custom element type
   */
  component: PropTypes.elementType,
};

Tab.defaultProps = {
  component: 'button',
};

export default Tab;
