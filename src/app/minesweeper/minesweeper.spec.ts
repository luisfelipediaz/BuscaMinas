import { Minesweeper, Cell, generateMatrixWithNewsCells } from './minesweeper';

describe('GenerateMatrixWithNewsCells', () => {
    it('should "generateMatrixWithNewsCells" return a new matrix expected', () => {
        const cell: Cell = {
            isMine: false,
            beaten: false,
            probability: 0
        };
        const expected = new Array(10).fill(new Array(9).fill(cell));
        const actual = generateMatrixWithNewsCells({ rows: 10, columns: 9 });

        expect(actual).toEqual(expected);
    });
});

describe('Minesweeper', () => {
    it('should create by correct dimensions', () => {
        const minesweeper = new Minesweeper(8, 8, 10);
        expect(minesweeper).toBeTruthy();
    });

    it('should "Minesweeper.newBeginersGame" return a new correct game', () => {
        const expected = new Minesweeper(8, 8, 10);
        const actual = Minesweeper.newBeginersGame();
        expect(actual).toEqual(expected);
    });

    it('should "getMatrix" return correct value', () => {
        const gameFake = { matrix: generateMatrixWithNewsCells({ rows: 8, columns: 8 }) };
        const expected = generateMatrixWithNewsCells({ rows: 8, columns: 8 });
        const actual = Minesweeper.prototype.getMatrix.call(gameFake);

        expect(actual).toEqual(expected);
    });

    it('should "constructor" call createMines with the parameters correct', () => {
        spyOn(Minesweeper.prototype, 'createMines');
        const game = new Minesweeper(8, 8, 12);

        expect(Minesweeper.prototype.createMines).toHaveBeenCalledWith(12);
    });

    it('should createMines call 8 times "generateNewMine"', () => {
        spyOn(Minesweeper.prototype, 'generateNewMine');

        Minesweeper.prototype.createMines.call(Minesweeper.prototype, 8);

        expect(Minesweeper.prototype.generateNewMine).toHaveBeenCalledTimes(8);
    });

    it('should "generateNewMine" create two random and in this position generate new mine', () => {
        const gameFake = {
            matrix: generateMatrixWithNewsCells({ rows: 8, columns: 9 }),
            dimensions: { rows: 8, columns: 9 }
        };
        const expectedCell: Cell = {
            beaten: false,
            isMine: true,
            probability: 0
        };
        spyOn(Math, 'random').and.returnValue(0.5);
        spyOn(Math, 'floor').and.returnValue(4);

        Minesweeper.prototype.generateNewMine.call(gameFake);

        expect(Math.random).toHaveBeenCalledTimes(2);
        expect(Math.floor).toHaveBeenCalledTimes(2);
        expect(gameFake.matrix[4][4]).toEqual(expectedCell);
    });

    fit('should "generateNewMine" if selected cell its mine, retry until find cell to not a mine', () => {
        debugger;
        let countEntry = 0;
        const gameFake = {
            matrix: generateMatrixWithNewsCells({ rows: 8, columns: 9 }),
            dimensions: { rows: 8, columns: 9 }
        };
        gameFake.matrix[4][4].isMine = true;

        const expectedCell: Cell = {
            beaten: false,
            isMine: true,
            probability: 0
        };

        spyOn(Math, 'random').and.returnValue(0.5);
        spyOn(Math, 'floor').and.callFake(() => { if (countEntry < 2) { countEntry++; return 4; } return 3; });

        Minesweeper.prototype.generateNewMine.call(gameFake);
        expect(Math.random).toHaveBeenCalledTimes(4);
        expect(Math.floor).toHaveBeenCalledTimes(4);
        expect(gameFake.matrix[3][3]).toEqual(expectedCell);
    });
});
