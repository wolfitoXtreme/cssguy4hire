import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { ErrorMessage } from '@app/types/types';

export const ContactFormContext = React.createContext<{
  showForm: boolean;
  showResponse: boolean;
  toggleForm: () => void;
  toggleResponse: () => void;
  setShowResponse: (x: boolean) => void;
  responseMessage: ErrorMessage | null;
  setResponseMessage: (x: ErrorMessage | null) => void;
  enableSubmit: boolean;
  setEnableSubmit: (x: boolean) => void;
  recaptchaRef: React.RefObject<ReCAPTCHA> | null;
}>({
  showForm: false,
  showResponse: false,
  toggleForm: () => {},
  toggleResponse: () => {},
  setShowResponse: (showResponse) => showResponse,
  responseMessage: null,
  setResponseMessage: (responseMessage) => responseMessage,
  enableSubmit: true,
  setEnableSubmit: () => {},
  recaptchaRef: null
});

export const ContactFormProvider: React.FC = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState<ErrorMessage | null>(
    null
  );
  const [enableSubmit, setEnableSubmit] = useState(true);
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleResponse = () => {
    setShowResponse(!showResponse);
    setEnableSubmit(true);
  };

  return (
    <ContactFormContext.Provider
      value={{
        showForm,
        showResponse,
        toggleForm,
        toggleResponse,
        setShowResponse,
        responseMessage,
        setResponseMessage,
        enableSubmit,
        setEnableSubmit,
        recaptchaRef
      }}
    >
      {children}
    </ContactFormContext.Provider>
  );
};
