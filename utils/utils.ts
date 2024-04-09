export const SASSvarsToJason = (SASSVars: string) =>
  JSON.parse(SASSVars.replace(/'/g, '').replace(/(,.)(})/g, '$2'));

export const kebabCaseToTitleCase = (string: string) =>
  string
    .split('-')
    .map(word => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const importAll = (context: any) => {
  return context.keys().map((key: string) => {
    const file = key.replace('./', '');
    const name = file.replace('.svg', '');

    return {
      file,
      name,
    };
  });
};
