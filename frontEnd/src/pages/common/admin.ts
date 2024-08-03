import { AxiosError } from "axios";
import axiosInstance from "../../axios";

const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
const dashboardHome = document.getElementById("dashboard") as HTMLButtonElement;
const viewJobsBtn = document.getElementById("viewJobs") as HTMLButtonElement;
const jobApplicationBtn = document.getElementById(
  "jobApplication-btn",
) as HTMLButtonElement;
const postJobBtn = document.getElementById("postJob-btn") as HTMLButtonElement;
const displayName = document.getElementById("userName") as HTMLDivElement;

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "http://localhost:5173/";
});

dashboardHome.addEventListener("click", () => {
  const location = "http://localhost:5173/src/pages/admin_dashboard/index.html";
  if (window.location.href != location) {
    window.location.href = location;
  }
});

viewJobsBtn.addEventListener("click", () => {
  const location = "http://localhost:5173/src/pages/admin_viewJobs/index.html";
  if (window.location.href != location) {
    window.location.href = location;
  }
});

jobApplicationBtn.addEventListener("click", () => {
  const location =
    "http://localhost:5173/src/pages/admin_jobapplication/index.html";
  if (window.location.href != location) {
    window.location.href = location;
  }
});
postJobBtn.addEventListener("click", () => {
  const location = "http://localhost:5173/src/pages/admin_postjob/index.html";
  if (window.location.href != location) {
    window.location.href = location;
  }
});

window.onload = async () => {
  try {
    const response = await axiosInstance.get("/me");
    const userDetails = response.data.data;
    const userName = userDetails.name;
    displayName.innerHTML = "";
    displayName.innerHTML = userName!;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status == 401) {
        window.location.href = "/";
      }
    }
  }
};
