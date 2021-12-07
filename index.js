const colors = require("colors/safe");
const moment = require("moment");
const fs = require("fs");
const EventEmitter = require("events");


if (/\d{2}-\d{2}-\d{2}-\d{4}/.test(process.argv[2]) &&
    /\d{2}-\d{2}-\d{2}-\d{4}/.test(process.argv[3])) {
    let [hour1, day1, month1, year1] = process.argv[2].split("-");
    let [hour2, day2, month2, year2] = process.argv[3].split("-");

    const datePrevious = moment(`${year1}-${month1}-${day1} ${hour1}`);
    const dateNext = moment(`${year2}-${month2}-${day2} ${hour2}`);

    if (!moment(datePrevious).isValid() || !moment(dateNext).isValid()) {
        console.error(colors.red('Invalid Date'));
        return;
    }

    let difference = dateNext.diff(datePrevious) / 1000;

    class MyEmitter extends EventEmitter {

    }

    const myEmitter = new MyEmitter();


    const interval = () => {
        const inter = setInterval(() => {
            let seconds = Math.floor(difference % 60);
            let minutes = Math.floor((difference / 60) % 60);
            let hours = Math.floor((difference / (60 * 60)) % 24);
            let days = Math.floor(difference / (60 * 60 * 24) % 30);
            let months = Math.floor(difference / (60 * 60 * 24 * 30) % 12);
            let years = Math.floor(difference / (60 * 60 * 24 * 30 * 12));

            if (difference > 0) {
                const message = `Осталось: ${(years) ? years.toString() + "лет" : ""} ${(months) ? months.toString() + "месяцев" : ""}
             ${(days) ? days.toString() + "дней" : ""} ${hours} часов  ${minutes} минут  ${seconds} секунд`;
                console.log(message);
                dateNext.subtract(1, "seconds");
                myEmitter.emit('log', message, moment({}));
                difference--;
            } else {
                clearInterval(inter);
                myEmitter.emit('end', finish);
            }
        }, 1000);
    }
    const finish = () => {
        myEmitter.removeListener('start', interval);
        myEmitter.emit('log', "Таймер остановлен", moment({}));
        console.log(`Завершение работы таймера`);
    }
    const writeLogs = (text, date) => {
        fs.appendFile(`${__dirname}/log.txt`, `${text}: \n  ${date}\n`, "utf-8", (err) => {
            if (err) {
                myEmitter.emit('log', err.message, moment({}));
                throw err;
            }
        });
    }

    myEmitter.on("start", interval);
    myEmitter.on("end", finish);
    myEmitter.on("log", writeLogs);
    myEmitter.on('error', function (error) {
        console.log(colors.red("Error: " + error.message));
        myEmitter.emit('log', error.message, moment({}));
    });

    const timer = async () => {
        await myEmitter.emit('start');

    }
    timer(difference).catch((err) => {
        if (err) {
            myEmitter.emit("error", console.log);
        }
    });


} else {
    console.error(colors.red("Incorrect input format"));
}




