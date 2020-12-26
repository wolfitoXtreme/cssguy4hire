export const SASSvarsToJason = (sassVar: string) => {
  return JSON.parse(
    sassVar
      .replace(/'|"/g, '')
      .replace(/\(/g, '{')
      .replace(/\)/g, '}')
      .replace(/(#?[a-z0-9-]+)/g, '"$1"')
  );
};

export const kebapCaseToTitleCase = (string: string) =>
  string
    .split('-')
    .map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');

export const importAll = (context) => context.keys().map(context);
