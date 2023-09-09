// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

var fs = require('fs');


function ReadFromFile(filePath) {
    var fileData = fs.readFile(filePath, {encoding: 'utf-8'}, function (err,data) {
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
        }
    });
    var sum = 0;
    for (let index = 0; index < 1000000000000000; index++) {
        sum = sum + index;
    }
    console.log("sum", sum);
}

ReadFromFile("./1-counter.js");