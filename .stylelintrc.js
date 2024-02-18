module.exports = {
  customSyntax: 'postcss-scss',
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'alpha-value-notation': 'number',
    'at-rule-no-unknown': null,
    'declaration-block-no-duplicate-properties': true,
    'declaration-no-important': true,
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['[$].*'],
      },
    ],
    // indentation: 2, TODO: COnflicts with prettier
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': [
      'all',
      'content',
      'content-visibility', // Experimental. Expect behavior to change in the future

      /* counter */
      'counter-increment',
      'counter-reset',
      'counter-set',

      /* inset */
      'inset',
      'inset-block',
      'inset-block-end',
      'inset-block-start',
      'inset-inline',
      'inset-inline-end',
      'inset-inline-start',

      'top',
      'right',
      'bottom',
      'left',
      'position',
      'z-index',

      /* margin */
      'margin',
      'margin-inline',
      'margin-inline-start',
      'margin-inline-end',
      'margin-block',
      'margin-block-start',
      'margin-block-end',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-trim', // Experimental. Expect behavior to change in the future

      /* padding */
      'padding',
      'padding-block',
      'padding-inline',
      'padding-inline-start',
      'padding-inline-end',
      'padding-block-start',
      'padding-block-end',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',

      'width',
      'height',
      'min-width',
      'min-height',
      'max-width',
      'max-height',

      'inline-size',
      'block-size',
      'min-inline-size',
      'min-block-size',
      'max-inline-size',
      'max-block-size',
      'writing-mode',

      /* font */
      'font',
      'font-family',
      'font-feature-settings',
      'font-kerning',
      'font-language-override',
      'font-optical-sizing',
      'font-palette',
      'font-size',
      'font-size-adjust',
      'font-smooth', // Non-standard. Check cross-browser support before using
      'font-stretch',
      'font-style',
      'font-synthesis',
      'font-synthesis-position',
      'font-synthesis-small-caps',
      'font-synthesis-style',
      'font-synthesis-weight',
      'font-variant',
      'font-variant-alternates',
      'font-variant-caps',
      'font-variant-east-asian',
      'font-variant-emoji',
      'font-variant-ligatures',
      'font-variant-numeric',
      'font-variant-position',
      'font-variation-settings',
      'font-weight',

      /* math */
      'math-depth',
      'math-shift', // Experimental. Expect behavior to change in the future
      'math-style',

      'letter-spacing',
      'word-spacing',
      'line-height',
      'line-height-step', // Experimental. Expect behavior to change in the future

      /* text */
      'text-align',
      'text-align-last',
      'text-combine-upright',
      'text-decoration',
      'text-decoration-color',
      'text-decoration-line',
      'text-decoration-skip', // Experimental. Expect behavior to change in the future
      'text-decoration-skip-ink',
      'text-decoration-style',
      'text-decoration-thickness',
      'text-emphasis',
      'text-emphasis-color',
      'text-emphasis-position',
      'text-emphasis-style',
      'text-indent',
      'text-justify',
      'text-orientation',
      'text-overflow',
      'text-rendering',
      'text-shadow',
      'text-size-adjust', // Experimental. Expect behavior to change in the future
      'text-transform',
      'text-underline-offset',
      'text-underline-position',
      'text-wrap',

      'tab-size',
      'direction',
      'unicode-bidi',
      'quotes',

      'initial-letter', // Experimental. Expect behavior to change in the future
      'initial-letter-align', // Experimental. Expect behavior to change in the future

      'vertical-align',
      'white-space',
      'white-space-collapse', // Experimental. Expect behavior to change in the future
      'word-break',
      'line-break',
      'hyphenate-character',
      'hyphenate-limit-chars',
      'hyphens',
      'hanging-punctuation',

      'ruby-align', // Experimental. Expect behavior to change in the future
      'ruby-position',

      /* list */
      'list-style',
      'list-style-image',
      'list-style-position',
      'list-style-type',

      /* column */
      'column-count',
      'column-fill',
      'column-gap',
      'column-rule',
      'column-rule-color',
      'column-rule-style',
      'column-rule-width',
      'column-span',
      'column-width',
      'columns',
      'orphans',
      'widows',

      'color',
      'color-scheme',
      'accent-color',
      'forced-color-adjust',

      /* box */
      'box-align', // Non-standard. Check cross-browser support before 'using', // Deprecated. Not for use in new websites
      'box-decoration-break',
      'box-direction', // Non-standard. Check cross-browser support before 'using', // Deprecated. Not for use in new websites
      'box-flex', // Non-standard. Check cross-browser support before 'using', // Deprecated. Not for use in new websites
      'box-flex-group', // Non-standard. Check cross-browser support before 'using', // Deprecated. Not for use in new websites
      'box-lines', // Non-standard. Check cross-browser support before 'using', // Deprecated. Not for use in new websites
      'box-ordinal-group', // Non-standard. Check cross-browser support before 'using', // Deprecated. Not for use in new websites
      'box-orient', // Non-standard. Check cross-browser support before 'using', // Deprecated. Not for use in new websites
      'box-pack', // Non-standard. Check cross-browser support before 'using', // Deprecated. Not for use in new websites
      'box-shadow',
      'box-sizing',

      /* border */
      'border',
      'border-width',
      'border-style',
      'border-color',
      'border-radius',
      'border-inline',
      'border-inline-style',
      'border-inline-color',
      'border-inline-width',
      'border-inline-start',
      'border-inline-start-style',
      'border-inline-start-color',
      'border-inline-start-width',
      'border-inline-end',
      'border-inline-end-style',
      'border-inline-end-color',
      'border-inline-end-width',
      'border-block',
      'border-block-width',
      'border-block-style',
      'border-block-color',
      'border-block-start',
      'border-block-start-style',
      'border-block-start-width',
      'border-block-start-color',
      'border-block-end',
      'border-block-end-style',
      'border-block-end-width',
      'border-block-end-color',
      'border-start-start-radius',
      'border-start-end-radius',
      'border-end-end-radius',
      'border-end-start-radius',
      'border-top',
      'border-top-style',
      'border-top-color',
      'border-top-width',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-right',
      'border-right-style',
      'border-right-color',
      'border-right-width',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-color',
      'border-bottom-width',
      'border-bottom-left-radius',
      'border-bottom-right-radius',
      'border-left',
      'border-left-style',
      'border-left-color',
      'border-left-width',
      'border-image',
      'border-image-outset',
      'border-image-repeat',
      'border-image-slice',
      'border-image-source',
      'border-image-width',

      /* outline */
      'outline',
      'outline-color',
      'outline-offset',
      'outline-style',
      'outline-width',

      'display',
      'visibility',
      'opacity',
      'appearance',
      'isolation',
      'aspect-ratio',

      /* flex */
      'flex',
      'flex-basis',
      'flex-direction',
      'flex-flow',
      'flex-grow',
      'flex-shrink',
      'flex-wrap',

      /* grid */
      'grid',
      'grid-area',
      'grid-auto-columns',
      'grid-auto-flow',
      'grid-auto-rows',
      'grid-column',
      'grid-column-end',
      'grid-column-start',
      'grid-row',
      'grid-row-end',
      'grid-row-start',
      'grid-template',
      'grid-template-areas',
      'grid-template-columns',
      'grid-template-rows',

      /* align */
      'align-content',
      'align-items',
      'align-self',
      'align-tracks', // Experimental. Expect behavior to change in the future

      /* justify */
      'justify-content',
      'justify-items',
      'justify-self',
      'justify-tracks', // Experimental. Expect behavior to change in the future

      /* place */
      'place-content',
      'place-items',
      'place-self',

      'order',
      'gap',
      'row-gap',
      'masonry-auto-flow', // Experimental. Expect behavior to change in the future

      /* contain */
      'contain',
      'contain-intrinsic-block-size',
      'contain-intrinsic-height',
      'contain-intrinsic-inline-size',
      'contain-intrinsic-size',
      'contain-intrinsic-width',

      /* container */
      'container',
      'container-name',
      'container-type',

      /* overflow */
      'overflow',
      'overflow-anchor',
      'overflow-block',
      'overflow-clip-margin',
      'overflow-inline',
      'overflow-wrap',
      'overflow-x',
      'overflow-y',

      /* scroll */
      'scroll-behavior',
      'scroll-margin',
      'scroll-margin-block',
      'scroll-margin-block-end',
      'scroll-margin-block-start',
      'scroll-margin-bottom',
      'scroll-margin-inline',
      'scroll-margin-inline-end',
      'scroll-margin-inline-start',
      'scroll-margin-left',
      'scroll-margin-right',
      'scroll-margin-top',
      'scroll-padding',
      'scroll-padding-block',
      'scroll-padding-block-end',
      'scroll-padding-block-start',
      'scroll-padding-bottom',
      'scroll-padding-inline',
      'scroll-padding-inline-end',
      'scroll-padding-inline-start',
      'scroll-padding-left',
      'scroll-padding-right',
      'scroll-padding-top',
      'scroll-snap-align',
      'scroll-snap-stop',
      'scroll-snap-type',
      'scroll-timeline', // Experimental. Expect behavior to change in the future
      'scroll-timeline-axis', // Experimental. Expect behavior to change in the future
      'scroll-timeline-name', // Experimental. Expect behavior to change in the future

      /* overscroll */
      'overscroll-behavior',
      'overscroll-behavior-block',
      'overscroll-behavior-inline',
      'overscroll-behavior-x',
      'overscroll-behavior-y',

      /* scrollbar */
      'scrollbar-color',
      'scrollbar-gutter',
      'scrollbar-width',

      'float',
      'clear',
      'clip', // Deprecated. Not for use in new websites
      'clip-path',

      /* mask */
      'mask',
      'mask-border',
      'mask-border-mode',
      'mask-border-outset',
      'mask-border-repeat',
      'mask-border-slice',
      'mask-border-source',
      'mask-border-width',
      'mask-clip',
      'mask-composite',
      'mask-image',
      'mask-mode',
      'mask-origin',
      'mask-position',
      'mask-repeat',
      'mask-size',
      'mask-type',

      /* image */
      'object-fit',
      'object-position',
      'image-orientation',
      'image-rendering',
      'image-resolution', // Experimental. Expect behavior to change in the future

      /* shape */
      'shape-image-threshold',
      'shape-margin',
      'shape-outside',

      'paint-order',
      'fill',
      'stroke',

      'filter',
      'backdrop-filter',
      'mix-blend-mode',

      /* background */
      'background',
      'background-attachment',
      'background-blend-mode',
      'background-clip',
      'background-color',
      'background-image',
      'background-origin',
      'background-position',
      'background-position-x',
      'background-position-y',
      'background-repeat',
      'background-size',

      /* table */
      'table-layout',
      'caption-side',
      'border-spacing',
      'border-collapse',
      'empty-cells',

      'overlay', // Experimental. Expect behavior to change in the future

      'resize',
      'cursor',
      'caret-color',
      'pointer-events',
      'touch-action',
      'zoom', // Non-standard. Check cross-browser support before using
      'user-modify', // Non-standard. Check cross-browser support before using // Deprecated. Not for use in new websites
      'user-select',

      /* transform */
      'transform',
      'transform-box',
      'transform-origin',
      'transform-style',
      'translate',
      'rotate',
      'scale',
      'backface-visibility',
      'perspective',
      'perspective-origin',

      /* transition */
      'transition',
      'transition-behavior', // Experimental. Expect behavior to change in the future
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',

      /* animation */
      'animation',
      'animation-composition',
      'animation-delay',
      'animation-direction',
      'animation-duration',
      'animation-fill-mode',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-range', // Experimental. Expect behavior to change in the future
      'animation-range-end', // Experimental. Expect behavior to change in the future
      'animation-range-start', // Experimental. Expect behavior to change in the future
      'animation-timeline', // Experimental. Expect behavior to change in the future
      'animation-timing-function',

      /* offset */
      'offset',
      'offset-anchor',
      'offset-distance',
      'offset-path',
      'offset-position',
      'offset-rotate',

      'timeline-scope', // Experimental. Expect behavior to change in the future

      /* view */
      'view-timeline', // Experimental. Expect behavior to change in the future
      'view-timeline-axis', // Experimental. Expect behavior to change in the future
      'view-timeline-inset', // Experimental. Expect behavior to change in the future
      'view-timeline-name', // Experimental. Expect behavior to change in the future
      'view-transition-name', // Experimental. Expect behavior to change in the future

      'will-change',

      /* page */
      'page',
      'break-after',
      'break-before',
      'break-inside',
      'page-break-after',
      'page-break-before',
      'page-break-inside',

      'print-color-adjust',
    ],
    'rule-empty-line-before': [
      'always',
      { ignore: ['after-comment', 'first-nested'] },
    ],
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-empty-line-after': [
      'always',
      {
        except: ['before-dollar-variable', 'last-nested'],
      },
    ],
    'scss/dollar-variable-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'after-comment', 'after-dollar-variable'],
        ignore: ['inside-single-line-block'],
      },
    ],
    'scss/dollar-variable-first-in-block': [
      true,
      { ignore: ['comments', 'imports'] },
    ],
    'scss/double-slash-comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['between-comments', 'stylelint-commands'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'import', 'global'],
      },
    ],
  },
};
