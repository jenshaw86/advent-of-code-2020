const readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputLength = 965;
const rows = 127;
const cols = 7;
const input = [];

rl.on('line', function(line){
    input.push(line);

    if(input.length === inputLength) {
        rl.close();
    }
})


rl.on('close', function() {
    console.log(findMySeat(input));
});

const findMySeat = input => {
    const seats = createSeats();

    input.forEach( boardingPass => {
        const rowCode = boardingPass.slice(0, 7);
        const colCode = boardingPass.slice(7);
    
        const row = getPosition(rows, rowCode);
        const col = getPosition(cols, colCode);
        
        const id = calcSeatId(row,col);
        delete seats[id];
    });
    
    for (let seat in seats) {
        seat = parseInt(seat);
        if (!seats[`${seat + 1}`] && !seats[seat - 1]) return seat
    }
}

const createSeats = () => {
    const map = {};
    for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
            let seatId = calcSeatId(r,c);
            map[seatId] = 1;
        }
    }
    return map;
}

const calcSeatId = (row, col) => row * 8 + col;

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