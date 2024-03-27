module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    [
      'postcss-pxtorem',
      {
        rootValue: 16,
        unitPrecision: 5,
        propList:
          process.env.NODE_ENV === 'production'
            ? ['font-size', 'padding', 'margin']
            : [],
      },
    ],
  ],
};
