import { AxiosError } from "axios";
import axiosInstance from "../../axios";
import { calculateDays } from "../../utils/calculateDays";
import { formatDate } from "../../utils/formatDate";
import Swal from "sweetalert2";

const applicationSection = document.getElementById(
  "application-section",
) as HTMLDivElement;
const applicationNumberSection = document.getElementById(
  "application-number",
) as HTMLDivElement;
const applicationCount = localStorage.getItem("applications")!;
window.onload = async () => {
  try {
    getApplications();
    applicationNumberSection.innerHTML = applicationCount;
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
  applicationSection.innerHTML = " ";
  const singleJob = document.createElement("div");
  singleJob.className = "grid grid-cols-1 gap-[1.5rem]";
  singleJob.innerHTML = " ";

  applications.forEach((application: any) => {
    const remainigDays = calculateDays(application.expiryDate);
    const formattedDate = formatDate(application.expiryDate);
    singleJob.innerHTML += /*HTML*/ `<div
            class="flex rounded-xl bg-white p-6 shadow-md border-2 border-white"
          >
            <div class="flex w-fit flex-col gap-2 p-2">
            <div class="flex text-center justify-between">
              <p
                class="w-fit rounded-full bg-blue-500 p-2 text-base font-semibold text-white"
              >
                <span class="text-base font-medium">Application Id: </span>
                ${application.id}
              </p>
              <div class="flex items-center gap-3">
  <p class="text-md font-semibold">Status:</p>
  <select
    class="statusDropdown rounded border p-1"
    data-application-id="${application.id}"
  >
    <option value="submitted" ${application.status === "submitted" ? "selected" : ""}>Submitted</option>
    <option value="reviewing" ${application.status === "reviewing" ? "selected" : ""}>Reviewing</option>
    <option value="accepted" ${application.status === "accepted" ? "selected" : ""}>Accepted</option>
    <option value="rejected" ${application.status === "rejected" ? "selected" : ""}>Rejected</option>
  </select>
</div>
            </div>
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
  document.querySelectorAll(".statusDropdown").forEach((dropdown) => {
    dropdown.addEventListener("change", handleStatusChange);
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

async function handleStatusChange(event: Event) {
  const dropdown = event.currentTarget as HTMLSelectElement;
  const applicationId = dropdown.getAttribute("data-application-id");
  const newStatus = dropdown.value;
  const updateData = { status: newStatus };
  try {
    const response = await axiosInstance.put(
      `/application/update/${applicationId}`,
      updateData,
    );
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: "Application status has been updated successfully.",
        timer: 1000,
        showConfirmButton: false,
      });
    }
    getApplications();
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

async function getApplications() {
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
}
