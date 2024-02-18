module.exports = {
  '*.(js|ts|tsx)': [
    'eslint --max-warnings=0',
    'prettier --config .prettierrc.js --check',
  ],
  '*.(scss|css)': 'stylelint --max-warnings=0',
};
