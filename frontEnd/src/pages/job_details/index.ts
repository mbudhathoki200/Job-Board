import axiosInstance from "../../axios";
import { IJOB } from "../../interfaces/job.interface";

const jobDetailsSection = document.getElementById(
  "job_details",
) as HTMLDivElement;

window.onload = async () => {
  let params = new URL(document.location.toString()).searchParams;
  const id = params.get("id");
  try {
    const response = await axiosInstance.get(`/job/${id}`);
    renderJobPage(response.data.job);
  } catch (error) {
    console.log(error);
  }
};

function renderJobPage(data: IJOB) {
  jobDetailsSection.innerHTML = "";
  const dateFormated = formatDate(data.postDate);
  jobDetailsSection.innerHTML = `<div class="flex w-[80%] gap-8">
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
              type="button"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>`;
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
