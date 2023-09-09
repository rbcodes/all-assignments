// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

var fs = require('fs');


function readWriteFromFile(path) {
    fs.readFile(path,{encoding: 'utf-8'}, function (err, data) {
        if(err){
            console.log("Error Reading File!", err);
        }
        else{
            console.log("data Read", data);
            data = data.replace(/\s+/g, ' ').trim();
            fs.writeFile(path, data, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        }
    });
}

readWriteFromFile("./read_write_file.txt");