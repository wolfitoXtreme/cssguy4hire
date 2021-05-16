import React, { useState } from 'react';

import { ErrorMessage } from '@app/types/types';

export const ContactFormContext = React.createContext<{
  showForm: boolean;
  showResponse: boolean;
  toggleForm: () => void;
  toggleResponse: () => void;
  setShowResponse: (x: boolean) => void;
  responseMessage: ErrorMessage | null;
  setResponseMessage: (x: ErrorMessage | null) => void;
}>({
  showForm: false,
  showResponse: false,
  toggleForm: () => {},
  toggleResponse: () => {},
  setShowResponse: (showResponse) => showResponse,
  responseMessage: null,
  setResponseMessage: (responseMessage) => responseMessage
});

export const ContactFormProvider: React.FC = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseMessage, setResponseMessage] = useState<ErrorMessage | null>(
    null
  );

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleResponse = () => {
    setShowResponse(!showResponse);
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
        setResponseMessage
      }}
    >
      {children}
    </ContactFormContext.Provider>
  );
};
