class CountdownTimer {
    constructor ({selector, targetDate}) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.init();

        this.days = document.querySelector('[data-value="days"]');
        this.hours = document.querySelector('[data-value="hours"]');
        this.mins = document.querySelector('[data-value="mins"]');
        this.secs = document.querySelector('[data-value="secs"]');
    }

init() {
    setInterval (() => {
    const currentTime = Date.now();
    const time = this.targetDate - currentTime;
    this.changeTimer(this.getTimeComponents(time));
    }, 1000);
}

pad(value) {
    return String(value).padStart(2,"0");
}

getTimeComponents(time) {
    /*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
return {days, hours, mins, secs};
}

changeTimer ({days, hours, mins, secs}) {
    this.days.textContent = `${days}`;
    this.hours.textContent = `${hours}`;
    this.mins.textContent = `${mins}`;
    this.secs.textContent = `${secs}`;
}
}

const Countdown = new CountdownTimer({
selector: '#timer-1',
targetDate: new Date('Jul 17, 2019'),
});

