export const getFilledNumberArray = (length: number) => {
  // eslint-disable-next-line no-var
  var start = 0;
  const result = [];
  while (start <= length + 1) {
    result.push(start++);
  }
  return result.slice(1, length + 1);
};
