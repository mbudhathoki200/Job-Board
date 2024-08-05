import { AxiosError } from "axios";
import axiosInstance from "../axios";
import { IUser } from "../interfaces/user.interface";
import { LoginSchema, RegisterUserSchema } from "../schema/user.schema";
import { validateForm } from "../utils/validator";
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
const nonUserElement = document.getElementById("none_user_element");
const userElement = document.getElementById("user_element");

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
  loginUser(formData);
});

signupForm.addEventListener("submit", async (event) => {
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
    try {
      await axiosInstance.post("http://localhost:3000/signUp", formData);
      signupForm.classList.add("hidden");
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
      loginUser(loginData);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        loginErrorMessage.innerHTML = error.response.data.message;
      }
    }
  }
});

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

export async function validateUser() {
  let accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const response = await axiosInstance.get("/me");
      const userData = response.data.data;
      if (userData.roles == "admin") {
        window.location.href =
          "http://localhost:5173/src/pages/admin_dashboard/index.html";
      }
      if (nonUserElement && userElement) {
        nonUserElement.classList.add("hidden");
        nonUserElement.classList.remove("flex");
        userElement.classList.remove("hidden");
        userElement.classList.add("flex");
      }
      loginModal.classList.add("hidden");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status == 401) {
          window.location.href = "/";
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  validateUser();
});

async function loginUser(data: IUser) {
  try {
    const response = await axiosInstance.post(
      "http://localhost:3000/login",
      data,
    );
    localStorage.setItem("accessToken", response.data.data.accessToken);
    validateUser();
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      loginErrorMessage.innerHTML = error.response.data.message;
    }
  }
}
