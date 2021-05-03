import React from 'react';
import { Form as FinalForm } from 'react-final-form';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import { mustNotBeEmpty, mustHaveEmailFormat } from '@app/utils/validators';

import InputField from '@app/components/Form/InputField/InputField';
import Buttons from '@app/components/Section/Contact/ContactForm/Buttons/Buttons';

import {
  form,
  formRow,
  formColumn,
  formColumnFullHeight
} from './Form.module.scss';

const Form = () => {
  const { formatMessage } = useIntl();
  const getTranslation = (inputElement: string) =>
    formatMessage({ id: `contact-form-${inputElement}` });

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

  return (
    <FinalForm
      onSubmit={() => console.log('submitting...')}
      initialValues={{}}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate className={form}>
          <fieldset>
            <legend>Contact form</legend>
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
                  showErrors={false}
                />
              </div>
            </div>
          </fieldset>

          <Buttons />
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        </form>
      )}
    />
  );
};

export default Form;
