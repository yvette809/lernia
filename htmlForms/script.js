let form = document.querySelector("form");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let errrorDiv = document.querySelectorAll(".error");

// show input error mesage
function showError(input, message) {
  const parent = input.parentElement;
  parent.classList.add("error");
  parent.classList.remove("success");
  const small = parent.querySelector("small");
  small.innerText = message;
}

// show success message
function showSuccess(input) {
  const parent = input.parentElement;
  parent.classList.remove("error");
  parent.classList.add("success");
}

// check required fields

const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${input.id} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// check email validity
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

// Check input length
function checkLength(password, min, max) {
  if (password.value.length < min) {
    showError(password, `password must be at least ${min} characters`);
  } else if (password.value.length > max) {
    showError(password, `password must be less than ${max} characters`);
  } else {
    showSuccess(password);
  }
}

// show Alert
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  container.insertBefore(div, form);

  //disappear in 3 seconds
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}

// register user
const register = (name, email, password) => {
  let users = [];
  let user = {
    id: Date.now().toString(),
    name,
    email,
    password,
  };

  users.unshift(user);
  showAlert("user added", "success");
};

//login user

const logIn = (email, password) => {
  console.log(email, password);
  showAlert("user loggedIn", "success");
  location.replace("http://127.0.0.1:5501/htmlForms/home.html");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (location.href === "http://127.0.0.1:5501/htmlForms/index.html") {
    checkRequired([name, email, password]);
    checkLength(password, 6, 25);
    if (
      name.value !== "" &&
      email.value !== "" &&
      password.value !== "" &&
      validateEmail(email.value)
    ) {
      register(name.value, email.value, password.value);

      name.value = "";
      email.value = "";
      password.value = "";
    }
  } else {
    checkRequired([email, password]);

    if (
      email.value !== "" &&
      password.value !== "" &&
      validateEmail(email.value) &&
      checkLength(password, 6, 25)
    ) {
      logIn(email.value, password.value);
      email.value = "";
      password.value = "";
    }
  }
});
