import axios from "axios";
import { validateForm } from "../utils/validator";
import { LoginSchema, RegisterUserSchema } from "../schema/user.schema";
import Swal from "sweetalert2";
import axiosInstance from "../axios";
const loginModal = document.getElementById("login_Modal2") as HTMLDivElement;
const signUpButton = document.getElementById("signup-btn") as HTMLButtonElement;
const logOutButton = document.getElementById("logout-btn") as HTMLButtonElement;
const loginForm = document.getElementById("login_form") as HTMLFormElement;
const signupForm = document.getElementById("signup_Form") as HTMLFormElement;
const loginErrorMessage = document.getElementById(
  "errorMessage",
) as HTMLDivElement;
const signUpErrorMessage = document.getElementById(
  "signUperrorMessage",
) as HTMLDivElement;
const userProfileBtn = document.getElementById(
  "user--btn",
) as HTMLButtonElement;
const nonUserElements = document.querySelectorAll("#none_user_element");
const userElements = document.querySelectorAll("#user_element");

signUpButton.addEventListener("click", () => {
  signupForm.classList.remove("hidden");
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
    return;
  }
  axios
    .post("http://localhost:3000/login", formData)
    .then((res) => {
      localStorage.setItem("accessToken", res.data.data.accessToken);
      validateUser();
    })
    .catch((error) => {
      loginErrorMessage.innerHTML = error.response.data.message;
    });
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const target = event.target as HTMLFormElement;
  const formData = {
    name: target.userName.value,
    email: target.userEmail.value,
    password: target.userPassword.value,
    roles: target.roles.value,
  };
  const error = validateForm(formData, RegisterUserSchema);
  if (error) {
    signUpErrorMessage.innerHTML = error![0].message;
  } else {
    axios
      .post("http://localhost:3000/signUp", formData)
      .then(() => {
        signupForm.classList.add("hidden");
        Swal.fire({
          title: "Account created!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        signUpErrorMessage.innerHTML = error.response.data.message;
      });
  }
});

async function validateUser() {
  let accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const response = await axiosInstance.get("/me");
      console.log(response.data.data);
      const userData = response.data.data;
      if (userData.roles == "admin") {
        window.location.href =
          "http://localhost:5173/src/pages/admin_dashboard/index.html";
      }
      nonUserElements.forEach((el) => {
        el.classList.add("hidden");
        el.classList.remove("flex");
      });
      userElements.forEach((el) => {
        el.classList.toggle("hidden");
      });
      loginModal.classList.add("hidden");
    } catch (error) {}
  }
}

logOutButton.addEventListener("click", () => {
  localStorage.clear();
  // location.reload();
  window.location.href = "/";
});

userProfileBtn.addEventListener("click", () => {
  const location = "http://localhost:5173/src/pages/user_profile/index.html";
  if (window.location.href !== location) {
    window.location.href = location;
  }
});

window.onload = async () => {
  validateUser();
};
