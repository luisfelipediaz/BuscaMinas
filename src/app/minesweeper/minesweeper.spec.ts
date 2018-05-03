import { Minesweeper } from './minesweeper';

describe('Minesweeper', () => {
    let minesweeper: Minesweeper;

    beforeEach(() => {
        minesweeper = new Minesweeper(8, 8, 10);
    });

    it('should create by correct dimensions', () => {
        expect(minesweeper).toBeTruthy();
    });

    it('should "Minesweeper.newBeginersGame" return a new correct game', () => {
        const expected = new Minesweeper(8, 8, 10);
        const actual = Minesweeper.newBeginersGame();
        expect(actual).toEqual(expected);
    });

    it('should "getMatrix" return correct value', () => {
        const expected = new Array(8).fill(new Array(8));
        const actual = minesweeper.getMatrix();

        expect(actual).toEqual(expected);
    });

    it('should "constructor" call createMines with the parameters correct', () => {
        spyOn(Minesweeper.prototype, 'createMines');
        const game = new Minesweeper(8, 8, 12);

        expect(Minesweeper.prototype.createMines).toHaveBeenCalledWith(12);
    });

    it('should createMines call 8 times "createMine"');
});
