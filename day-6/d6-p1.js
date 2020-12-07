const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputLength = 15;
let lineNumber = 1;
let group = 1;
const list = {};
list[group] = {};
let count = 0;

rl.on('line', function(line){
    if (line) {
        for (let i = 0; i < line.length; i++) {
            if (!list[group][line[i]]) {
                list[group][line[i]] = true;
                count++;
            }
        }
    } else {   
        group++;
        list[group] = {};
    }

    if(lineNumber === inputLength) {
        rl.close();
    }

    lineNumber++;
})


rl.on('close', function() {
    console.log(count);
});
