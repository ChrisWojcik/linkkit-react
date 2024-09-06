import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { Link, LinkProps } from 'react-router-dom';

import './Button.scss';

export type BaseButtonProps = {
  variant?: 'primary' | 'secondary' | 'outlined' | 'white';
  size?: 'default' | 'small';
  block?: boolean;
  rounded?: boolean;
  icon?: React.ReactNode;
  as?: React.ElementType;
};

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  BaseButtonProps & { href?: undefined; to?: undefined };
export type ButtonAsAnchorProps = React.ComponentPropsWithoutRef<'a'> &
  BaseButtonProps & { to?: undefined };
export type ButtonAsRouterLinkProps = LinkProps &
  BaseButtonProps & { href?: undefined };

const Button = forwardRef<
  JSX.Element,
  ButtonProps | ButtonAsAnchorProps | ButtonAsRouterLinkProps
>(function Button(
  {
    children,
    className,
    variant = 'primary',
    size = 'default',
    block = false,
    rounded = false,
    type,
    icon: iconProp,
    as,
    ...props
  },
  ref
) {
  const buttonClasses = classNames(
    className,
    'button',
    variant === 'secondary' && 'button--variant-secondary',
    variant === 'outlined' && 'button--variant-outlined',
    variant === 'white' && 'button--variant-white',
    size === 'small' && 'button--size-small',
    block && 'button--block',
    rounded && 'button--rounded'
  );

  let Component: React.ElementType<any> = 'button';
  'href' in props && (Component = 'a');
  'to' in props && (Component = Link);
  as && (Component = as);

  const buttonType = type ? type : Component === 'button' ? 'button' : null;
  const icon = iconProp && <span className="icon">{iconProp}</span>;

  return (
    <Component ref={ref} className={buttonClasses} type={buttonType} {...props}>
      {icon}
      {children}
    </Component>
  );
});

export default Button;
