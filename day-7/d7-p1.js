const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputLength = 594;
let lineNumber = 1;
const rules = {};
const target = "shiny gold";

rl.on('line', function(line){
    const regex = /bags|bag/g;
    const matcher = /(\d+) (\w*\s\w*)/;

    let [container, types] = line.slice(0, -1).replace(regex,'').split("  contain");

    types.split(",").forEach(type => {
            const match = matcher.exec(type);
            if (match) {
                const [num, color] = [match[1], match[2]];
                
                if (!rules[color]) rules[color] = {};    
                if (!rules[color][container]) rules[color][container] = num;
            }
    })

    if(lineNumber === inputLength) {
        rl.close();
    }

    lineNumber++;
})


rl.on('close', function() {
    console.log(findContainers(target));
});

const findContainers = (target, memo) => {
    let count = 0;
    memo = memo || {};

    for (const container in rules[target]) {
        if (!memo[container]) {
            memo[container] = 1;
            count++;

            if (rules[container]) {
                count += findContainers(container, memo);
            }
        };

    }

    return count;
}
