export const SASSvarsToJason = (SASSVars: string) =>
  JSON.parse(SASSVars.replace(/'/g, '').replace(/(,.)(})/g, '$2'));

export const kebabCaseToTitleCase = (string: string) =>
  string
    .split('-')
    .map(word => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
