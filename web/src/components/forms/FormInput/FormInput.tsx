import React, { useId, forwardRef } from 'react';
import classNames from 'classnames';

export interface BaseFormInputProps {
  label: string;
  hasError?: boolean;
  errorMessage?: string;
}

export type FormInputProps = React.ComponentPropsWithoutRef<'input'> &
  BaseFormInputProps;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput(
    { id, label, type = 'text', placeholder, hasError, errorMessage, ...props },
    ref
  ) {
    const generatedId = useId();
    const idAttribute = id || generatedId;

    return (
      <div className="mb-s">
        <label className="sr-only" htmlFor={idAttribute}>
          {label}
        </label>
        <input
          ref={ref}
          className={classNames(
            'form-control',
            hasError && 'form-control--has-error'
          )}
          id={idAttribute}
          type={type}
          placeholder={typeof placeholder !== 'undefined' ? placeholder : label}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${idAttribute}__error` : null}
          {...props}
        />
        {errorMessage && (
          <span id={`${idAttribute}__error`} className="form-error">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

export default FormInput;
