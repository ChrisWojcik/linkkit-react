import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const END_KEY = 35;
const HOME_KEY = 36;
const LEFT_KEY = 37;
const RIGHT_KEY = 39;

import styles from './Tabs.module.scss';

const TabList = forwardRef(function TabList(
  { className, component, children, ...props },
  ref
) {
  const Component = component;
  const tabListClassNames = classNames(className, styles.tablist);

  function onKeyDown(e) {
    const $list = e.currentTarget;
    const $tabs = Array.prototype.slice.call(
      $list.querySelectorAll('[role="tab"]')
    );
    const $activeTab = document.activeElement;
    const activeIndex = $tabs.indexOf($activeTab);
    const keyCode = e.keyCode;

    if ($tabs.length === 0 || activeIndex === -1) {
      return;
    }

    const prevIndex = activeIndex === 0 ? $tabs.length - 1 : activeIndex - 1;
    const nextIndex = (activeIndex + 1) % $tabs.length;

    switch (keyCode) {
      case HOME_KEY:
        e.preventDefault();
        $tabs[0].focus();
        break;
      case END_KEY:
        e.preventDefault();
        $tabs[$tabs.length - 1].focus();
        break;
      case LEFT_KEY:
        e.preventDefault();
        $tabs[prevIndex].focus();
        break;
      case RIGHT_KEY:
        e.preventDefault();
        $tabs[nextIndex].focus();
        break;
      default:
        break;
    }
  }

  return (
    <Component
      ref={ref}
      className={tabListClassNames}
      role="tablist"
      {...props}
      onKeyDown={onKeyDown}
    >
      {children}
    </Component>
  );
});

TabList.propTypes = {
  /**
   * Use a custom element type
   */
  component: PropTypes.elementType,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
};

TabList.defaultProps = {
  component: 'div',
};

export default TabList;
