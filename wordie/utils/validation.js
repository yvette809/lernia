
export function hasRepeats (str) {
  return /(.).*\1/.test(str);
}


export function hasSpecialCharsOrSpaces(str) {
  const regex = /^[A-Za-z]+$/;

  if (str.match(regex)) {
    return true;
  }

  return false;
}
