import type { Meta, StoryObj } from '@storybook/react';

import styles from './Typography.module.scss';

const StoryComponent = () => {
  return (
    <main>
      <article className={styles['typography-sample-headings']}>
        <header>
          <h3>Headings</h3>
        </header>
        <h1>Heading H1</h1>
        <h2>Heading H2</h2>
        <h3>Heading H3</h3>
        <h4>Heading H4</h4>
        <h5>Heading H5</h5>
        <h6>Heading H6</h6>
      </article>

      <article>
        <header>
          <h3>Paragraphs</h3>
        </header>
        <p>
          “Fermentum neque, sed ultrices dui. Sed ut lorem vel magna fermentum
          eleifend non ac erat. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae; Nunc odio lorem, ultrices at
          metus in, ullamcorper fringilla libero.”
        </p>

        <p>
          “Curabitur et nulla sed elit eleifend malesuada cursus a massa. In hac
          habitasse platea dictumst. Duis at dignissim quam. Curabitur tincidunt
          massa nec mauris malesuada, vitae dictum ante fermentum.”
        </p>

        <p>
          “Vestibulum lacinia eleifend dui nec sagittis. Aenean tempor tempus
          tortor, eget pretium est malesuada vel. Etiam elementum neque ut nunc
          placerat aliquam. Phasellus lorem nisi, condimentum in elit mollis,
          molestie interdum nisi.”
        </p>
      </article>

      <article>
        <header>
          <h3>Lists</h3>
        </header>

        <h4>Unordered lists</h4>
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

        <h4>Nested unordered list</h4>
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

        <h4>Ordered list</h4>
        <ol>
          <li>
            Ut non ullamcorper orci, quis porta orci. Integer mauris mauris,
            dapibus nec dapibus in, tincidunt id dolor.
          </li>
          <li>
            Donec orci lectus, finibus ut tortor a, tempor luctus lorem. Aliquam
            non lobortis lectus.
          </li>
          <li>
            Integer et ex ullamcorper, blandit sem sit amet, consectetur risus.
          </li>
          <li>Etiam elementum neque ut nunc placerat aliquam.</li>
          <li>
            Ut non ullamcorper orci, quis porta orci. Integer mauris mauris,
            dapibus nec dapibus in, tincidunt id dolor.
          </li>
          <li>
            Donec orci lectus, finibus ut tortor a, tempor luctus lorem. Aliquam
            non lobortis lectus.
          </li>
          <li>
            Integer et ex ullamcorper, blandit sem sit amet, consectetur risus.
          </li>
          <li>Etiam elementum neque ut nunc placerat aliquam.</li>
          <li>
            Ut non ullamcorper orci, quis porta orci. Integer mauris mauris,
            dapibus nec dapibus in, tincidunt id dolor.
          </li>
          <li>
            Donec orci lectus, finibus ut tortor a, tempor luctus lorem. Aliquam
            non lobortis lectus.
          </li>
          <li>
            Integer et ex ullamcorper, blandit sem sit amet, consectetur risus.
          </li>
          <li>Etiam elementum neque ut nunc placerat aliquam.</li>
        </ol>

        <h4>Nested ordered list</h4>
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

        <h4>Definition list</h4>
        <dl>
          <dt>Fermentum</dt>
          <dd>
            <p>Fermentum neque, sed ultrices dui.</p>

            <p>
              Vestibulum lacinia eleifend dui nec sagittis. Aenean tempor tempus
              tortor
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
      </article>

      <article>
        <header>
          <h3>Headings & paragraphs / lists</h3>
        </header>

        <h1>Heading H1</h1>
        <p>
          Fermentum neque, sed ultrices dui. Sed ut lorem vel magna fermentum
          eleifend non ac erat. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia Curae; Nunc odio lorem, ultrices at
          metus in, ullamcorper fringilla libero.
        </p>

        <h2>Heading H2</h2>

        <p>
          Curabitur et nulla sed elit eleifend malesuada cursus a massa. In hac
          habitasse platea dictumst. Duis at dignissim quam. Curabitur tincidunt
          massa nec mauris malesuada, vitae dictum ante fermentum.
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
          Pellentesque pulvinar ex eu felis pretium, nec tristique mi facilisis.
          Nulla laoreet purus nec elementum dictum.
        </p>

        <p>
          Ut non ullamcorper orci, quis porta orci. Integer mauris mauris,
          dapibus nec dapibus in, tincidunt id dolor. Integer et ex ullamcorper,
          blandit sem sit amet, consectetur risus.
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
            Donec orci lectus, finibus ut tortor a, tempor luctus lorem. Aliquam
            non lobortis lectus.
          </li>
          <li>
            Integer et ex ullamcorper, blandit sem sit amet, consectetur risus.
          </li>
          <li>Etiam elementum neque ut nunc placerat aliquam.</li>
        </ol>
      </article>

      <article>
        <header>
          <h3>Columns</h3>
        </header>

        <ul className="columns">
          <li>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              facere, alias dolorem vel repellat molestiae cupiditate.
            </p>
          </li>
          <li>
            <p>
              Nisi ad voluptatem facere minima corporis suscipit maxime
              voluptate veritatis quod accusamus, quasi consectetur cumque
              molestiae!
            </p>
          </li>
          <li>
            <p>
              Impedit delectus quia accusamus quod autem excepturi explicabo
              voluptates, cumque, possimus consequuntur facilis, officiis ad
              modi?
            </p>
          </li>
          <li>
            <p>
              Doloribus sequi alias incidunt in iusto optio non, reiciendis
              dolor et, commodi placeat iste minus? Molestiae.
            </p>
            <p>
              Officiis porro deserunt distinctio dolore ad delectus reiciendis
              unde explicabo? Delectus mollitia eos consectetur eveniet nostrum.
            </p>
          </li>
          <li>
            <p>
              Similique alias dolorum rem, adipisci repudiandae quaerat. Numquam
              minima, ad adipisci assumenda cumque pariatur! Debitis, quaerat!
            </p>
          </li>
          <li>
            <p>
              Placeat, ex sunt nisi eaque sed repudiandae enim veniam, sit quos
              corporis at minima, error neque.
            </p>
          </li>
        </ul>
      </article>
    </main>
  );
};

const meta = {
  title: 'Global-Ui',
  component: StoryComponent,
} satisfies Meta<typeof StoryComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typography: Story = {};
