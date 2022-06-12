export const makeId = (length) => {
  let result = '';

  const characters = 'abcdefghijklmnopqrstuvwxyz012345';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
