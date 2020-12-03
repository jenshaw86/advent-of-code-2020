const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function(line){
    let [policy, password] = line.split(": ");
    let [count, char] = policy.split(" ");
    let [min, max] = count.split("-");
    input.push({
        password: password,
        char: char,
        min: parseInt(min),
        max: parseInt(max)
    })

    if(input.length === 1000) {
        rl.close();
    }
})

rl.on('close', function() {
    validPasswords(input);
});

const validPasswords = input => {
    // track number of valid passwords
    let validCount = 0;
    // for each password in the input hash
    for (const item of input) {
        // track number of matching characters
        let matchingChars = 0;
        // assume password is valid until proven not
        let isValid = true;
        // iterate through each char of password
        for (let i = 0; i < item.password.length; i++) {
            // if char matches policy char
            if (item.password[i] === item.char) {
                // increment matching char count
                matchingChars++;
                // check if count of matching chars is above max, password is invalid
                if (matchingChars > item.max) isValid = false;
            }
        }
        // if count of matching chars is below min, password is invalid
        if (matchingChars < item.min) isValid = false;
        // if password is valid, add to count of valid passwords
        if (isValid) validCount++;
    }
    
    console.log(validCount);
}