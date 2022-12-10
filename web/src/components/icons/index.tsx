import React, { forwardRef } from 'react';
import classNames from 'classnames';

import CommentSvg from './svg/comment.svg';
import ExternalLinkSvg from './svg/external-link.svg';
import GithubSvg from './svg/github.svg';
import EditSvg from './svg/edit.svg';
import FileTextSvg from './svg/file-text.svg';
import LinkSvg from './svg/link.svg';
import LogoutSvg from './svg/logout.svg';

import './icon.scss';

function createIconComponent({ displayName, Component }) {
  const Icon = forwardRef<
    React.ReactSVGElement,
    React.ComponentPropsWithoutRef<'svg'>
  >(function ({ className, ...props }, ref) {
    return (
      <Component
        ref={ref}
        className={classNames(className, 'icon')}
        aria-hidden="true"
        focusable="false"
        {...props}
      />
    );
  });

  Icon.displayName = displayName;
  return Icon;
}

export const IconComment = createIconComponent({
  displayName: 'IconComment',
  Component: CommentSvg,
});

export const IconExternalLink = createIconComponent({
  displayName: 'IconExternalLink',
  Component: ExternalLinkSvg,
});

export const IconGitHub = createIconComponent({
  displayName: 'IconGitHub',
  Component: GithubSvg,
});

export const IconEdit = createIconComponent({
  displayName: 'IconEdit',
  Component: EditSvg,
});

export const IconFileText = createIconComponent({
  displayName: 'IconFileText',
  Component: FileTextSvg,
});

export const IconLink = createIconComponent({
  displayName: 'IconLink',
  Component: LinkSvg,
});

export const IconLogout = createIconComponent({
  displayName: 'IconLogout',
  Component: LogoutSvg,
});
