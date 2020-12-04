const inputLength = 323;
const slope = [3,1];
let input = [];

const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function(line){
    input.push(line);

    if(input.length === inputLength) {
        rl.close();
    }
})


rl.on('close', function() {
    treeCollisions(input);
});

const treeCollisions = input => {
    const [r,d] = [...slope];
    let treeCount = 0;
    let j = r; 

    for (let i = d; i < input.length; i += d) {
        j = j >= input[i].length ? j % input[i].length : j;

        if (input[i][j] === "#") treeCount++;

        j += r;
    }

    console.log(treeCount);
}