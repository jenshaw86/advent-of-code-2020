const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputLength = 2233;
let lineNumber = 1;
let group = 1;
const list = {};
list[group] = {answers: {}, passengerCount: 0};

rl.on('line', function(line){
    // track number of people in the group
    // track which keys were answered 'yes' and how many times
    // if a key has a value equal to number in the group, add to count
    
    if (line) {
        list[group].passengerCount++;
        for (let i = 0; i < line.length; i++) {
            if (!list[group].answers[line[i]]) {
                list[group].answers[line[i]] = 1;
            } else {
                list[group].answers[line[i]]++;
            }    
        }
    } else {   
        group++;
        list[group] = {answers: {}, passengerCount: 0};
    }

    if(lineNumber === inputLength) {
        rl.close();
    }

    lineNumber++;
})


rl.on('close', function() {
    let count = 0; 

    for(const group in list) {
        for(const answer in list[group].answers) {
            if (list[group].answers[answer] === list[group].passengerCount) {
                count++;
            }
        }
    }
    console.log(count);
});
