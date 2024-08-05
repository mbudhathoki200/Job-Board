import { AxiosError } from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../../axios";
import { ICompany } from "../../interfaces/company.interface";
import { createCompanySchema } from "../../schema/company.schema";
import { updateJobBodySchema } from "../../schema/job.schema";
import { validateForm } from "../../utils/validator";

const modal = document.getElementById("modal") as HTMLDivElement;
const dropdownElement = document.getElementById(
  "companyDropdown",
) as HTMLSelectElement;
const modalCloseBtn = document.getElementById(
  "btn--close-modal",
) as HTMLButtonElement;
const modalOpenBtn = document.getElementById(
  "btn--open-modal",
) as HTMLButtonElement;
//add company form
const addCompanyForm = document.getElementById(
  "company_register_form",
) as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const descriptionInput = document.getElementById(
  "description",
) as HTMLTextAreaElement;
const websiteInput = document.getElementById("website") as HTMLInputElement;
const fileInput = document.getElementById("file_input") as HTMLInputElement;
//add job form
const addJobForm = document.getElementById("job-post-form") as HTMLFormElement;
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
const companyDropdown = document.getElementById(
  "companyDropdown",
) as HTMLSelectElement;
const applicationNumberSection = document.getElementById(
  "application-number",
) as HTMLDivElement;
const applicationCount = localStorage.getItem("applications")!;

modalCloseBtn.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

modalOpenBtn.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

let companiesArr: ICompany[] = [];

addCompanyForm.addEventListener("submit", handleCompanySubmitForm);

async function handleCompanySubmitForm(event: Event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", nameInput.value);
  formData.append("description", descriptionInput.value);
  formData.append("website", websiteInput.value);

  if (fileInput.files && fileInput.files[0]) {
    formData.append("logo", fileInput.files[0]);
  }

  const error = validateForm(formData, createCompanySchema);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      timer: 1000,
      text: `${error![0].message}`,
    });
  }

  try {
    const response = await axiosInstance.post("/company/add", formData);
    const newCompany = response.data.company;
    console.log(newCompany);
    companiesArr.push(newCompany);
    addCompanyForm.reset();
    updateDropDown();
    modal.classList.toggle("hidden");
    Swal.fire({
      title: "Company Added Successfully!",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.log(error.response);
    }
  }
}

window.onload = async () => {
  applicationNumberSection.innerHTML = applicationCount;
  try {
    const response = await axiosInstance.get("/company");
    const companies = response.data.companies;
    companiesArr = companies;
    updateDropDown();
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status == 401) {
        window.location.href = "/";
      }
    }
  }
};

function updateDropDown() {
  dropdownElement.innerHTML = '<option value="">Select a company</option>';
  companiesArr.forEach((company) => {
    const option = document.createElement("option");
    option.value = company.id;
    option.textContent = company.name;
    dropdownElement.appendChild(option);
  });
}
addJobForm.addEventListener("submit", handleJobSubmit);

async function handleJobSubmit(event: Event) {
  event.preventDefault();
  const formData = {
    companyId: companyDropdown.value,
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
    await axiosInstance.post("/job/add", formData);
    Swal.fire({
      title: "Job Added Successfully!",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
    });
    addJobForm.reset();
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
