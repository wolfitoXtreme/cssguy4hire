import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { useIntl } from 'react-intl';
import ReCAPTCHA from 'react-google-recaptcha';

import axios from 'axios';
import classNames from 'classnames';

import { error, ErrorType } from '@app/types/types';
import { ContactFormContext } from '@app/context/ContactFormContext/ContactFormContext';
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

const Form: React.FC = () => {
  const { formatMessage } = useIntl();

  const {
    toggleResponse,
    setResponseMessage,
    enableSubmit,
    setEnableSubmit
  } = useContext(ContactFormContext);

  const [formGlobalError, setFormGlobalError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: ErrorType }>(
    {}
  );
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  const responseErrorMsg = formatMessage({
    id: 'contact-form-response-error'
  });

  const responseSuccessMsg = formatMessage({
    id: 'contact-form-response-success'
  });

  const getFieldTranslation = (inputElement: string) =>
    formatMessage({ id: `contact-form-${inputElement}` });

  const subjectOptions = [
    {
      value: 'subject-option-a',
      label: formatMessage({ id: 'contact-form-subject-option-a' })
    },
    {
      value: 'subject-option-b',
      label: formatMessage({ id: 'contact-form-subject-option-b' })
    },
    {
      value: 'subject-option-c',
      label: formatMessage({ id: 'contact-form-subject-option-c' })
    },
    {
      value: 'subject-option-d',
      label: formatMessage({ id: 'contact-form-subject-option-d' })
    }
  ];

  const getFieldErrorMessage = (errors, field): string =>
    errors[field] &&
    formatMessage({
      id: errors[field].messageID
    });

  const onSubmit = async (values) => {
    const token = await recaptchaRef?.current?.executeAsync();
    recaptchaRef?.current?.reset();

    setEnableSubmit(false);

    axios({
      method: 'POST',
      url: '/send',
      data: { ...values, token }
    })
      .then((response) => {
        const {
          data: { status, error: errorMsg }
        } = response;

        if (status === 'success') {
          setResponseMessage({
            message: responseSuccessMsg
          });
          toggleResponse();
        } else {
          setResponseMessage({
            message: responseErrorMsg,
            error: errorMsg
          });
          toggleResponse();
        }
      })
      .catch((error) => {
        setResponseMessage({
          message: responseErrorMsg,
          error: error.message
        });
        toggleResponse();
      });
  };

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
    <>
      <FinalForm
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, errors, submitting, submitFailed }) => {
          submitFailed && setFormErrors(errors);

          return (
            <form
              onSubmit={handleSubmit}
              onReset={() => {
                setFormGlobalError(null);
                setFormErrors({});
              }}
              noValidate
              className={form}
            >
              <fieldset>
                <legend>{formatMessage({ id: 'section-form-legend' })}</legend>

                {!submitFailed && !formGlobalError && (
                  <p>{formatMessage({ id: 'section-form-text' })}</p>
                )}

                {submitFailed && Object.keys(formErrors).length === 0 && (
                  <p>
                    {formatMessage({ id: 'contact-form-global-no-errors' })}
                  </p>
                )}

                {formGlobalError && (
                  <p className={formWarning}>
                    <IconWarn className={formWarningIcon} />
                    {formGlobalError}
                  </p>
                )}

                <div className={formRow}>
                  <div className={formColumn}>
                    <InputField
                      type="text"
                      fieldName="name"
                      label={getFieldTranslation('name-label') + ': '}
                      placeholder={getFieldTranslation('name-placeholder')}
                      fullWidth
                      disableAnimation
                      validators={[mustNotBeEmpty]}
                      disabled={!enableSubmit}
                      errorMessage={getFieldErrorMessage(errors, 'name')}
                      showErrors={false}
                    />
                    <InputField
                      type="text"
                      fieldName="company"
                      label={getFieldTranslation('company-label') + ': '}
                      placeholder={getFieldTranslation('company-placeholder')}
                      fullWidth
                      disableAnimation
                      validators={[mustNotBeEmpty]}
                      disabled={!enableSubmit}
                      errorMessage={getFieldErrorMessage(errors, 'company')}
                      showErrors={false}
                    />
                    <InputField
                      type="text"
                      fieldName="email"
                      label={getFieldTranslation('email-label') + ': '}
                      placeholder={getFieldTranslation('email-placeholder')}
                      fullWidth
                      disableAnimation
                      validators={[mustNotBeEmpty, mustHaveEmailFormat]}
                      disabled={!enableSubmit}
                      errorMessage={getFieldErrorMessage(errors, 'email')}
                      showErrors={false}
                    />
                    <InputField
                      type="select"
                      fieldName="subject"
                      label={getFieldTranslation('subject-label') + ': '}
                      defaultOption={getFieldTranslation('subject-placeholder')}
                      fullWidth
                      options={subjectOptions}
                      disableAnimation
                      validators={[mustNotBeEmpty]}
                      disabled={!enableSubmit}
                      errorMessage={getFieldErrorMessage(errors, 'subject')}
                      showErrors={false}
                    />
                  </div>
                  <div className={classNames(formColumn, formColumnFullHeight)}>
                    <InputField
                      type="text"
                      fieldName="comments"
                      label={getFieldTranslation('comments-label') + ': '}
                      placeholder={getFieldTranslation('comments-placeholder')}
                      fullWidth
                      disableAnimation
                      validators={[mustNotBeEmpty]}
                      multiline
                      rows={6}
                      disabled={!enableSubmit}
                      errorMessage={getFieldErrorMessage(errors, 'comments')}
                      showErrors={false}
                    />
                  </div>
                </div>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey="6Le2Rt4aAAAAAB0nfNyiqjVm4AQlPI-_j18tmm3L"
                />
              </fieldset>
              <Buttons enableSubmit={enableSubmit} />
            </form>
          );
        }}
      />
    </>
  );
};

export default Form;
