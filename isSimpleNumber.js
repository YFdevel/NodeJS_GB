// функция для проверки, является ли число простым
const isSimpleNumber = (num) => {
    let flag = true;
    if (num < 2) {
        flag = false;
    } else {
        for (let i = 2; i < num; i++) {
            if (num % i === 0) {
                flag = false;
                break;
            }
        }
    }
    return flag;
}
module.exports=isSimpleNumber;