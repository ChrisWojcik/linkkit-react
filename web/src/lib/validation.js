import isEmail from 'validator/lib/isEmail';
import isURL from 'validator/lib/isURL';

export const required = (value) =>
  value ? undefined : 'This field is required.';

export const email = (value) => {
  const message = 'Please provide a valid email address.';

  return value && !isEmail(value) ? message : undefined;
};

export const url = (value) => {
  const message = 'Please provide a valid url.';

  return value && !isURL(value, { protocols: ['http', 'https'] })
    ? message
    : undefined;
};

export const minLength = (len) => {
  const message = `Must be at least ${len} character${len === 1 ? '' : 's'}.`;

  return function (value) {
    return value && value.length < len ? message : undefined;
  };
};

export const maxLength = (len) => {
  const message = `Must not be more than ${len} character${
    len === 1 ? '' : 's'
  }.`;

  return function (value) {
    return value && value.length > len ? message : undefined;
  };
};

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
