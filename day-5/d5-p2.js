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
        // get row
        const row = getRow(boardingPass);
        const col = getCol(boardingPass);
        const id = calcSeatId(row,col);
        
        delete seats[id];
    });
    
    for (let seat in seats) {
        seat = parseInt(seat);
        if (!seats[`${seat + 1}`] && !seats[seat - 1]) {
            return seat
        };
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

const getRow = boardingPass => {
    let mid;
    let p1 = 0;
    let p2 = rows;
    for (let i = 0; i < 7; i++) {
        switch (boardingPass[i]) {
            case "F":
                mid = Math.floor((p1 + p2) / 2);
                p2 = mid;
                break;
            case "B":
                mid = Math.ceil((p1 + p2) / 2);
                p1 = mid;
                break;
        }
    }
    return mid;
}
const getCol = boardingPass => {
    let mid;
    let p1 = 0;
    let p2 = cols;
    for (let i = 7; i < boardingPass.length; i++) {
        switch (boardingPass[i]) {
            case "L":
                mid = Math.floor((p1 + p2) / 2);
                p2 = mid;
                break;
            case "R":
                mid = Math.ceil((p1 + p2) / 2);
                p1 = mid;
                break;
        }
    }
    return mid;
}