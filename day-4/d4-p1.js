const inputLength = 1068;
let inputLine = 1;
const validFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let passports = {};
let idx = 1;
passports[idx] = {};

const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function(line){
    if (!line) {
        idx++;
        passports[idx] = {};
    } else {
        line.split(' ').forEach(field => {
            const [key, prop] = field.split(':');
            passports[idx][key] = prop;
        });
    }

    if(inputLine === inputLength) {
        rl.close();
    }

    inputLine++;
})


rl.on('close', function() {
    processPassports(passports);
});

const processPassports = passports => {
    let validPassports = 0;

    for (const passport in passports) {
        error = false;
        for (const field of validFields) {
            if (!passports[passport][field]) {
                error = true;
                break;
            }
        }
        if (!error) validPassports++;
    }

    console.log(validPassports);
}