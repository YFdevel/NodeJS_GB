const fs = require("fs");
const readline = require('readline');

const ACCESS_LOG = `${__dirname}/access2.log`;
const WRITE_LOG_89 = "89.123.1.41_requests.log";
const WRITE_LOG_34 = "34.48.240.111_requests.log";

const reg89 = /^89\.123\.1\.41/;
const reg34 = /^34\.48\.240\.111/;


const readFile = readline.createInterface({
    input: fs.createReadStream(ACCESS_LOG, "utf-8"),
    output: process.stdout,
    terminal: false
});

const writeStream34 = fs.createWriteStream(WRITE_LOG_34, {
    encoding: "utf-8",
    flag: "a"
});
const writeStream89 = fs.createWriteStream(WRITE_LOG_89, {
    encoding: "utf-8",
    flag: "a"
});

readFile.on('line', (line) => {
    if (reg34.test(line)) {
        writeStream34.write(line + "\n");
    } else if (reg89.test(line)) {
        writeStream89.write(line + "\n");
    }
}).on('close', () => {
    console.log('Обработка данных успешно завершена');
})
