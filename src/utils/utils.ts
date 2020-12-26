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

export const getFileName = (
  path: string
): { file: string; fileName: string } => {
  const file = path.replace(
    /(\/static\/media\/)([a-z0-9-]+)(.[a-z0-9]+)(.[a-z]+)/,
    '$2$4'
  );
  const fileName = file.replace(/([a-z0-9-]+)(.[a-z]+)/, '$1');

  return {
    file: file,
    fileName: fileName
  };
};
