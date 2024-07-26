import axios from "axios";
import { validateForm } from "./utils/validator";
import { LoginSchema } from "./schema/user.schema";

const loginModal = document.getElementById("login_Modal") as HTMLDivElement;
const loginModalButton = document.getElementById(
  "login_button"
) as HTMLButtonElement;
const logOutButton = document.getElementById("logout-btn") as HTMLButtonElement;
const loginForm = document.getElementById("login_form") as HTMLFormElement;
const loginErrorMessage = document.getElementById(
  "errorMessage"
) as HTMLDivElement;
const nonUserElements = document.querySelectorAll("#none_user_element");
const userElements = document.querySelectorAll("#user_element");
console.log(userElements);
loginModalButton.addEventListener("click", () => {
  loginModal.classList.toggle("hidden");
  //   loginModal.classList.remove("hidden");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;

  const formData = {
    email: target.email.value,
    password: target.password.value,
  };

  const error = validateForm(formData, LoginSchema);

  if (error) {
    loginErrorMessage.innerHTML = error![0].message;
  } else {
    axios
      .post("http://localhost:3000/login", formData)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        location.reload();
      })
      .catch((error) => {
        loginErrorMessage.innerHTML = error.response.data.message;
      });
  }
});

let accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  window.onload = async () => {
    axios.get("http://localhost:3000/me", config).then((res) => {
      nonUserElements.forEach((el) => {
        el.classList.toggle("hidden");
      });
      userElements.forEach((el) => {
        el.classList.toggle("hidden");
      });
    });
  };
}

logOutButton.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
