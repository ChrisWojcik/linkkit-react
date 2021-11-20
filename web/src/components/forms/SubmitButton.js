import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Button from '@/components/Button';

const SubmitButton = forwardRef(function SubmitButton(
  // eslint-disable-next-line no-unused-vars
  { children, disabled, type, size, onClick: onClickProp, ...props },
  ref
) {
  return (
    <Button
      ref={ref}
      size={size}
      type="submit"
      aria-disabled={disabled}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }

        onClickProp(e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
});

SubmitButton.propTypes = {
  /**
   * is the button disabled?
   */
  disabled: PropTypes.bool,
  /**
   * Use a variant button size
   */
  size: PropTypes.oneOf(['small']),
};

SubmitButton.defaultProps = {
  disabled: false,
  onClick: () => {},
};

export default SubmitButton;
