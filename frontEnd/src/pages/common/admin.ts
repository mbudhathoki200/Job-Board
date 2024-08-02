const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
const dashboardHome = document.getElementById("dashboard") as HTMLButtonElement;
const viewJobsBtn = document.getElementById("viewJobs") as HTMLButtonElement;
const jobApplicationBtn = document.getElementById(
  "jobApplication-btn",
) as HTMLButtonElement;

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
