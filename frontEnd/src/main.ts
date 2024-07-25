import axios from "axios";
import { validateForm } from "./utils/validator";
import { LoginSchema } from "./schema/user.schema";

const loginModal = document.getElementById("login_Modal") as HTMLDivElement;
const loginModalButton = document.getElementById(
  "login_button"
) as HTMLButtonElement;
const loginForm = document.getElementById("login_form") as HTMLFormElement;
const loginErrorMessage = document.getElementById(
  "errorMessage"
) as HTMLDivElement;

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
      .then((res) =>
        localStorage.setItem("accessToken", res.data.data.accessToken)
      )
      .catch((error) => {
        loginErrorMessage.innerHTML = error.response.data.message;
      });
  }
});
