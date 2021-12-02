const colors = require("colors/safe");
const printNumbers = require("./printNumbers");


try {
    const first = process.argv[2];
    const second = process.argv[3];
    
    if (!first || !second) {
        console.error(colors.red("Необходимо ввести 2 числа"));
        process.exit();
    } else if (isNaN(Number(first)) || isNaN(Number(second))) {
        //throw  new Error("Некоторые из вводимых параметров не являются числами");
        console.error(colors.red("Некоторые из вводимых параметров не являются числами"));
        process.exit();
    } else if (Number(first) % 1 !== 0 || Number(second) % 1 !== 0) {
        console.error(colors.red("Некоторые из вводимых параметров не являются натуральными числами"));
        process.exit();
    } else {
        printNumbers(first, second);
    }
} catch (err) {
    console.error(colors.red(err.message));
    process.exit(1);
}
