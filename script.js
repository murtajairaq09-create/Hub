document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("date");
  const today = new Date();
  dateElement.textContent = today.toDateString();

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const checkboxes = document.querySelectorAll(".task input[type='checkbox']");
  const progressFill = document.getElementById("progressFill");
  const progressDisplay = document.getElementById("progressDisplay");
  const projectInput = document.getElementById("projectInput");
  const addProjectBtn = document.getElementById("addProjectBtn");
  const projectsList = document.getElementById("projectsList");
  const todayProject = document.getElementById("todayProject");

  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  // Load saved projects
  function loadProjects() {
    projectsList.innerHTML = "";
    projects.forEach((project, index) => {
      const li = document.createElement("li");
      li.textContent = project;
      projectsList.appendChild(li);
    });
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  // Add project
  addProjectBtn.addEventListener("click", () => {
    const project = projectInput.value.trim();
    if (project) {
      projects.push(project);
      projectInput.value = "";
      loadProjects();
      setRandomProject();
    }
  });

  // Random project of the day
  function setRandomProject() {
    if (projects.length > 0) {
      const randomIndex = Math.floor(Math.random() * projects.length);
      todayProject.textContent = projects[randomIndex];
    } else {
      todayProject.textContent = "No projects yet!";
    }
  }

  // Tabs switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });

  // Progress bar update
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const checkedCount = document.querySelectorAll(".task input:checked").length;
      const total = checkboxes.length;
      const percent = Math.round((checkedCount / total) * 100);
      progressFill.style.width = percent + "%";
      progressDisplay.textContent = percent + "% Complete";
    });
  });

  // Initial setup
  loadProjects();
  setRandomProject();
});
