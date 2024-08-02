const downloadBtn = document.getElementById(
  "downloadResumeBtn",
) as HTMLButtonElement;
const viewBtn = document.getElementById("viewResumeBtn") as HTMLButtonElement;
const resumeUrl =
  "https://res.cloudinary.com/dqxhzhiha/image/upload/v1722503655/l178tyyynehjav0lxsnz.pdf";

downloadBtn.addEventListener("click", () => {
  fetch(resumeUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => console.error("Error downloading the file:", error));
});

viewBtn.addEventListener("click", () => {
  window.open(resumeUrl, "_blank");
});
