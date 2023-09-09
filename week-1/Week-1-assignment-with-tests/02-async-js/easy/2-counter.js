// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.


function stopWatch() {
    var secs = 0; 
    function reuccuringTimeout() {
        setTimeout(() => {
            console.clear();
            console.log(new Date(secs * 1000).toISOString().slice(11, 19));
            secs += 1;
            reuccuringTimeout();
        }, 1000);
    }
    reuccuringTimeout();
}

stopWatch();




























































