const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputLength = 594;
let lineNumber = 1;
const rules = {};
const bag = "shiny gold";

rl.on('line', function(line){
    const regex = /bags|bag/g;
    const matcher = /(\d+) (\w*\s\w*)/;

    let [container, types] = line.slice(0, -1).replace(regex,'').split("  contain");

    types.split(",").forEach(type => {
            const match = matcher.exec(type);
            if (match) {
                const [num, color] = [match[1], match[2]];
                
                if (!rules[container]) rules[container] = {};    
                if (!rules[container][color]) rules[container][color] = parseInt(num);
            }
    })

    if(lineNumber === inputLength) {
        rl.close();
    }

    lineNumber++;
})


rl.on('close', function() {
    console.log(getInnerBagCount(bag));
});

const getInnerBagCount = bag => {
    let count = 0;

    for (const item in rules[bag]) {
        count += rules[bag][item] + (getInnerBagCount(item) * rules[bag][item]);
    }

    return count;
}
