import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import { sections } from '@app/types/types';
import { MenuContext } from '@app/context/MenuContext/MenuContext';
import { ContactFormContext } from '@app/context/ContactFormContext/ContactFormContext';

import Button from '@app/components/Form/Button/Button';
import Section from '@app/components/Section/Section';
import SecondaryMenu from '@app/components/Menu/SecondaryMenu/SecondaryMenu';
import ButtonGroup from '@app/components/Form/ButtonGroup/ButtonGroup';

import {
  menuContactList,
  menuContactItem
} from '@app/components/Menu/Menu.module.scss';

const ContactIntro = React.forwardRef<HTMLElement>((props, ref) => {
  const { toggleForm } = useContext(ContactFormContext);
  const { setEnablePanels } = useContext(MenuContext);
  const { formatMessage } = useIntl();

  return (
    <Section
      id={sections.CONTACT}
      heading={formatMessage({ id: 'section-contact-title' })}
      ref={ref}
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
                    setEnablePanels(false);
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
  );
});

export default ContactIntro;
