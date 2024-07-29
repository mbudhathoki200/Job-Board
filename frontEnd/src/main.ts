import axios from "axios";
import { validateForm } from "./utils/validator";
import { LoginSchema, RegisterUserSchema } from "./schema/user.schema";
import Swal from "sweetalert2";
import axiosInstance from "./axios";

const loginModal = document.getElementById("login_Modal") as HTMLDivElement;
// const signUpModal = document.getElementById("signUp_modal") as HTMLDivElement;
const signUpButton = document.getElementById("signup-btn") as HTMLButtonElement;
const loginModalButton = document.getElementById(
  "login_button",
) as HTMLButtonElement;
const logOutButton = document.getElementById("logout-btn") as HTMLButtonElement;
const loginForm = document.getElementById("login_form") as HTMLFormElement;
const signupForm = document.getElementById("signup_Form") as HTMLFormElement;
const loginErrorMessage = document.getElementById(
  "errorMessage",
) as HTMLDivElement;
const signUpErrorMessage = document.getElementById(
  "signUperrorMessage",
) as HTMLDivElement;
const nonUserElements = document.querySelectorAll("#none_user_element");
const userElements = document.querySelectorAll("#user_element");

loginModalButton.addEventListener("click", () => {
  loginModal.classList.toggle("hidden");
  //   loginModal.classList.remove("hidden");
});

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

let accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  window.onload = async () => {
    axios.get("http://localhost:3000/me", config).then(() => {
      nonUserElements.forEach((el) => {
        el.classList.toggle("hidden");
      });
      userElements.forEach((el) => {
        el.classList.toggle("hidden");
      });
    });
  };
}

window.onload = async () => {
  try {
    const jobDetails = await axiosInstance.get("/job?page=1&size=3");
    // const companyId = jobDetails.data.data.companyId;
    // const companyDetails = await axiosInstance.get("/");
    renderJobs(jobDetails.data.data);
  } catch (error) {
    console.log(error);
  }
};

function renderJobs(jobs: any) {
  console.log(jobs);
}

logOutButton.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
