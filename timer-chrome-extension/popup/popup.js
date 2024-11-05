let tasks = [{ text: "", completed: false }];

function updateTime() {
  chrome.storage.local.get(["timer", "timeOption"], (res) => {
    const time = document.getElementById("time");
    const timeOption = res?.timeOption ? res.timeOption : 25;
    const timer = res.timer ? res.timer : 0;
    const minutes = `${timeOption - Math.ceil(timer / 60)}`.padStart(2, "0");
    let seconds = "00";
    if (timer % 60 != 0) {
      seconds = `${60 - (timer % 60)}`.padStart(2, "0");
    }
    time.textContent = `${minutes} : ${seconds}`;
  });
}
updateTime();

setInterval(updateTime, 1000);

const addDate = document.getElementById("date");
const currentTime = document.getElementById("current-time");
var currentDate = new Date();
var options = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
var timeOptions = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};
var formattedTime = currentDate.toLocaleTimeString("en-US", timeOptions);
var formattedDate = currentDate.toLocaleDateString("en-US", options);
currentTime.textContent = formattedTime;
var dateElement = document.createElement("h2");
dateElement.textContent = formattedDate;
addDate.appendChild(dateElement);

const startTaskBtn = document.getElementById("start-timer-btn");
startTaskBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set({ isRunning: !res.isRunning }, () => {
      startTaskBtn.textContent = !res.isRunning ? "Pause Timer" : "Start Timer";
    });
  });
});

const resetTaskBtn = document.getElementById("reset-timer-btn");
resetTaskBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => (startTaskBtn.textContent = "Start Timer")
  );
});

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

const themeToggle = document.getElementById("theme");
themeToggle.addEventListener("click", () => {
  chrome.storage.sync.get("theme", function (result) {
    var currentTheme = result.theme || "light";
    var newTheme = currentTheme === "light" ? "dark" : "light";

    chrome.storage.sync.set({ theme: newTheme });
    updateTheme(newTheme);
  });
});
function updateTheme(theme) {
  const svgElement = document.getElementById("theme-svg");
  const settings = document.getElementById("settings");
  const header = document.getElementById("header");
  const headerText = document.getElementById("header-text");
  const settingSvg = document.getElementById("settings-svg");

  svgElement.classList.toggle("light-theme", theme === "light");
  svgElement.classList.toggle("dark-theme", theme === "dark");
  themeToggle.classList.toggle("dark-img", theme === "dark");
  themeToggle.classList.toggle("settingImg", theme === "light");
  settings.classList.toggle("dark-img", theme === "dark");
  settings.classList.toggle("settingImg", theme === "light");
  addDate.style.color = theme === "dark" ? "#ffffff" : "#12494c";
  header.style.backgroundColor =
    theme === "dark" ? "rgb(108 108 108)" : "rgb(228 234 232)";

  settingSvg.style.fill = theme === "dark" ? "#ffffff" : "#156666";

  header.style.boxShadow =
    theme === "dark" ? "1px 1px 1px 0px #ffffff" : "1px 1px 12px 0px #0a3234";

  document.body.style.backgroundColor =
    theme === "dark" ? "rgb(0 0 0)" : "rgb(10 168 167 / 63%)";
  headerText.style.color = theme === "dark" ? "#fff" : "rgb(10 168 167)";
  startTaskBtn.style.color = theme === "dark" ? "#5e6060" : "rgb(10 168 167)";
  resetTaskBtn.style.color = theme === "dark" ? "#5e6060" : "rgb(10 168 167)";
  addTaskBtn.style.color = theme === "dark" ? "#5e6060" : "rgb(10 168 167)";
}

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({ tasks: tasks });
}
3;

function renderTask(taskNum) {
  const taskRow = document.createElement("div");
  taskRow.className = "task-row";
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskNum].text ? tasks[taskNum].text : "";
  text.className = tasks[taskNum].completed
    ? "task-input completed"
    : "task-input";

  text.addEventListener("input", function (event) {
    let inputValue = event.target.value;
    if (inputValue.length > 0) {
      inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      event.target.value = inputValue;
    }
  });
  text.addEventListener("change", () => {
    tasks[taskNum].text = text.value;
    tasks[taskNum].completed = tasks[taskNum].completed;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "x";
  deleteBtn.className = "task-delete";
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  const div = document.createElement("div");
  const completeBtn = document.createElement("img");
  div.className = "task-complete";
  completeBtn.src = "../tick.png";
  completeBtn.className = "done-image";
  div.addEventListener("click", () => {
    toggleTaskCompletion(taskNum);
  });
  div.appendChild(completeBtn);

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);
  taskRow.appendChild(div);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function toggleTaskCompletion(taskNum) {
  tasks[taskNum].text = tasks[taskNum].text;
  if (tasks[taskNum].text != "") {
    tasks[taskNum].completed = !tasks[taskNum].completed;
  }
  saveTasks();
  renderTasks();
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push({ text: "", completed: false });
  renderTask(taskNum);
  saveTasks();
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}
