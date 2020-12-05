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
    console.log(processPassports(passports));
});

const processPassports = passports => {
    let validPassports = 0;

    for (const passport in passports) {
        valid = true;
        for (const field of validFields) {
            const fieldValue = passports[passport][field]

            valid = !fieldValue ? false : validate(field, fieldValue)
            
            if (!valid) break;
        }
        if (valid) validPassports++;
    }

    return validPassports;
    
    function validate (field, value) {
        switch(field) {
            case 'byr':
                return validateBYR(value);
            case 'iyr':
                return validateIYR(value);
            case 'eyr':
                return validateEYR(value);
            case 'hgt':
                return validateHGT(value);
            case 'hcl':
                return validateHCL(value);
            case 'ecl':
                return validateECL(value);
            case 'pid':
                return validatePID(value);
            default:
                break;
        }
    }
}

const validateBYR = value => {
    const range = [1920, 2002];

    if (!yearLength(value)) return false;
    return isWithinRange(value, range);
}

const validateIYR = value => {
    const range = [2010, 2020];

    if (!yearLength(value)) return false;
    return isWithinRange(value, range);
}

const validateEYR = value => {
    const range = [2020, 2030];

    if (!yearLength(value)) return false;
    return isWithinRange(value, range);
}

const validateHGT = value => {
    const ranges = {
        cm: [150, 193],
        in: [59, 76]
    }
    const regex = /^\d*cm|in$/;
    const measure = /cm|in/;

    return regex.test(value) ? isWithinRange(value, ranges[value.match(measure)[0]]) : false;
}

const validateHCL = value => {
    const regex = /^#[0-9a-f]{6}$/
    return regex.test(value.toLowerCase());
}

const validateECL = value => {
    const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    return validColors.indexOf(value) > -1;
}

const validatePID = value => {
    const regex = /^\d{9}$/
    return regex.test(value)
}

const yearLength = value => {
    return value.length === 4;
}

const isWithinRange = (value, range) => {
    const [start, end] = [...range];
    return start <= parseInt(value) && parseInt(value) <= end;
}