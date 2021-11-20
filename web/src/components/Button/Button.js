import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Button.module.scss';

/**
 * Primary UI component for user interaction
 */
const Button = forwardRef(function Button(
  {
    children,
    className,
    variant,
    size,
    block,
    rounded,
    type,
    icon: iconProp,
    component,
    ...props
  },
  ref
) {
  const buttonClasses = classNames(
    className,
    styles.button,
    variant === 'secondary' && styles.variantSecondary,
    variant === 'outlined' && styles.variantOutlined,
    variant === 'white' && styles.variantWhite,
    size === 'small' && styles.sizeSmall,
    block && styles.block,
    rounded && styles.rounded
  );

  const Component = component ? component : props.href ? 'a' : 'button';

  type =
    typeof type !== 'undefined'
      ? type
      : Component === 'button'
      ? 'button'
      : null;

  const icon = iconProp && <span className={styles.icon}>{iconProp}</span>;

  return (
    <Component ref={ref} className={buttonClasses} type={type} {...props}>
      {icon}
      {children}
    </Component>
  );
});

Button.propTypes = {
  /**
   * Use a variant button style
   */
  variant: PropTypes.oneOf(['secondary', 'outlined', 'white']),
  /**
   * Use a variant button size
   */
  size: PropTypes.oneOf(['small']),
  /**
   * Is the button full width?
   */
  block: PropTypes.bool,
  /**
   * Should the button have fully rounded corners?
   */
  rounded: PropTypes.bool,
  /**
   * Element placed before children
   */
  icon: PropTypes.node,
  /**
   * Use a custom element type (e.g. "a")
   */
  component: PropTypes.elementType,
};

Button.defaultProps = {
  block: false,
  rounded: false,
};

export default Button;
