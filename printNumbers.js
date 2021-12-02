const colors = require("colors/safe");
const isSimpleNumber = require("./isSimpleNumber");


// функция для отображения простых чисел
const printNumbers = (min, max) => {

    // переменная для подсчета количества простых чисел
    let countOfNumbers = 0;
    // внутренний счетчик на 3 шага (зеленый, желтый, красный)
    let counter = 0;

    // проверка на правильность порядка ввода min и max чисел диапазона
    if (min > max) {
        let tmp = min;
        min = max;
        max = tmp;
    }

    // вывод в консоль простых чисел
    for (let i = min; i <= max; i++) {
        if (isSimpleNumber((i))) {
            counter++;
            countOfNumbers++;
            switch (counter) {
                case 1:
                    console.log(colors.green(i));
                    break;
                case 2:
                    console.log(colors.yellow(i));
                    break;
                case 3:
                    console.log(colors.red(i));
                    counter = 0;
                    break;
            }
        }
    }
    if (countOfNumbers === 0) {
        console.log(colors.red("В указанном диапазоне нет простых чисел"))
    }

}
module.exports=printNumbers;
