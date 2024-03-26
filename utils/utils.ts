export const SASSvarsToJason = (SASSVars: string) => {
  console.log({ SASSVars });

  return JSON.parse(SASSVars.replace(/'/g, '').replace(/(,)([^,]*)$/g, '$2'));
};
