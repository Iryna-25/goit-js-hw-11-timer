class CountdownTimer {
    #timerId = null;
  
    constructor({ selector, targetDate}) {
      this.selector = selector;
      this.targetDate = targetDate;
    }
  
    updateTimer(time) {
    const timer = document.querySelector(this.selector);
    const refs = {
        days: timer.querySelector('[data-value="days"]'),
        daysLabel: timer.querySelector('[data-value="days"] + .label'),
        hours: timer.querySelector('[data-value="hours"]'),
        hoursLabel: timer.querySelector('[data-value="hours"] + .label'),
        mins: timer.querySelector('[data-value="mins"]'),
        minsLabel: timer.querySelector('[data-value="mins"] + .label'),
        secs: timer.querySelector('[data-value="secs"]'),
        secsLabel: timer.querySelector('[data-value="secs"] + .label'),
      };
  
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((time % (1000 * 60)) / 1000);
  
      refs.days.textContent = String(days).padStart(2, "0");
      refs.daysLabel.textContent = days === 1 ? "Day" : "Days";
  
      refs.hours.textContent = String(hours).padStart(2, "0");
      refs.hoursLabel.textContent = hours === 1 ? "Hour" : "Hours";
  
      refs.mins.textContent = String(mins).padStart(2, "0");
      refs.minsLabel.textContent = mins === 1 ? "Minute" : "Minutes";
  
      refs.secs.textContent = String(secs).padStart(2, "0");
      refs.secsLabel.textContent = secs === 1 ? "Second" : "Seconds";
    }
  
    startTimer() {
      this.#timerId = setInterval(
        () => {
          const time = this.targetDate - Date.now();
  
          if (time < 0) return this.stopTimer(this.#timerId);
          return this.updateTimer(time);
        },
        1000,
        this
      );
    }
  
    stopTimer(id) {
      clearInterval(id);
    }
  }
  
  const today = new Date();

  const myTimers = [ {
      name: "Timerok",
      selector: "#timer-1",
      targetDate: new Date("Nov 1, 2021"),
    },];

  myTimers.forEach((timer) => {
    const myTimer = new CountdownTimer(timer);
    const startTimer = new Promise((resolve) => resolve(myTimer.startTimer()));
  });
  