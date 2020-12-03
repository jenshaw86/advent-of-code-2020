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

const slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]];

rl.on('close', function() {
    let product = 1;
    slopes.forEach(slope => product *= treeCollisions(input, slope));
    console.log(product);
});

const treeCollisions = (input, slope) => {
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

    return treeCount;
}