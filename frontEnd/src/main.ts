import axiosInstance from "./axios";
import { IJOB } from "./interfaces/job.interface";
import { calculateDays } from "./utils/calculateDays";

const popularJobsSection = document.getElementById(
  "popular_jobs",
) as HTMLDivElement;
const nonUserElements = document.querySelectorAll("#none_user_element");
const userElements = document.querySelectorAll("#user_element");
const loginModal = document.getElementById("login_Modal2") as HTMLDivElement;

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
