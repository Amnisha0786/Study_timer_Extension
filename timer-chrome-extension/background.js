chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ timer: 0, timeOption:25, isRunning: false });
});

chrome.alarms.create("studyTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "studyTimer") {
    chrome.storage.local.get(
      ["timer", "isRunning", "timeOption", "timerBadge"],
      (res) => {
        if (res.isRunning) {
          let timer = res.timer + 1;
          let isRunning = true;
          const timerOptions = res.timeOption || 1;
          if (res.timerBadge === true) {
            const minutes = `${
              timerOptions - Math.ceil(res.timer / 60)
            }`.padStart(2, "0");
            let seconds = "00";
            if (res.timer % 60 != 0) {
              seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
            }
            chrome.action.setBadgeText({
              text: `${minutes}:${seconds}`,
            });
          } else {
            chrome.action.setBadgeText({ text: "" });
          }

          if (timer === 60 * res.timeOption) {
            this.registration.showNotification("Study Timer", {
              body: `${res.timeOption} minutes has passed!`,
              icon: "icon.png",
            });
            timer = 0;
            isRunning = false;
          }
          chrome.storage.local.set({
            timer,
            isRunning,
          });
        }
      }
    );
  }
});

chrome.storage.local.get(["timer", "isRunning", "timeOption"]),
  (res) => {
    chrome.storage.local.set({
      timer: "timer" in res ? res.timer : 0,
      timeOption: "timeOption" in res ? res.timeOption : 25,
      isRunning: "isRunning" in res ? res.isRunning : false,
    });
  };
