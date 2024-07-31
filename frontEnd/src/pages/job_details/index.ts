import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import { IJOB } from "../../interfaces/job.interface";

const jobDetailsSection = document.getElementById(
  "job_details",
) as HTMLDivElement;

let fileInput: HTMLInputElement | null = null;

const modal = document.getElementById("modal") as HTMLDivElement;

window.onload = async () => {
  let params = new URL(document.location.toString()).searchParams;
  const id = params.get("id");
  try {
    const response = await axiosInstance.get(`/job/${id}`);
    renderJobPage(response.data.job);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      timer: 1000,
    });
  }
};

function renderJobPage(data: IJOB) {
  jobDetailsSection.innerHTML = "";
  modal.innerHTML = "";
  const dateFormated = formatDate(data.postDate);
  jobDetailsSection.innerHTML = /*html*/ `<div class="flex w-[80%] gap-8">
        <div class="w-[60%]">
          <div class="flex flex-col gap-8">
            <div
              class="flex items-center gap-10 rounded-lg border bg-white p-8"
            >
              <img src="${data.logoUrl}" alt="logo" class="size-28 rounded-full" />
              <div class="flex flex-col gap-4">
                <p class="text-3xl font-bold capitalize">${data.title}</p>
                <div class="flex gap-8 text-gray-600">
                  <div class="flex items-center gap-2">
                    <i
                      class="fa-regular fa-building fa-lg"
                      style="color: #1e88e5"
                    ></i>
                    <p class="capitalize">${data.companyName}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <i
                      class="fa-solid fa-location-dot fa-lg"
                      style="color: #1e88e5"
                    ></i>
                    <div class="capitalize">${data.location}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-8 rounded-lg border bg-white p-8">
              <div class="flex flex-col gap-4">
                <p class="text-2xl font-semibold">Job Description:</p>
                <p class="text-gray-700">
                  ${data.description}
                </p>
              </div>
              <div class="flex flex-col gap-4">
                <p class="text-2xl font-semibold">Requirements:</p>
                <p class="text-gray-700">
                  ${data.requirements}
                </p>
              </div>
            </div>
            <div
              class="flex flex-col gap-3 rounded-lg border bg-white p-8 text-gray-700"
            >
              <p class="text-2xl font-semibold text-black">About Company</p>
              <p>
                <span class="text-lg font-semibold text-black">Name: </span
                >${data.companyName}
              </p>
              <p class="capitalize">
                <span class="text-lg font-semibold text-black capitalize">Location: </span
                >${data.location}
              </p>
              <p>
                <span class="text-lg font-semibold text-black">Website: </span
                >${data.website}
              </p>
              <p>
               ${data.companyDescription}
              </p>
            </div>
          </div>
        </div>
        <div class="flex h-max w-[32%] flex-col gap-4">
          <div class="rounded-lg border bg-white">
            <div class="border-b-2 p-8">
              <p class="text-2xl font-semibold">Job Information</p>
            </div>
            <div class="flex flex-col gap-3 p-8">
              <div class="flex items-center gap-5">
                <div class="w-7">
                  <i class="fa-solid fa-user-check fa-xl"></i>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-xl font-medium">Employee Type:</p>
                  <p class="text-lg text-blue-600 capitalize">${data.type}</p>
                </div>
              </div>
              <div class="flex items-center gap-5">
                <div class="w-7">
                  <i class="fa-solid fa-location-dot fa-xl"></i>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-xl font-medium">Location:</p>
                  <p class="text-lg text-blue-600 capitalize">${data.location}</p>
                </div>
              </div>
              <div class="flex items-center gap-5">
                <div class="w-7">
                  <i class="fa-solid fa-desktop fa-xl"></i>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-xl font-medium">Job Type:</p>
                  <p class="text-lg text-blue-600">${data.title}</p>
                </div>
              </div>
              <div class="flex items-center gap-5">
                <div class="w-7">
                  <i class="fa-solid fa-briefcase fa-xl"></i>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-xl font-medium">Experience:</p>
                  <p class="text-lg text-blue-600">${data.experience}</p>
                </div>
              </div>
              <div class="flex items-center gap-5">
                <div class="w-7">
                  <i class="fa-solid fa-arrow-turn-up fa-xl"></i>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-xl font-medium">Level:</p>
                  <p class="text-lg text-blue-600">${data.level}</p>
                </div>
              </div>
              <div class="flex items-center gap-5">
                <div class="w-7">
                  <i class="fa-solid fa-rupee-sign fa-xl"></i>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-xl font-medium">Salary:</p>
                  <p class="text-lg text-blue-600">Rs ${data.salaryMin}-Rs ${data.salaryMax}</p>
                </div>
              </div>
              <div class="flex items-center gap-5">
                <div class="w-7">
                  <i class="fa-solid fa-users fa-xl"></i>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-xl font-medium">Openings:</p>
                  <p class="text-lg text-blue-600">${data.openings}</p>
                </div>
              </div>
              <div class="flex items-center gap-5">
                <div class="w-7">
                  <i class="fa-regular fa-clock fa-xl"></i>
                </div>
                <div class="flex flex-col gap-2">
                  <p class="text-xl font-medium">Date posted::</p>
                  <p class="text-lg text-blue-600">${dateFormated}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-4 rounded-lg border bg-white p-8">
            <p class="text-lg font-bold">Are you intersted in this Job?</p>
            <button
              class="select-none rounded-lg border-2 border-blue-900 px-8 py-3 text-center align-middle font-sans text-base font-bold uppercase text-blue-600 transition-all hover:opacity-75 focus:ring focus:ring-blue-300 active:opacity-[0.85]"
              type="button" id="apply-btn"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>`;
  const applyBtn = document.getElementById("apply-btn") as HTMLButtonElement;

  modal.innerHTML = /*HTML*/ `<div
        class="fixed inset-0 z-50 flex items-center justify-center w-full transition-all duration-500 bg-black rounded-lg shadow-2xl bg-opacity-35"
      >
        <div class="fixed w-[40%] rounded-lg bg-white shadow-lg">
          <button
            class="absolute flex items-center justify-center text-3xl font-bold cursor-pointer right-4 top-2 size-10"
            id="btn--close-modal"
          >
            &times;
          </button>

          <div class="p-6 text-lg font-bold bg-white border-b-2 rounded-t-lg">
            Apply to ${data.companyName}
          </div>
          <form class="flex flex-col gap-4 p-6" id="apply_form">
            <p class="font-medium">Upload Resume</p>
            <p class="">Be sure to include an updated resume *</p>
            <input
              class="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 file:mx-3 file:h-9 file:cursor-pointer file:rounded-md file:border-none file:bg-blue-700 file:px-3 file:text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
              required
            />
            <p class="mt-1 text-sm text-gray-600" id="file_input_help ">
              PDF, PNG or JPG (MAX. 10 MB).
            </p>
            <button
              type="submit"
              class="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Apply
            </button>
          </form>
        </div>
      </div>`;

  const applyForm = document.getElementById("apply_form") as HTMLFormElement;

  fileInput = document.getElementById("file_input") as HTMLInputElement;

  applyForm.addEventListener("submit", handleApplyJob);

  applyBtn.addEventListener("click", () => {
    modal.classList.toggle("hidden");
  });
  const modalCloseBtn = document.getElementById(
    "btn--close-modal",
  ) as HTMLButtonElement;

  modalCloseBtn.addEventListener("click", () => {
    modal.classList.toggle("hidden");
  });
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

async function handleApplyJob(event: SubmitEvent) {
  event.preventDefault();
  // const target = event.target as HTMLFormElement;
  if (!fileInput || !fileInput.files?.length) {
    alert("Please select a file.");
    return;
  }
  const file = fileInput.files[0];
  const formData = new FormData();

  formData.append("resume", file);

  submitApplyForm(formData);
  modal.classList.toggle("hidden");
}

async function submitApplyForm(formData: FormData) {
  let params = new URL(document.location.toString()).searchParams;
  const id = params.get("id");
  try {
    await axiosInstance.post(`/apply/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
