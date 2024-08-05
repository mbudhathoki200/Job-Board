import { AxiosError } from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import { updateJobBodySchema } from "../../schema/job.schema";
import { formatDate, formatDateForInput } from "../../utils/formatDate";
import { validateForm } from "../../utils/validator";
import { IJOB } from "./../../interfaces/job.interface";

const jobSection = document.getElementById("job_section") as HTMLDivElement;
const modal = document.getElementById("modal") as HTMLDivElement;
const modalCloseBtn = document.getElementById(
  "btn--close-modal",
) as HTMLButtonElement;
//edit job form elements
let jobId: string | null;
const jobPostForm = document.getElementById("job-post-form") as HTMLFormElement;
const jobTitle = document.getElementById("search") as HTMLInputElement;
const jobDescription = document.getElementById(
  "description",
) as HTMLTextAreaElement;
const jobRequirements = document.getElementById(
  "requirement",
) as HTMLTextAreaElement;
const category = document.getElementById("category") as HTMLSelectElement;
const jobType = document.getElementById("type") as HTMLSelectElement;
const minSalary = document.getElementById("min_input") as HTMLInputElement;
const maxSalary = document.getElementById("max_input") as HTMLInputElement;
const experience = document.getElementById("experience") as HTMLInputElement;
const level = document.getElementById("level") as HTMLSelectElement;
const location = document.getElementById("location") as HTMLInputElement;
const openings = document.getElementById("openings") as HTMLInputElement;
const expiryDate = document.getElementById("datepicker") as HTMLInputElement;
const applicationNumberSection = document.getElementById(
  "application-number",
) as HTMLDivElement;
const applicationCount = localStorage.getItem("applications")!;

window.onload = async () => {
  applicationNumberSection.innerHTML = applicationCount;
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
    singleJob.innerHTML += /*HTML*/ `  <div
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
                id="editButton"
                data-job-id="${job.id}"
                class="edit-button mb-2 me-2 text-nowrap rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <i class="fa-regular fa-pen-to-square fa-lg"></i>
              </button>
              <button
                type="button"
                id="deleteButton"
                data-job-id="${job.id}"
                class="delete-button mb-2 me-2 text-nowrap rounded-lg bg-red-900 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <i class="fa-solid fa-trash fa-lg"></i>
              </button>
            </div>
          </div>`;
  });
  jobSection.appendChild(singleJob);
  jobButtonListeners();
}

function jobButtonListeners() {
  const editButtons = document.querySelectorAll(".edit-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  editButtons.forEach((button) => {
    button.addEventListener("click", handleEditClick);
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteClick);
  });
}

async function handleEditClick(event: Event) {
  const button = event.currentTarget as HTMLButtonElement;
  jobId = button.getAttribute("data-job-id");
  modal.classList.toggle("hidden");
  try {
    const response = await axiosInstance.get(`/job/${jobId}`);
    const jobDetails = response.data.job;
    fillJobForm(jobDetails);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to fetch job details",
    });
  }
}

modalCloseBtn.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

function handleDeleteClick(event: Event) {
  const button = event.currentTarget as HTMLButtonElement;
  const jobId = button.getAttribute("data-job-id");
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteJob(jobId!);
      Swal.fire({
        title: "Deleted!",
        text: "Your Job has been deleted.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  });
}

async function deleteJob(jobId: string) {
  try {
    await axiosInstance.delete(`/job/${jobId}`);
    refreshJobList();
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

function fillJobForm(job: IJOB) {
  jobTitle.value = job.title;
  jobDescription.value = job.description;
  jobRequirements.value = job.requirements;
  category.value = job.categoryId;
  jobType.value = job.type;
  minSalary.value = job.salaryMin.toString();
  maxSalary.value = job.salaryMax.toString();
  experience.value = job.experience.toString();
  level.value = job.level;
  location.value = job.location;
  openings.value = job.openings.toString();
  expiryDate.value = formatDateForInput(job.expiryDate);
}

jobPostForm.addEventListener("submit", handleJobSubmit);

async function handleJobSubmit(event: Event) {
  event.preventDefault();
  const formData = {
    title: jobTitle.value,
    description: jobDescription.value,
    requirements: jobRequirements.value,
    categoryId: category.value,
    type: jobType.value,
    salaryMin: minSalary.value,
    salaryMax: maxSalary.value,
    experience: experience.value,
    level: level.value,
    location: location.value,
    openings: openings.value,
    expiryDate: expiryDate.value,
  };
  const error = validateForm(formData, updateJobBodySchema);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      timer: 1000,
      text: `${error![0].message}`,
    });
  }
  try {
    await axiosInstance.put(`/job/${jobId}`, formData);
    Swal.fire({
      title: "Job Updated Successfully!",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
    modal.classList.toggle("hidden");
    jobPostForm.reset();
    refreshJobList();
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

async function refreshJobList() {
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
}
