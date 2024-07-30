import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import { IJOB } from "../../interfaces/job.interface";
import { formatDate } from "../../utils/formatDate";

const jobSection = document.getElementById("job_section") as HTMLDivElement;

window.onload = async () => {
  try {
    const jobDetails = await axiosInstance.get("/job");
    renderJobs(jobDetails.data.data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error}`,
    });
  }
};

function renderJobs(jobs: Array<IJOB>) {
  const singleJob = document.createElement("div");
  singleJob.className = "grid grid-cols-1 gap-[1.5rem]";
  singleJob.innerHTML = " ";

  jobs.forEach((job) => {
    const formattedDate = formatDate(job.expiryDate);
    console.log(job);
    singleJob.innerHTML += ` <div
            class="flex items-center justify-between gap-5 rounded-lg bg-white p-5 shadow transition-all duration-500 hover:shadow-2xl"
          >
            <div class="flex items-center gap-2">
              <div
                class="flex size-14 items-center justify-center rounded-md bg-white shadow"
              >
                <img
                  src="${job.logoUrl}"
                  alt="company_logo"
                  class="size-8"
                />
              </div>
              <p
                class="ms-3 min-w-[190px] text-lg font-semibold hover:text-blue-600 text-nowrap"
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
              <div class="font-semibold text-nowrap">Rs ${job.salaryMin}- Rs ${job.salaryMax}</div>
            </div>
            <a href=".././job_details/?id=${parseInt(job.id)}">
            <button
              type="button"
              class="mb-2 me-2 text-nowrap rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              View Details
            </button>
            </a>
            
          </div>`;
  });
  jobSection.appendChild(singleJob);
}
