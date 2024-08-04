import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { calculateDays } from "../../utils/calculateDays";
import { formatDate } from "../../utils/formatDate";
import Swal from "sweetalert2";

const applicationSection = document.getElementById(
  "application-section",
) as HTMLDivElement;
const applicationCount = document.getElementById("job-count") as HTMLDivElement;

window.onload = async () => {
  try {
    const response = await axiosInstance.get("/application/get");
    renderApplications(response.data.Applications);
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

function renderApplications(applications: any) {
  const count = applications.length;
  applicationSection.innerHTML = " ";
  const singleJob = document.createElement("div");
  singleJob.className = "grid grid-cols-1 gap-[1.5rem]";
  singleJob.innerHTML = " ";
  applicationCount.innerHTML = count;

  applications.forEach((application: any) => {
    const remainigDays = calculateDays(application.expiryDate);
    const formattedDate = formatDate(application.expiryDate);
    singleJob.innerHTML += /*HTML*/ `<div
            class="flex justify-center rounded-lg bg-gray-400/20 p-6 shadow-md"
          >
            <div class="flex w-[95%] flex-col gap-2">
              <p
                class="w-fit rounded-full bg-blue-500 p-2 text-base font-semibold text-white"
              >
                <span class="text-lg font-semibold">Application Id: </span>
                ${application.id}
              </p>
              <div class="flex gap-10">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2">
                    <p class="text-xl font-semibold">Job Details</p>
                    <i class="fa-solid fa-caret-down fa-lg"></i>
                  </div>
                  <div
                    class="w-fit cursor-pointer space-y-5 rounded-xl border bg-white p-6 hover:shadow-lg"
                  >
                    <div class="flex flex-col gap-4">
                      <div class="flex gap-4">
                        <img
                          src="${application.logoUrl}"
                          alt="company logo"
                          class="h-16 w-16 rounded-full object-cover"
                        />
                        <div class="flex flex-col gap-3">
                        <p class="text-xl font-semibold">${application.title}</p>
                                                <p class="uppercase tracking-widest text-blue-500">
                          ${application.name}
                        </p>
                      </div>
                      </div>
                    </div>
                    <div class="flex gap-1">
                      <div
                        class="flex items-center justify-center gap-2 text-nowrap rounded-lg bg-gray-100 p-3"
                      >
                        <i
                          class="fa-regular fa-clock"
                          style="color: #9e9e9e"
                        ></i>
                        <p class="text-xs text-gray-500">${remainigDays}</p>
                      </div>
                      <div
                        class="flex items-center justify-center gap-2 text-nowrap rounded-lg bg-gray-100 p-3"
                      >
                        <i
                          class="fa-solid fa-location-dot"
                          style="color: #9e9e9e"
                        ></i>
                        <p class="text-xs capitalize text-gray-500">
                          ${application.location}
                        </p>
                      </div>
                      <div
                        class="flex items-center justify-center gap-2 text-nowrap rounded-lg bg-gray-100 p-3"
                      >
                        <i
                          class="fa-solid fa-briefcase"
                          style="color: #9e9e9e"
                        ></i>
                        <p class="text-xs capitalize text-gray-500">
                          ${application.type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2">
                    <p class="text-xl font-semibold">Applicant Details</p>
                    <i class="fa-solid fa-caret-down fa-lg"></i>
                  </div>

                  <div
                    class="w-80 cursor-pointer rounded-xl border bg-white p-5 hover:shadow-lg space-y-2"
                  >
                    <p>
                      <span class="text-md font-semibold">Name: </span>${application.userName}
                    </p>
                    <p>
                      <span class="text-md font-semibold">Email: </span
                      >${application.email}
                    </p>
                    <div class="flex items-center gap-3">
                      <p class="text-md font-semibold">Resume</p>
                      <div class="flex items-center justify-center gap-3">
                        
                        <button
                          type="button"
                          id="viewResumeBtn"
                          data-resume-url="${application.resumeUrl}"
                          class="viewResumeBtn me-2 flex items-center gap-3 rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <i class="fa-solid fa-eye fa-lg"></i>
                          View Resume
                        </button>
                      </div>
                    </div>
                    <p>
                      <span class="text-md font-semibold">Applied Date: </span
                      >${formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  });
  applicationSection.appendChild(singleJob);

  document.querySelectorAll(".viewResumeBtn").forEach((button) => {
    button.addEventListener("click", handleViewBtn);
  });
}

function handleViewBtn(event: Event) {
  const button = event.currentTarget as HTMLButtonElement;
  const resumeUrl = button.getAttribute("data-resume-url");
  if (resumeUrl) {
    window.open(resumeUrl, "_blank");
  } else {
    console.error("Resume URL not found");
  }
}
