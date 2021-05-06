import React, { useEffect, useState } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { error, ErrorType } from '@app/types/types';
import { mustNotBeEmpty, mustHaveEmailFormat } from '@app/utils/validators';
import { ReactComponent as IconWarn } from '@app/assets/icons/icon-warn.svg';

import InputField from '@app/components/Form/InputField/InputField';
import Buttons from '@app/components/Section/Contact/ContactForm/Buttons/Buttons';

import {
  form,
  formWarning,
  formWarningIcon,
  formRow,
  formColumn,
  formColumnFullHeight
} from './Form.module.scss';

const onSubmit = async (values) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });
  alert('...form submitted, ' + JSON.stringify(values, null, 2));
};

const Form = () => {
  const { formatMessage } = useIntl();

  const getTranslation = (inputElement: string) =>
    formatMessage({ id: `contact-form-${inputElement}` });

  const [formErrors, setFormErrors] = useState<{ [key: string]: ErrorType }>(
    {}
  );
  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);

  const subjectOptions = [
    {
      value: 'subject-a',
      label: formatMessage({ id: 'contact-form-subject-option-a' })
    },
    {
      value: 'subject-b',
      label: formatMessage({ id: 'contact-form-subject-option-b' })
    },
    {
      value: 'subject-c',
      label: formatMessage({ id: 'contact-form-subject-option-c' })
    },
    {
      value: 'subject-d',
      label: formatMessage({ id: 'contact-form-subject-option-d' })
    }
  ];

  const getFieldErrorMessage = (errors, field): string =>
    errors[field] &&
    formatMessage({
      id: errors[field].messageID
    });

  useEffect(() => {
    const getGlobalError = (errors: { [key: string]: ErrorType }) => {
      const errorsArray = Object.keys(errors).map((errKey) => {
        const { type } = errors[errKey] || { type: '' };
        return type;
      });

      const hashMap = errorsArray.reduce(
        (acc: { [key: string]: number }, current: string, index) => {
          acc[current] = (acc[current] || 0) + 1;
          return acc;
        },
        {}
      );

      const commonError = Object.keys(hashMap).length
        ? Object.keys(hashMap).reduce((acc, current) =>
            hashMap[current] > hashMap[acc] ? current : acc
          )
        : null;

      return commonError
        ? commonError === error.REQUIRED
          ? formatMessage({ id: `contact-form-global-error` })
          : formatMessage({ id: `contact-form-field-error-${commonError}` })
        : null;
    };

    setFormGlobalError(getGlobalError(formErrors));
  }, [formErrors, formatMessage]);

  return (
    <FinalForm
      onSubmit={onSubmit}
      initialValues={{}}
      render={({ handleSubmit, errors, submitFailed }) => {
        submitFailed && setFormErrors(errors);

        return (
          <form onSubmit={handleSubmit} noValidate className={form}>
            <fieldset>
              <legend>{formatMessage({ id: 'section-form-legend' })}</legend>
              {!submitFailed ? (
                <p>{formatMessage({ id: 'section-form-text' })}</p>
              ) : Object.keys(formErrors).length > 0 ? (
                <p className={formWarning}>
                  <IconWarn className={formWarningIcon} />
                  {formGlobalError}
                </p>
              ) : (
                <p>{formatMessage({ id: 'contact-form-global-no-errors' })}</p>
              )}

              <div className={formRow}>
                <div className={formColumn}>
                  <InputField
                    type="text"
                    fieldName="name"
                    label={getTranslation('name-label') + ': '}
                    placeholder={getTranslation('name-placeholder')}
                    fullWidth
                    disableAnimation
                    validators={[mustNotBeEmpty]}
                    errorMessage={getFieldErrorMessage(errors, 'name')}
                    showErrors={false}
                  />
                  <InputField
                    type="text"
                    fieldName="company"
                    label={getTranslation('company-label') + ': '}
                    placeholder={getTranslation('company-placeholder')}
                    fullWidth
                    disableAnimation
                    validators={[mustNotBeEmpty]}
                    errorMessage={getFieldErrorMessage(errors, 'company')}
                    showErrors={false}
                  />
                  <InputField
                    type="text"
                    fieldName="email"
                    label={getTranslation('email-label') + ': '}
                    placeholder={getTranslation('email-placeholder')}
                    fullWidth
                    disableAnimation
                    validators={[mustNotBeEmpty, mustHaveEmailFormat]}
                    errorMessage={getFieldErrorMessage(errors, 'email')}
                    showErrors={false}
                  />
                  <InputField
                    type="select"
                    fieldName="subject"
                    label={getTranslation('subject-label') + ': '}
                    defaultOption={getTranslation('subject-placeholder')}
                    fullWidth
                    options={subjectOptions}
                    disableAnimation
                    validators={[mustNotBeEmpty]}
                    errorMessage={getFieldErrorMessage(errors, 'subject')}
                    showErrors={false}
                  />
                </div>
                <div className={classNames(formColumn, formColumnFullHeight)}>
                  <InputField
                    type="text"
                    fieldName="comments"
                    label={getTranslation('comments-label') + ': '}
                    placeholder={getTranslation('comments-placeholder')}
                    fullWidth
                    disableAnimation
                    validators={[mustNotBeEmpty]}
                    multiline
                    rows={6}
                    errorMessage={getFieldErrorMessage(errors, 'comments')}
                    showErrors={false}
                  />
                </div>
              </div>
            </fieldset>
            <Buttons />
          </form>
        );
      }}
    />
  );
};

export default Form;
