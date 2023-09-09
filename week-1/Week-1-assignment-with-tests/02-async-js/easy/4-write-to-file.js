// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

function writeToFile(path) {
    fs.writeFile(path, "Hey there!", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}

writeToFile("./read_write_file.txt")
