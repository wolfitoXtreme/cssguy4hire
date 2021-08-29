import { ErrorType, error } from '@app/types/types';

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const mustNotBeEmpty = (value): ErrorType => {
  const isValid = !value || value.length === 0;
  return isValid
    ? {
        type: error.REQUIRED,
        messageID: 'contact-form-field-error-required'
      }
    : undefined;
};

export const mustHaveEmailFormat = (value): ErrorType => {
  const isValid = emailRegex.test(value);
  return !isValid
    ? {
        type: error.EMAIL,
        messageID: 'contact-form-field-error-email'
      }
    : undefined;
};

export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
