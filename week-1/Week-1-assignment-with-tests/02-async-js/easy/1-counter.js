// ## Create a counter in JavaScript

// We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
// It should go up as time goes by in intervals of 1 second


function stopWatch() {
    var day = 0;
    var hours = 0;
    var mins = 0;
    var secs = 0;

    setInterval(() => {
        console.clear();
        console.log(new Date(secs * 1000).toISOString().slice(11, 19));
        secs += 1;
    }, 1000);
   
}

stopWatch();
