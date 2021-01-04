export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const mustNotBeEmpty = (value) => {
  if (!value) {
    return 'This field is required.';
  }
};

export const mustHaveEmailFormat = (value) => {
  console.log('mustHaveEmailFormat: ', value);
  const isValid = emailRegex.test(value);
  return !isValid ? 'Please enter a valid email address' : null;
};
