import { Minesweeper } from './minesweeper';
import { Cell, CellsMatrix } from '../cell/cell';
import { BoardPosition } from '../board/board-position';
import { DimensionOfMinesweeper } from './dimension-of-minesweeper';
import { Utilities } from '../utilities';

describe('Minesweeper', () => {
    it('should create by correct dimensions', () => {
        const minesweeper = new Minesweeper({ rows: 8, columns: 8, countMines: 10 });
        expect(minesweeper).toBeTruthy();
    });

    it('should create call "Utilities.generateMatrixWithNewsCells" and "createMines"', () => {
        spyOn(Utilities, 'generateMatrixWithNewsCells');
        spyOn(Minesweeper.prototype, 'createMines');

        const expected: DimensionOfMinesweeper = {
            rows: 2,
            columns: 2,
            countMines: 4
        };
        const gameFake = new Minesweeper(expected);

        expect(Utilities.generateMatrixWithNewsCells).toHaveBeenCalledWith(expected);
        expect(Minesweeper.prototype.createMines).toHaveBeenCalledWith(expected.countMines);
    });

    it('should "Minesweeper.newBeginersGame" return a new correct game', () => {
        const expected = new Minesweeper({ rows: 8, columns: 8, countMines: 10 });
        const actual = Minesweeper.newBeginersGame();

        expect(actual.getMatrix().length).toEqual(expected.getMatrix().length);
        expect(actual.getMatrix().pop().length).toEqual(expected.getMatrix().pop().length);
    });

    it('should "getMatr ix" return correct value', () => {
        const cellFill: Cell = {
            beaten: false,
            isMine: true,
            probability: 0
        };

        const gameFake = new Minesweeper({ rows: 2, columns: 2, countMines: 4 });
        const expected: CellsMatrix = new Array(2).fill(new Array(2).fill(cellFill));
        const actual = gameFake.getMatrix();

        expect(actual).toEqual(expected);
    });

    it('should "constructor" call createMines with the parameters correct', () => {
        spyOn(Minesweeper.prototype, 'createMines');
        const game = new Minesweeper({ rows: 8, columns: 8, countMines: 12 });

        expect(Minesweeper.prototype.createMines).toHaveBeenCalledWith(12);
    });

    it('should createMines call 8 times "generateNewMine"', () => {
        spyOn(Minesweeper.prototype, 'generateNewMine');

        Minesweeper.prototype.createMines.call(Minesweeper.prototype, 8);

        expect(Minesweeper.prototype.generateNewMine).toHaveBeenCalledTimes(8);
    });

    it('should "generateNewMine" call "getFirstPositionWithoutMine" and set "isMine" to true in position returned', () => {
        const gameFake = new Minesweeper({ rows: 9, columns: 9, countMines: 3 });
        spyOn(gameFake, 'getFirstPositionWithoutMine').and.returnValue({ row: 1, column: 2 });

        gameFake.generateNewMine();

        expect(gameFake.getFirstPositionWithoutMine).toHaveBeenCalled();
        expect(gameFake.getMatrix()[1][2].isMine).toBeTruthy();
    });

    it('should "getFirstPositionWithoutMine" return { row: 0, column: 1 }', () => {
        const gameFake = new Minesweeper({ rows: 2, columns: 2, countMines: 0 });
        gameFake.getMatrix()[0][0].isMine = true;
        gameFake.getMatrix()[1][0].isMine = true;
        gameFake.getMatrix()[1][1].isMine = true;
        gameFake.getMatrix()[0][1].isMine = false;

        const expected: BoardPosition = { row: 0, column: 1 };
        const actual = gameFake.getFirstPositionWithoutMine();

        expect(actual).toEqual(expected);
    });
});
