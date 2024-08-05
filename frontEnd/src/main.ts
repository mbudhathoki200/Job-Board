import { AxiosError } from "axios";
import axiosInstance from "./axios";
import { ICompany } from "./interfaces/company.interface";
import { IJOB } from "./interfaces/job.interface";
import { calculateDays } from "./utils/calculateDays";
import Swal from "sweetalert2";

const popularJobsSection = document.getElementById(
  "popular_jobs",
) as HTMLDivElement;
const companySection = document.getElementById(
  "company-section",
) as HTMLDivElement;
// const nonUserElements = document.querySelectorAll("#none_user_element");
// const userElements = document.querySelectorAll("#user_element");
// const loginModal = document.getElementById("login_Modal2") as HTMLDivElement;
const searchForm = document.getElementById("search-form") as HTMLFormElement;
const searchBar = document.getElementById("default-search") as HTMLInputElement;

window.onload = async () => {
  try {
    fetchJobs();
    fetchCompanies();
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  }
};

async function fetchJobs() {
  try {
    const jobDetails = await axiosInstance.get("/job?page=1&size=3");
    renderPopularJobs(jobDetails.data.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  }
}

async function fetchCompanies() {
  try {
    const response = await axiosInstance.get("/company/get/companies");
    renderCompanies(response.data.companies);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  }
}

function renderCompanies(companies: Array<ICompany>) {
  console.log(companies);
  const singleCompany = document.createElement("div");
  singleCompany.innerHTML = "";
  singleCompany.className = "grid grid-cols-2 gap-9";

  companies.forEach((company) => {
    singleCompany.innerHTML += `<div
          class="flex w-[350px] items-center justify-between gap-5 rounded-lg bg-white p-5 shadow transition-all duration-500 hover:shadow-2xl"
        >
          <div class="flex items-center gap-2">
            <div
              class="flex size-20 items-center justify-center rounded-md bg-white shadow"
            >
              <img
                src=${company.logoUrl}
                alt="company_logo"
                class="size-12"
              />
            </div>
            <div class="flex flex-col gap-2">
              <p
                class="ms-3 min-w-[190px] text-nowrap text-lg font-semibold hover:text-blue-600"
              >
                ${company.name}
              </p>
              <div
                class="ms-3 flex items-center gap-2 text-gray-500"
              >
                <i class="fa-solid fa-earth-americas fa-lg mt-1"></i>
                <p class="text-nowrap">${company.website}</p>
              </div>
            </div>
          </div>
        </div>`;
  });
  companySection.appendChild(singleCompany);
}

function renderPopularJobs(jobs: Array<IJOB>) {
  const singleJob = document.createElement("div");
  singleJob.innerHTML = "";
  singleJob.className = "grid grid-cols-3 gap-8";

  jobs.forEach((job) => {
    const remainigDays = calculateDays(job.expiryDate);
    singleJob.innerHTML += `<div
          class="max-w-[370px] cursor-pointer space-y-4 rounded-xl border shadow p-6 hover:shadow-2xl"
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

searchForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const searchData = searchBar.value;
  window.location.href = `http://localhost:5173/src/pages/jobs_page/index.html?search=${searchData}`;
});
