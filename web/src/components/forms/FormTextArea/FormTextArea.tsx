import React, { useId, forwardRef } from 'react';
import classNames from 'classnames';

export interface BaseFormTextAreaProps {
  label: string;
  hasError?: boolean;
  errorMessage?: string;
}

export type FormTextAreaProps = React.ComponentPropsWithoutRef<'textarea'> &
  BaseFormTextAreaProps;

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  function FormTextArea(
    { id, label, placeholder, hasError, errorMessage, ...props },
    ref
  ) {
    const generatedId = useId();
    const idAttribute = id || generatedId;

    return (
      <div className="mb-s">
        <label className="sr-only" htmlFor={idAttribute}>
          {label}
        </label>
        <textarea
          className={classNames(
            'form-control',
            hasError && 'form-control--has-error'
          )}
          id={idAttribute}
          ref={ref}
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

export default FormTextArea;
