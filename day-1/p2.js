const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function(line){
    input.push(parseInt(line));
    
    if(input.length === 200) {
        rl.close();
    }
})


rl.on('close', function() {
    const year = 2020;
    input.sort((a,b) => a - b);


    for (let i = 0; i < input.length - 3; i++) {
        let diff = year - input[i];
        
        let p1 = i + 1;
        let p2 = input.length - 1;
        
        while (p1 !== p2) {
            if (input[p1] + input[p2] > diff) {
                p2--;
            } else if (input[p1] + input[p2] < diff) {
                p1++
            } else {
                console.log(input[i] * input[p1] * input[p2]);
                return;
            }
        }
    }
});