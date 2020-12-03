const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function(line){
    input.push(line);

    if(input.length === 323) {
        rl.close();
    }
})

const slope = [3,1];

rl.on('close', function() {
    treeCollisions(input);
});

const treeCollisions = input => {
    let treeCount = 0;
    const [r,d] = [...slope];
    let j = r; 

    for (let i = d; i < input.length; i += d) {
        j = j >= input[i].length ? j % input[i].length : j;

        if (input[i][j] === "#") {
            treeCount++;
        }

        j += r;
    }

    console.log(treeCount);
}