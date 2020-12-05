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
            if (!fieldValue) {
                valid = false;
            } else {
                validate(field, fieldValue);
            }
            if (!valid) break;
        }
        if (valid) validPassports++;
    }

    return validPassports;
    
    function validate (field, value) {
        switch(field) {
            case 'byr':
                valid = validateBYR(value);
                break;
            case 'iyr':
                valid = validateIYR(value);
                break;
            case 'eyr':
                valid = validateEYR(value);
                break;
            case 'hgt':
                valid = validateHGT(value);
                break;
            case 'hcl':
                valid = validateHCL(value);
                break;
            case 'ecl':
                valid = validateECL(value);
                break;
            case 'pid':
                valid = validatePID(value);
                break;
            default:
                break;
        }
    }

    function validateBYR (value) {
        const range = [1920, 2002];

        if (!yearLength(value)) return false;
        return isWithinRange(value, range);
    }

    function validateIYR (value) {
        const range = [2010, 2020];

        if (!yearLength(value)) return false;
        return isWithinRange(value, range);
    }

    function validateEYR (value) {
        const range = [2020, 2030];

        if (!yearLength(value)) return false;
        return isWithinRange(value, range);
    }

    function validateHGT (value) {
        const ranges = {
            cm: [150, 193],
            in: [59, 76]
        }
        const regex = /^\d*cm|in$/;
        const measure = /cm|in/;

        return regex.test(value) ? isWithinRange(value, ranges[value.match(measure)[0]]) : false;
    }
    function validateHCL (value) {
        const regex = /^#[0-9a-f]{6}$/
        return regex.test(value.toLowerCase());
    }
    function validateECL (value) {
        const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
        return validColors.indexOf(value) > -1;
    }
    function validatePID (value) {
        const regex = /^\d{9}$/
        return regex.test(value)
    }

    function yearLength (value) {
        return value.length === 4;
    }

    function isWithinRange (value, range) {
        const [start, end] = [...range];
        return start <= parseInt(value) && parseInt(value) <= end;
    }
}
