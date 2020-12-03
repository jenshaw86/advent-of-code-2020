const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function(line){
    let [policy, password] = line.split(": ");
    let [count, char] = policy.split(" ");
    let [p1, p2] = count.split("-");
    input.push({
        password: password,
        char: char,
        p1: parseInt(p1),
        p2: parseInt(p2)
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

        // check if chars at p1 and p2 indices of password match
        if (item.password[item.p1 - 1] === item.char) matchingChars++;
        if (item.password[item.p2 - 1] === item.char) matchingChars++;
        
        // if matchingChars eq 0 or 2, password is invalid
        // if matchingChars eq 1, password is valid
        
        // if count of matching chars is exactly 1, password is valid, incremement validCount
        if (matchingChars === 1) validCount++
    }
    
    console.log(validCount);
}