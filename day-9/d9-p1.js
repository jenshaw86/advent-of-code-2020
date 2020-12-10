const readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const xmasData = [];
const inputLength = 1000;

rl.on('line', function(line) {
    xmasData.push(parseInt(line));
    if (xmasData.length === inputLength) rl.close();
})

const preambleLength = 25;

rl.on('close', function() {
    console.log(findWeakness(xmasData));
});

const findWeakness = data => {
    let next, preamble;

    // while iterating through data, check if next value after 5 number-subsection is a valid sum
    for (let i = 0; i < data.length - preambleLength; i++) {
        preamble = data.slice(i, i + preambleLength).sort((a,b) => a - b);
        
        let j = 0;
        let k = preamble.length - 1;

        nextIsValid = false;
        next = data[i + preambleLength];
        while (j !== k) {
            if (preamble[j] + preamble[k] < next) {
                j++;
            } else if (preamble[j] + preamble[k] > next) {
                k--;
            } else {
                nextIsValid = true;
                break;
            }
        }       
        
        if (!nextIsValid) return next;
    }
}