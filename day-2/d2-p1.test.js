const aoc = require('./d2-p1');

describe('validPassword', () => {
    it('returns number of valid passwords', () => {
        let arr = ['1-7 q: qqqqxvqrkbqqztlqlzq',
        '1-3 q: cqbm',
        '15-16 h: hhhhhhhhhhhhhhbsh',
        '4-16 x: xvbxswpnvxtnfjrxxx',
        '6-7 v: kbbvnswp',
        '17-18 h: hhhvhhhhhhhhhhhhhh',
        '1-7 w: twftdrb',
        '4-5 t: wcjtfpt',
        '3-9 f: mbfvfptbfq',
        '3-10 x: xfxxxxxxxv']
        let input = {};
        arr.forEach(line => {
            let [policy, password] = line.split(": ");
            let [count, char] = policy.split(" ");
            let [min, max] = count.split("-");
            input[password] = {
                char: char,
                min: parseInt(min),
                max: parseInt(max)
            }
        });
        expect(aoc.validPassword(input)).toBe(7);
    })
});
