import React, { forwardRef } from 'react';
import classNames from 'classnames';

import './TabList.scss';

const END_KEY = 35;
const HOME_KEY = 36;
const LEFT_KEY = 37;
const RIGHT_KEY = 39;

interface BaseTabListProps {
  as?: React.ElementType;
}

export type TabListProps = React.HTMLAttributes<HTMLElement> & BaseTabListProps;

const TabList = forwardRef<JSX.Element, TabListProps>(function TabList(
  { className, as = 'div', onKeyDown: onKeyDownProp, children, ...props },
  ref
) {
  const Component = as;

  function onKeyDown(e: React.KeyboardEvent<HTMLElement>) {
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

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    onKeyDown(e);

    if (onKeyDownProp) {
      onKeyDownProp(e);
    }
  }

  return (
    <Component
      ref={ref}
      className={classNames(className, 'tablist')}
      role="tablist"
      {...props}
      onKeyDown={handleOnKeyDown}
    >
      {children}
    </Component>
  );
});

export default TabList;
