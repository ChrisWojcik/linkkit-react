import React, { forwardRef } from 'react';
import Button, { ButtonProps } from '@/web/components/Button';

type FormSubmitButtonProps = Omit<ButtonProps, 'type' | 'as'>;

const FormSubmit = forwardRef<JSX.Element, FormSubmitButtonProps>(
  function FormSubmit({ disabled, onClick: onClickProp, ...props }, ref) {
    return (
      <Button
        ref={ref}
        type="submit"
        aria-disabled={disabled}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (disabled) {
            e.preventDefault();
            return;
          }

          if (onClickProp) {
            onClickProp(e);
          }
        }}
        {...props}
      />
    );
  }
);

export default FormSubmit;
