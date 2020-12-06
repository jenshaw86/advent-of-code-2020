const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputLength = 965;
const input = [];

rl.on('line', function(line){
    input.push(line);

    if(input.length === inputLength) {
        rl.close();
    }
})


rl.on('close', function() {
    console.log(highestSeatId(input));
});

const rows = 127;
const cols = 7;

const highestSeatId = input => {
    let max = 0;
    
    input.forEach( boardingPass => {
        const rowCode = boardingPass.slice(0, 7);
        const colCode = boardingPass.slice(7);

        const row = getPosition(rows, rowCode);
        const col = getPosition(cols, colCode);

        const seatId = row * 8 + col;
        max = seatId > max ? seatId : max;
    });
    
    return max;
}

const getPosition = (num, code) => {
    let mid = 0;
    let p1 = 0;
    let p2 = num;
    for (let i = 0; i < code.length; i++) {
        switch (code[i]) {
            case "F":
            case "L":
                mid = Math.floor((p1 + p2) / 2);
                p2 = mid;
                break;
            case "B":
            case "R":
                mid = Math.ceil((p1 + p2) / 2);
                p1 = mid;
                break;
            default:
                break;
        }
    }
    return mid;
} 