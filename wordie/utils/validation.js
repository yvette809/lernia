/* export function hasOnlyUniqueLetters(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) !== str.lastIndexOf(str[i])) {
      return false;
    }
  }
  return true;
} */

export function hasSpecialCharsOrSpaces(str) {
  const regex = /^[A-Za-z]+$/;

  if (str.match(regex)) {
    return true;
  }

  return false;
}
