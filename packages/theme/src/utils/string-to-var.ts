export const stringToVar = (str: string) => {
  return str.replace(/[A-Z]/g, (match) => {
    return '-' + match.toLowerCase();
  });
};
