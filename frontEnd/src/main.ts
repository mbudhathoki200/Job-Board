import axios from "axios";
import { validateForm } from "./utils/validator";
import { LoginSchema, RegisterUserSchema } from "./schema/user.schema";
import Swal from "sweetalert2";
import axiosInstance from "./axios";
import { IJOB } from "./interfaces/job.interface";

const loginModal = document.getElementById("login_Modal") as HTMLDivElement;
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
const popularJobsSection = document.getElementById(
  "popular_jobs",
) as HTMLDivElement;

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
    return;
  }
  axios
    .post("http://localhost:3000/login", formData)
    .then((res) => {
      localStorage.setItem("accessToken", res.data.data.accessToken);
      vaidateUser();
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

async function vaidateUser() {
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
  // document.addEventListener("DOMContentLoaded", async () => {});
}

window.onload = async () => {
  try {
    const jobDetails = await axiosInstance.get("/job?page=1&size=3");
    renderPopularJobs(jobDetails.data.data);
  } catch (error) {
    console.log(error);
  }
};

function renderPopularJobs(jobs: Array<IJOB>) {
  const singleJob = document.createElement("div");
  singleJob.innerHTML = "";
  singleJob.className = "grid grid-cols-3 gap-5";

  jobs.forEach((job) => {
    const remainigDays = calculateDays(job.expiryDate);
    singleJob.innerHTML += `<div
          class="max-w-[370px] cursor-pointer space-y-4 rounded-xl border-2 p-6 hover:shadow-2xl"
        >
          <div class="flex flex-col gap-3">
            <div>
              <img
                src="${job.logoUrl}"                alt="company logo"
                class="h-16 w-16 rounded-full object-cover"
              />
            </div>
            <div class="flex flex-col gap-3">
              <p class="text-xl font-semibold">${job.title}</p>
              <p class="uppercase tracking-widest text-blue-500">${job.companyName}</p>
            </div>
          </div>
          <div>
            <p class="text-gray-500 ">${
              job.description.length > 40
                ? job.description.slice(0, 40) + "..."
                : job.description
            }</p>
          </div>
          <div class="flex gap-1">
            <div
              class="flex items-center justify-center gap-2 rounded-lg bg-gray-100 p-3 text-nowrap"
            >
              <i class="fa-regular fa-clock" style="color: #9e9e9e"></i>
              <p class="text-xs text-gray-500">${remainigDays}</p>
            </div>
            <div
              class="flex items-center justify-center gap-2 rounded-lg bg-gray-100 p-3 text-nowrap"
            >
              <i class="fa-solid fa-location-dot" style="color: #9e9e9e"></i>
              <p class="text-xs text-gray-500 capitalize">${job.location}</p>
            </div>
            <div
              class="flex items-center justify-center gap-2 rounded-lg bg-gray-100 p-3 text-nowrap"
            >
              <i class="fa-solid fa-briefcase" style="color: #9e9e9e"></i>
              <p class="text-xs text-gray-500 capitalize">${job.type}</p>
            </div>
          </div>
          <div>
            <div
              class="flex max-w-fit items-center gap-2 rounded-lg bg-gray-100 p-3 hover:scale-110"
            >
              <a
                href="./src/pages/job_details/?id=${parseInt(job.id)}"
                class="text-sm font-bold text-blue-500"
              >
                <span class="mr-2">Apply Now</span>
                <i
                  class="fa-regular fa-circle-right fa-xl"
                  style="color: #42a5f5"
                ></i
              ></a>
            </div>
          </div>
        </div>`;
  });
  popularJobsSection.appendChild(singleJob);
}

function calculateDays(expiryDate: string) {
  const expDate = new Date(expiryDate);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffTime = expDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "Expired";
  } else {
    return `${diffDays} days left`;
  }
}

logOutButton.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

document.addEventListener("DOMContentLoaded", async () => {
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
});
