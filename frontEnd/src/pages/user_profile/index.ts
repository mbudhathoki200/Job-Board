import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import { formatDate } from "../../utils/formatDate";
import { AxiosError } from "axios";
const applicationSection = document.getElementById(
  "application-section",
) as HTMLDivElement;
const userEmailSection = document.getElementById(
  "user-email",
) as HTMLDivElement;
const userNameSection = document.getElementById("user-name") as HTMLDivElement;
const userRoleSection = document.getElementById("user-role") as HTMLDivElement;

window.onload = async () => {
  getApplications();
  getUserDetails();
};

async function getApplications() {
  try {
    const response = await axiosInstance.get("/application/applied");
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

function renderApplications(applications: any) {
  applicationSection.innerHTML = " ";
  const singleApplication = document.createElement("div");
  singleApplication.className = "divide-y-2";
  singleApplication.innerHTML = " ";

  applications.forEach((application: any) => {
    const formattedDate = formatDate(application.appliedDate);
    singleApplication.innerHTML += /*HTML*/ `
                <div
              class="grid grid-cols-6 place-items-center gap-4 rounded-lg p-2 font-semibold text-blue-gray-900"
            >
              <div class="flex items-center gap-4">
                <div>
                  <img src=${application.logoUrl} alt="logo" class="size-9" />
                </div>
                <div>${application.name}</div>
              </div>
              <div>${application.title}</div>
              <div>${application.type}</div>
              <div>${application.location}</div>
              <div>${formattedDate}</div>
              <div class="rounded-3xl  px-6 py-2 application-status">${application.status}</div>
            </div>`;
  });
  applicationSection.appendChild(singleApplication);
  const applicationStatuses = document.querySelectorAll(
    ".application-status",
  ) as NodeListOf<HTMLDivElement>;
  applicationStatuses.forEach((statusElement) =>
    handleStatusColor(statusElement),
  );
}

function handleStatusColor(applicationStatus: HTMLDivElement) {
  if (applicationStatus) {
    const status = applicationStatus.textContent?.trim();

    switch (status) {
      case "rejected":
        applicationStatus.classList.add("bg-red-400");
        break;
      case "accepted":
        applicationStatus.classList.add("bg-green-400");
        break;
      default:
        applicationStatus.classList.add("bg-blue-100");
        break;
    }
  }
}
async function getUserDetails() {
  try {
    const response = await axiosInstance.get("/me");
    const userDetail = response.data.data;
    userEmailSection.innerHTML = userDetail.email;
    userNameSection.innerHTML = userDetail.name;
    userRoleSection.innerHTML = userDetail.roles;
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
