import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReCAPTCHA from 'react-google-recaptcha';

import { NavigationContext } from '@app/context/NavigationContext/NavigationContext';
import {
  ContactFormContext,
  ContactFormProvider
} from '@app/context/ContactFormContext/ContactFormContext';

import ContactIntro from '@app/components/Section/Contact/ContactIntro/ContactIntro';
import ContactForm from '@app/components/Section/Contact/ContactForm/ContactForm';
import ContactResponse from '@app/components/Section/Contact/ContactResponse/ContactResponse';
import CloseButton from '@app/components/CloseButton/CloseButton';

import {
  transitionDuration,
  rtlEnter,
  rtlEnterActive,
  rtlExit,
  rtlExitActive,
  ltrEnter,
  ltrEnterActive,
  ltrExit,
  ltrExitActive,
  closeButton
} from './Contact.module.scss';

const duration = parseInt(transitionDuration);

const rtlTransition = {
  enter: rtlEnter,
  enterActive: rtlEnterActive,
  exit: rtlExit,
  exitActive: rtlExitActive
};

const ltrTransition = {
  enter: ltrEnter,
  enterActive: ltrEnterActive,
  exit: ltrExit,
  exitActive: ltrExitActive
};

const Contact: React.FC = () => {
  const { setEnablePanels, setStaticContent } = useContext(NavigationContext);

  const intro = React.createRef<HTMLElement>();
  const form = React.createRef<HTMLElement>();
  const response = React.createRef<HTMLElement>();

  return (
    <ContactFormProvider>
      <ContactFormContext.Consumer>
        {({
          showForm,
          showResponse,
          toggleForm,
          toggleResponse,
          enableSubmit,
          recaptchaRef
        }) => (
          <>
            <CSSTransition
              in={!showForm && !showResponse}
              timeout={duration}
              classNames={showForm ? rtlTransition : ltrTransition}
              unmountOnExit
              onEntered={() => {
                setEnablePanels(true);
                setStaticContent(false);
              }}
              nodeRef={intro}
            >
              <ContactIntro ref={intro} />
            </CSSTransition>

            <CSSTransition
              in={showForm && !showResponse}
              timeout={duration}
              classNames={showForm ? rtlTransition : ltrTransition}
              unmountOnExit
              nodeRef={form}
            >
              <ContactForm
                ref={form}
                closeButton={
                  <CloseButton
                    actions={[toggleForm]}
                    enable={enableSubmit}
                    className={closeButton}
                  />
                }
              />
            </CSSTransition>

            <CSSTransition
              in={showResponse}
              timeout={duration}
              classNames={showForm ? rtlTransition : ltrTransition}
              unmountOnExit
              nodeRef={response}
            >
              <ContactResponse
                ref={response}
                actions={[toggleForm, toggleResponse]}
                closeButton={
                  <CloseButton
                    actions={[toggleForm, toggleResponse]}
                    enable={enableSubmit}
                    className={closeButton}
                  />
                }
              />
            </CSSTransition>

            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey="6Le2Rt4aAAAAAB0nfNyiqjVm4AQlPI-_j18tmm3L"
            />
          </>
        )}
      </ContactFormContext.Consumer>
    </ContactFormProvider>
  );
};

export default Contact;
