//Has special characters
export function hasSpecialCharsOrSpaces(str) {
    const regex = /^[A-Za-z]+$/;

    if (str.match(regex)) {
      return true;
    }

    return false;
  }

  /* //input validation
  export function validateInput(text) {
    if (text === "") {
      alert("input cannot be empty");

      //I will create an alert component to take care of this
    } else if (text.length < wordLength || text.length > wordLength) {
      alert(`Input length cannot be less than or greater than ${wordLength}`);
    } else if (!hasSpecialCharsOrSpaces(text)) {
      alert("Input cannot contain special chars");
    }
  }
 */