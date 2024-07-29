import axiosInstance from "../../axios";

const jobDetailsSection = document.getElementById("job_details");

window.onload = async () => {
  let params = new URL(document.location.toString()).searchParams;
  const id = params.get("id");
  try {
    const response = await axiosInstance.get(`/job/${id}`);
    console.log(response.data.job);
  } catch (error) {}
};
