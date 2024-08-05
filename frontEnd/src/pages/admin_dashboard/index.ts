import { AxiosError } from "axios";
import axiosInstance from "../../axios";

const jobCountSection = document.getElementById("job-posts") as HTMLDivElement;
const applicationCountSection = document.getElementById(
  "applications",
) as HTMLDivElement;
const companyCountSection = document.getElementById(
  "companies",
) as HTMLDivElement;
let applicationNumberSection = document.getElementById(
  "application-number",
) as HTMLDivElement;

document.addEventListener("DOMContentLoaded", () => {
  fetchApplications();
  fetchCompanies();
  fetchPosts();
});

async function fetchApplications() {
  try {
    const response = await axiosInstance.get("/application/get");
    const applications = response.data.Applications;
    const applicationCount = applications.length;
    applicationCountSection.innerHTML = applicationCount;
    applicationNumberSection.innerHTML = applicationCount;
    localStorage.setItem("applications", applicationCount);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status == 404) {
        applicationCountSection.innerHTML = "0";
        localStorage.setItem("applications", "0");
        applicationNumberSection.innerHTML = "0";
      }
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
      if (error.response.status == 404) {
        companyCountSection.innerHTML = "0";
      }
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
      if (error.response.status == 404) {
        jobCountSection.innerHTML = "0";
      }
    }
  }
}
const storedApplicationCount = localStorage.getItem("applications");
applicationNumberSection.innerHTML = storedApplicationCount || "0";
