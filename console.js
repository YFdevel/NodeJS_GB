// 1 на исполнение (poll), 1
console.log('Record 1');
setTimeout(() => {
    // 1 в очереди таймеров, 4
    console.log('Record 2');
    Promise.resolve()
        .then(() => {
            setTimeout(() => {
                //  2 в очереди таймеров, 1 в очереди микрозадач, 5
                console.log('Record 3');
                Promise.resolve()
                    .then(() => {
                        // 3 в очереди таймеров, 2 в очереди микрозадач, 6
                        console.log('Record 4');
                    });
            });
        });
});
// 2 на исполнение (poll), 2
console.log('Record 5');
Promise.resolve()
    .then(() => Promise.resolve()
        // 1 в очереди микрозадач, 3
        .then(() => console.log('Record 6')));

// порядок выполнения: Record 1, Record 5, Record 6, Record 2, Record 3, Record 4
// poll->promises->timers->timers(promises)