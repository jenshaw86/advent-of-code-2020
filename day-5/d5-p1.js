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
    highestSeatId(input);
});

const highestSeatId = input => {
    let max = 0;
    
    input.forEach( boardingPass => {
        // get row
        let row = getRow(boardingPass);
        let col = getCol(boardingPass);
        let seatId = row * 8 + col;
        max = seatId > max ? seatId : max;
    });
    
    console.log(max);
}

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