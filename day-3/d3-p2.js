const inputLength = 323;
const slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]];
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
    console.log(collisionProduct(slopes));
});

const collisionProduct = slopes => slopes.reduce((a,c) => a * treeCollisions(input, c), 1);

const treeCollisions = (input, slope) => {
    const [r,d] = [...slope];
    let treeCount = 0;
    let j = r; 

    for (let i = d; i < input.length; i += d) {
        j = j >= input[i].length ? j % input[i].length : j;

        if (input[i][j] === "#") treeCount++;

        j += r;
    }

    return treeCount;
}