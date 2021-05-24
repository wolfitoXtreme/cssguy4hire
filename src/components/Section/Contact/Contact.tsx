import React, { useContext } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { CSSTransition } from 'react-transition-group';

import { MenuContext } from '@app/context/MenuContext/MenuContext';
import {
  ContactFormContext,
  ContactFormProvider
} from '@app/context/ContactFormContext/ContactFormContext';

import ContactIntro from '@app/components/Section/Contact/ContactIntro/ContactIntro';
import ContactForm from '@app/components/Section/Contact/ContactForm/ContactForm';
import ContactResponse from '@app/components/Section/Contact/ContactResponse/ContactResponse';
import ContactCloseButton from '@app/components/Section/Contact/ContactCloseButton/ContactCloseButton';

import {
  transitionDuration,
  rtlEnter,
  rtlEnterActive,
  rtlExit,
  rtlExitActive,
  ltrEnter,
  ltrEnterActive,
  ltrExit,
  ltrExitActive
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
  const { setEnablePanels } = useContext(MenuContext);

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
          recaptchaRef
        }) => (
          <>
            <CSSTransition
              in={!showForm && !showResponse}
              timeout={duration}
              classNames={showForm ? rtlTransition : ltrTransition}
              unmountOnExit
              onEntered={() => setEnablePanels(true)}
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
                closeButton={<ContactCloseButton actions={[toggleForm]} />}
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
                  <ContactCloseButton actions={[toggleForm, toggleResponse]} />
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
