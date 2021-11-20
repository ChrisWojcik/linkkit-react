import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field } from 'react-final-form';

import styles from './forms.module.scss';
import utilityStyles from '@/styles/utilities.module.scss';

const TextField = forwardRef(function Input(
  {
    className,
    name,
    id,
    label,
    type,
    placeholder,
    disabled,
    multiline,
    hideErrors,
    shouldRender,
    ...props
  },
  ref
) {
  return (
    <Field name={name}>
      {({ input, meta }) =>
        shouldRender && (
          <div className={utilityStyles['mb-s']}>
            <label className={utilityStyles.srOnly} htmlFor={id}>
              {label}
            </label>
            {multiline ? (
              <textarea
                ref={ref}
                {...input}
                id={id}
                className={classNames(className, styles.formControl, {
                  [styles.hasError]: !hideErrors && meta.error && meta.touched,
                })}
                placeholder={
                  typeof placeholder !== 'undefined' ? placeholder : label
                }
                disabled={disabled}
                {...props}
              />
            ) : (
              <input
                ref={ref}
                {...input}
                id={id}
                className={classNames(className, styles.formControl, {
                  [styles.hasError]: !hideErrors && meta.error && meta.touched,
                })}
                type={type}
                placeholder={
                  typeof placeholder !== 'undefined' ? placeholder : label
                }
                disabled={disabled}
                {...props}
              />
            )}
            {!hideErrors && meta.error && meta.touched && (
              <span className={styles.formError}>{meta.error}</span>
            )}
          </div>
        )
      }
    </Field>
  );
});

TextField.propTypes = {
  /**
   * The name of the form field
   */
  name: PropTypes.string.isRequired,
  /**
   * The id of the form field (should be unique on the page)
   */
  id: PropTypes.string.isRequired,
  /**
   * The label for the form field
   */
  label: PropTypes.string.isRequired,
  /**
   * The placeholer for the form field
   * defaults to the label if not specified
   * pass 'null' to omit it entirely
   */
  placeholder: PropTypes.string,
  /**
   * If true, renders a textarea instead of an input
   */
  multiline: PropTypes.bool,
  /**
   * The type of input (ignored if multiline is true)
   */
  type: PropTypes.oneOf(['text', 'email', 'url', 'password', 'tel']),
  /**
   * Is the input disabled?
   */
  disabled: PropTypes.bool,
  /**
   * Optionally hide the display of error messages
   */
  hideErrors: PropTypes.bool,
  /**
   * Optionally provide a conditional check for whether the field
   * should render
   */
  shouldRender: PropTypes.bool,
};

TextField.defaultProps = {
  type: 'text',
  multiline: false,
  hideErrors: false,
  shouldRender: true,
};

export default TextField;
