import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import { AxiosError } from "axios";

const jobCountSection = document.getElementById("job-posts") as HTMLDivElement;
const applicationCountSection = document.getElementById(
  "applications",
) as HTMLDivElement;
const companyCountSection = document.getElementById(
  "companies",
) as HTMLDivElement;
const applicationNumberSection = document.getElementById(
  "application-number",
) as HTMLDivElement;
const applicationCount = localStorage.getItem("applications")!;

document.addEventListener("DOMContentLoaded", () => {
  fetchApplications();
  fetchCompanies();
  fetchPosts();
  applicationNumberSection.innerHTML = applicationCount;
});

async function fetchApplications() {
  try {
    const response = await axiosInstance.get("/application/get");
    const applications = response.data.Applications;
    const applicationCount = applications.length;
    localStorage.setItem("applications", applicationCount);
    applicationCountSection.innerHTML = applicationCount;
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

async function fetchCompanies() {
  try {
    const response = await axiosInstance.get("/company");
    const companies = response.data.companies;
    const companiesCount = companies.length;
    companyCountSection.innerHTML = companiesCount;
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

async function fetchPosts() {
  try {
    const response = await axiosInstance.get("/job/user/job");
    const posts = response.data.jobs;
    const postsCount = posts.length;
    jobCountSection.innerHTML = postsCount;
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
