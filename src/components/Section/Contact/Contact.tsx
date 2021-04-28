import React, { useContext, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useIntl } from 'react-intl';

import { sections } from '@app/types/types';
import { MenuContext } from '@app/context/MenuContext/MenuContext';

import Button from '@app/components/Form/Button/Button';
import Section from '@app/components/Section/Section';
import SecondaryMenu from '@app/components/Menu/SecondaryMenu/SecondaryMenu';
import ButtonGroup from '@app/components/Form/ButtonGroup/ButtonGroup';
import ContactForm from '@app/components/Section/Contact/ContactForm/ContactForm';

import {
  menuContactList,
  menuContactItem
} from '@app/components/Menu/Menu.module.scss';

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
  const [showForm, setShowForm] = useState(false);
  const { formatMessage } = useIntl();

  const panel = React.createRef<HTMLElement>();
  const form = React.createRef<HTMLElement>();

  const toggleForm = () => {
    setShowForm(!showForm);
    !showForm && setEnablePanels(false);
  };

  return (
    <>
      <CSSTransition
        in={!showForm}
        timeout={duration}
        classNames={showForm ? rtlTransition : ltrTransition}
        unmountOnExit
        onEntered={() => setEnablePanels(true)}
        nodeRef={panel}
      >
        <Section
          id={sections.CONTACT}
          heading={formatMessage({ id: 'section-contact-title' })}
          ref={panel}
        >
          <article>
            <h4>{formatMessage({ id: 'section-contact-sub-title' })}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: formatMessage({ id: 'section-contact-text' })
              }}
            />

            <SecondaryMenu variant="contact">
              <ul className={menuContactList}>
                <li className={menuContactItem}>
                  <ButtonGroup>
                    <Button
                      icon="end"
                      onClick={(event) => {
                        event.preventDefault();
                        toggleForm();
                      }}
                    >
                      {formatMessage({ id: 'section-contact-button-text' })}
                    </Button>
                  </ButtonGroup>
                </li>
              </ul>
            </SecondaryMenu>
          </article>
        </Section>
      </CSSTransition>

      <CSSTransition
        in={showForm}
        timeout={duration}
        classNames={showForm ? rtlTransition : ltrTransition}
        unmountOnExit
        nodeRef={form}
      >
        <ContactForm toggleForm={toggleForm} ref={form} />
      </CSSTransition>
    </>
  );
};

export default Contact;
