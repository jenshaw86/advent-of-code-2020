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
    let hash = {};

    input.forEach(num => {
        hash[num] = 1;
    });

    for(const num in hash) {
        const diff = year - parseInt(num);
        if (hash[diff]) {
            console.log(diff * parseInt(num));
            delete hash[diff];
            delete hash[num];
        }
    }
});