import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import Swal from "sweetalert2";
import { IJOB } from "../../interfaces/job.interface";
import { formatDate } from "../../utils/formatDate";

const jobSection = document.getElementById("job_section") as HTMLDivElement;

window.onload = async () => {
  try {
    const response = await axiosInstance.get("/job/user/job");
    renderJobs(response.data.jobs);
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
function renderJobs(jobs: Array<IJOB>) {
  jobSection.innerHTML = "";
  const singleJob = document.createElement("div");
  singleJob.className = "grid grid-cols-1 gap-[1.5rem]";
  singleJob.innerHTML = " ";
  jobs.forEach((job) => {
    const formattedDate = formatDate(job.expiryDate);
    singleJob.innerHTML += `  <div
            class="flex items-center justify-between gap-5 rounded-lg bg-white p-5 shadow transition-all duration-500 hover:shadow-2xl"
          >
            <div class="flex items-center gap-2">
              <div
                class="flex size-14 items-center justify-center rounded-md bg-white shadow"
              >
                <img src="${job.logoUrl}" alt="company_logo" class="size-8" />
              </div>
              <p
                class="ms-3 min-w-[190px] text-nowrap text-lg font-semibold hover:text-blue-600"
              >
                ${job.title}
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <div
                class="flex w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-600"
              >
                <p>${job.type}</p>
              </div>
              <div class="flex items-center gap-2 text-gray-500">
                <i class="fa-regular fa-clock"></i>
                <p class="text-nowrap">${formattedDate}</p>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2 py-2 text-gray-500">
                <i class="fa-solid fa-location-dot"></i>
                <p class="capitalize">${job.location}</p>
              </div>
              <div class="text-nowrap font-semibold">
                Rs ${job.salaryMin}- Rs ${job.salaryMax}
              </div>
            </div>
            <div>
              <button
                type="button"
                class="mb-2 me-2 text-nowrap rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <i class="fa-regular fa-pen-to-square fa-lg"></i>
              </button>
              <button
                type="button"
                class="mb-2 me-2 text-nowrap rounded-lg bg-red-900 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <i class="fa-solid fa-trash fa-lg"></i>
              </button>
            </div>
          </div>`;
  });
  jobSection.appendChild(singleJob);
}
