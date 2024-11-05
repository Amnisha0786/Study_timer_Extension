const timeOption = document.getElementById("time-option");
const timerBadge = document.getElementById("timer-badge");
timeOption.addEventListener("change", (event) => {
  const val = event.target.value;
  if (val < 1 || val > 60) {
    timeOption.value = 25;
  }
});

timerBadge.addEventListener("change", (event) => {
  const checked = event.target.checked;
  timerBadge.checked = checked;
});

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  saveBtn.textContent = "Saving..";
  setTimeout(() => {
    saveBtn.textContent = "Save Options";
  }, 700);

  chrome.storage.local.set({
    timer: 0,
    timeOption: timeOption.value,
    isRunning: false,
    timerBadge: timerBadge.checked,
  });
});

chrome.storage.local.get(["timeOption", "timerBadge"], (res) => {
  timeOption.value = res.timeOption || 25;
  timerBadge.checked = res.timerBadge || false;
});
