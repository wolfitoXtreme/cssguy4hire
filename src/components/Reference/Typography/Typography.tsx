import React from 'react';

import { SASSvarsToJason, kebapCaseToTitleCase } from '@app/utils/utils';
import { FontInt, FontVariantType } from '@app/types/types';

import Section from '@app/components/Reference/Section/Section';

import Fonts from './Fonts/Fonts';
import LinkColors from './LinkColors/LinkColors';

import { fonts as SASSfonts } from './Typography.module.scss';

const formatFonts = (fonts) => {
  const formattedFonts: FontInt[] = [];

  Object.getOwnPropertyNames(fonts).forEach((fontFamily) => {
    const variants = fonts[fontFamily];
    const formattedVariants: FontVariantType[] = [];

    Object.getOwnPropertyNames(variants).forEach((fontWeight) => {
      formattedVariants.push({
        variant: variants[fontWeight],
        variantName: kebapCaseToTitleCase(
          variants[fontWeight].replace(/([a-z]+-)/g, '')
        ),
        variantWeight: fontWeight
      });
    });

    formattedFonts.push({
      font: fontFamily,
      fontName: kebapCaseToTitleCase(fontFamily),
      fontVariants: formattedVariants
    });
  });

  return formattedFonts;
};

const Typography: React.FC = () => {
  const fonts = formatFonts(SASSvarsToJason(SASSfonts));

  return (
    <>
      <Section heading="Fonts">
        {fonts &&
          fonts.map((font: FontInt, index) => (
            <Fonts key={index} fontFamily={font} />
          ))}
      </Section>

      <Section heading="Link Colors">
        <LinkColors />
      </Section>

      <Section heading="Headings">
        <>
          <h1>Heading H1</h1>
          <h2>Heading H2</h2>
          <h3>Heading H3</h3>
          <h4>Heading H4</h4>
          <h5>Heading H5</h5>
          <h6>Heading H6</h6>
        </>
      </Section>

      <Section heading="Paragraphs">
        <>
          <p>
            Fermentum neque, sed ultrices dui. Sed ut lorem vel magna fermentum
            eleifend non ac erat. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae; Nunc odio lorem, ultrices
            at metus in, ullamcorper fringilla libero.
          </p>

          <p>
            Curabitur et nulla sed elit eleifend malesuada cursus a massa. In
            hac habitasse platea dictumst. Duis at dignissim quam. Curabitur
            tincidunt massa nec mauris malesuada, vitae dictum ante fermentum.
          </p>

          <p>
            Vestibulum lacinia eleifend dui nec sagittis. Aenean tempor tempus
            tortor, eget pretium est malesuada vel. Etiam elementum neque ut
            nunc placerat aliquam. Phasellus lorem nisi, condimentum in elit
            mollis, molestie interdum nisi.
          </p>
        </>
      </Section>

      <Section heading="Lists">
        <>
          <h5>Unordered list</h5>
          <ul>
            <li>Fermentum neque, sed ultrices dui.</li>
            <li>
              Sed ut lorem vel magna fermentum eleifend non acerat. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere.
            </li>
            <li>
              Curabitur et nulla sed elit eleifend malesuada cursus a massa.
            </li>
            <li>
              Pellentesque pulvinar ex eu felis pretium, nec tristique mi
              facilisis. Nulla laoreet purus nec.
            </li>
          </ul>

          <h5>Nested unordered list</h5>
          <ul>
            <li>
              <p>Curabitur et nulla sed elit eleifend.</p>
              <p>tristique mi facilisis. Nulla laoreet purus nec.</p>
            </li>
            <li>
              <p>Curabitur tincidunt massa nec mauris malesuada.</p>

              <ul>
                <li>In hac habitasse platea dictumst.</li>
                <li>Curabitur et nulla sed elit eleifend malesuada</li>
                <li>In hac habitasse platea dictumst.</li>
              </ul>

              <ol>
                <li>In hac habitasse platea dictumst.</li>
                <li>Curabitur et nulla sed elit eleifend malesuada</li>
                <li>In hac habitasse platea dictumst.</li>
              </ol>
            </li>

            <li>
              <p>
                Curabitur et nulla sed elit eleifend malesuada cursus a massa.
              </p>
            </li>

            <li>
              <p>In hac habitasse platea dictumst.</p>
              <ul>
                <li>In hac habitasse platea dictumst.</li>
                <li>Curabitur et nulla sed elit eleifend malesuada</li>
                <li>
                  <p>In hac habitasse platea dictumst.</p>

                  <ul>
                    <li>In hac habitasse platea dictumst.</li>
                    <li>Curabitur et nulla sed elit eleifend malesuada</li>
                    <li>In hac habitasse platea dictumst.</li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <p>
                Pellentesque pulvinar ex eu felis pretium, nec tristique mi
                facilisis.
              </p>
            </li>
          </ul>

          <h5>Ordered list</h5>
          <ol>
            <li>
              Ut non ullamcorper orci, quis porta orci. Integer mauris mauris,
              dapibus nec dapibus in, tincidunt id dolor.
            </li>
            <li>
              Donec orci lectus, finibus ut tortor a, tempor luctus lorem.
              Aliquam non lobortis lectus.
            </li>
            <li>
              Integer et ex ullamcorper, blandit sem sit amet, consectetur
              risus.
            </li>
            <li>Etiam elementum neque ut nunc placerat aliquam.</li>
            <li>
              Ut non ullamcorper orci, quis porta orci. Integer mauris mauris,
              dapibus nec dapibus in, tincidunt id dolor.
            </li>
            <li>
              Donec orci lectus, finibus ut tortor a, tempor luctus lorem.
              Aliquam non lobortis lectus.
            </li>
            <li>
              Integer et ex ullamcorper, blandit sem sit amet, consectetur
              risus.
            </li>
            <li>Etiam elementum neque ut nunc placerat aliquam.</li>
            <li>
              Ut non ullamcorper orci, quis porta orci. Integer mauris mauris,
              dapibus nec dapibus in, tincidunt id dolor.
            </li>
            <li>
              Donec orci lectus, finibus ut tortor a, tempor luctus lorem.
              Aliquam non lobortis lectus.
            </li>
            <li>
              Integer et ex ullamcorper, blandit sem sit amet, consectetur
              risus.
            </li>
            <li>Etiam elementum neque ut nunc placerat aliquam.</li>
          </ol>

          <h5>Nested ordered list</h5>
          <ol>
            <li>
              <p>Curabitur et nulla sed elit eleifend.</p>
              <p>tristique mi facilisis. Nulla laoreet purus nec.</p>
            </li>
            <li>
              <p>Curabitur tincidunt massa nec mauris malesuada.</p>

              <ul>
                <li>In hac habitasse platea dictumst.</li>
                <li>Curabitur et nulla sed elit eleifend malesuada</li>
                <li>In hac habitasse platea dictumst.</li>
              </ul>

              <ol>
                <p>Curabitur et nulla sed elit eleifend.</p>
                <li>In hac habitasse platea dictumst.</li>
                <li>Curabitur et nulla sed elit eleifend malesuada</li>
                <li>In hac habitasse platea dictumst.</li>
              </ol>
            </li>

            <li>
              <p>
                Curabitur et nulla sed elit eleifend malesuada cursus a massa.
              </p>
            </li>

            <li>
              <ul>
                <li>In hac habitasse platea dictumst.</li>
                <li>Curabitur et nulla sed elit eleifend malesuada</li>
                <li>In hac habitasse platea dictumst.</li>
              </ul>
            </li>

            <li>
              <p>
                Pellentesque pulvinar ex eu felis pretium, nec tristique mi
                facilisis.
              </p>
            </li>
          </ol>

          <h5>Definition list</h5>
          <dl>
            <dt>Fermentum</dt>
            <dd>
              <p>Fermentum neque, sed ultrices dui.</p>

              <p>
                Vestibulum lacinia eleifend dui nec sagittis. Aenean tempor
                tempus tortor
              </p>
            </dd>

            <dt>Eleifend</dt>
            <dd>
              <p>
                Sed ut lorem vel magna fermentum eleifend non acerat. Vestibulum
                ante ipsum primis in faucibus orci luctus et ultrices posuere.
              </p>

              <p>
                Eget pretium est malesuada vel. Etiam elementum neque ut nunc
                placerat aliquam. Phasellus lorem nisi.
              </p>

              <p>condimentum in elit mollis, molestie interdum nisi.</p>
            </dd>

            <dt>Malesuada</dt>
            <dd>
              <p>
                Curabitur et nulla sed eddt eleifend malesuada cursus a massa.
              </p>
            </dd>

            <dt>Tristique mi faciddsis</dt>
            <dd>
              <p>
                Pellentesque pulvinar ex eu fedds pretium, nec tristique mi
                faciddsis. Nulla laoreet purus nec.
              </p>
            </dd>
          </dl>
        </>
      </Section>

      <Section heading="Headings &amp; paragraphs / lists">
        <>
          <h1>Heading H1</h1>
          <p>
            Fermentum neque, sed ultrices dui. Sed ut lorem vel magna fermentum
            eleifend non ac erat. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae; Nunc odio lorem, ultrices
            at metus in, ullamcorper fringilla libero.
          </p>

          <h2>Heading H2</h2>

          <p>
            Curabitur et nulla sed elit eleifend malesuada cursus a massa. In
            hac habitasse platea dictumst. Duis at dignissim quam. Curabitur
            tincidunt massa nec mauris malesuada, vitae dictum ante fermentum.
          </p>

          <ul>
            <li>
              <p>In hac habitasse platea dictumst.</p>
            </li>
            <li>
              <p>Curabitur et nulla sed elit eleifend malesuada</p>
            </li>
            <li>
              <p>In hac habitasse platea dictumst.</p>
            </li>
          </ul>

          <p>
            Pellentesque pulvinar ex eu felis pretium, nec tristique mi
            facilisis. Nulla laoreet purus nec elementum dictum.
          </p>

          <p>
            Ut non ullamcorper orci, quis porta orci. Integer mauris mauris,
            dapibus nec dapibus in, tincidunt id dolor. Integer et ex
            ullamcorper, blandit sem sit amet, consectetur risus.
          </p>

          <h3>Heading H3</h3>

          <p>
            Donec orci lectus, finibus ut tortor a, tempor luctus lorem. Aliquam
            non lobortis lectus. Integer dignissim augue nunc, vel consectetur
            nisl dapibus sed. Nam in nisi orci.
          </p>

          <p>
            Integer lacinia tellus ac dolor ullamcorper posuere. Donec malesuada
            arcu tellus, in pellentesque dui consequat eu.
          </p>

          <h2>Heading H2</h2>
          <h4>Heading H4</h4>

          <ul>
            <li>Fermentum neque, sed ultrices dui.</li>
            <li>
              Sed ut lorem vel magna fermentum eleifend non acerat. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere.
            </li>
            <li>
              Curabitur et nulla sed elit eleifend malesuada cursus a massa.
            </li>
            <li>
              Pellentesque pulvinar ex eu felis pretium, nec tristique mi
              facilisis. Nulla laoreet purus nec.
            </li>
          </ul>

          <h4>Heading H4</h4>

          <ol>
            <li>
              Ut non ullamcorper orci, quis porta orci. Integer mauris mauris,
              dapibus nec dapibus in, tincidunt id dolor.
            </li>
            <li>
              Donec orci lectus, finibus ut tortor a, tempor luctus lorem.
              Aliquam non lobortis lectus.
            </li>
            <li>
              Integer et ex ullamcorper, blandit sem sit amet, consectetur
              risus.
            </li>
            <li>Etiam elementum neque ut nunc placerat aliquam.</li>
          </ol>
        </>
      </Section>
    </>
  );
};

export default Typography;
