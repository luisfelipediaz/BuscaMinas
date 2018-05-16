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
        spyOn(Minesweeper.prototype, 'generateMines');

        const expected: DimensionOfMinesweeper = {
            rows: 2,
            columns: 2,
            countMines: 4
        };
        const gameFake = new Minesweeper(expected);

        expect(Utilities.generateMatrixWithNewsCells).toHaveBeenCalledWith(expected);
        expect(Minesweeper.prototype.generateMines).toHaveBeenCalledWith(expected.countMines);
    });

    it('should "Minesweeper.newBeginersGame" return a new correct game', () => {
        const expected = new Minesweeper({ rows: 8, columns: 8, countMines: 10 });
        const actual = Minesweeper.newBeginersGame();

        expect(actual.getMatrix().length).toEqual(expected.getMatrix().length);
        expect(actual.getMatrix().pop().length).toEqual(expected.getMatrix().pop().length);
    });

    it('should "getMatrix" return correct value', () => {
        const cellFill: Cell = {
            beaten: false,
            isMine: false,
            discovered: false,
            probability: 0
        };

        const gameFake = new Minesweeper({ rows: 2, columns: 2, countMines: 0 });
        const expected: CellsMatrix = new Array(2).fill(new Array(2).fill(cellFill));
        const actual = gameFake.getMatrix();

        expect(actual).toEqual(expected);
    });

    it('should "constructor" call "generateMines" with the parameters correct', () => {
        spyOn(Minesweeper.prototype, 'generateMines');
        const game = new Minesweeper({ rows: 8, columns: 8, countMines: 12 });

        expect(Minesweeper.prototype.generateMines).toHaveBeenCalledWith(12);
    });

    it('should createMines call 8 times "generateNewMine"', () => {
        spyOn(Minesweeper.prototype, 'generateNewMine');

        Minesweeper.prototype.generateMines.call(Minesweeper.prototype, 8);

        expect(Minesweeper.prototype.generateNewMine).toHaveBeenCalledTimes(8);
    });

    // tslint:disable-next-line:max-line-length
    it('should "generateNewMine" call "getFirstPositionWithoutMine", set "isMine" to true in position returned, delete probability to cell and call "increasePerimeterProbability"', () => {
        const gameFake = new Minesweeper({ rows: 9, columns: 9, countMines: 3 });
        const positionFake: BoardPosition = { row: 1, column: 2 };
        spyOn(gameFake, 'getFirstPositionWithoutMine').and.returnValue(positionFake);
        spyOn(gameFake, 'increasePerimeterProbability');

        gameFake.generateNewMine();

        expect(gameFake.getFirstPositionWithoutMine).toHaveBeenCalled();
        expect(gameFake.getMatrix()[1][2].isMine).toBeTruthy();
        expect(gameFake.getMatrix()[1][2].probability).toBeUndefined();
        expect(gameFake.increasePerimeterProbability).toHaveBeenCalledWith(positionFake);
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

    // tslint:disable-next-line:max-line-length
    it('should "increasePerimeterProbability" increase around of position in: [up, left],[up],[up, right],[left],[right],[down, left],[down],[down, right]', () => {
        const game = new Minesweeper({ rows: 3, columns: 3, countMines: 0 });

        game.increasePerimeterProbability({ row: 1, column: 1 });

        expect(game.getMatrix()[2][0].probability).toBe(1);
        expect(game.getMatrix()[2][1].probability).toBe(1);
        expect(game.getMatrix()[2][2].probability).toBe(1);
        expect(game.getMatrix()[1][0].probability).toBe(1);
        expect(game.getMatrix()[1][2].probability).toBe(1);
        expect(game.getMatrix()[0][0].probability).toBe(1);
        expect(game.getMatrix()[0][1].probability).toBe(1);
        expect(game.getMatrix()[0][2].probability).toBe(1);
    });

    // tslint:disable-next-line:max-line-length
    it('should "increasePerimeterProbability" increase around of position in: [up, left],[up],[up, right],[left],[right],[down, left],[down],[down, right] only if in this position not have a mine', () => {
        const game = new Minesweeper({ rows: 3, columns: 3, countMines: 0 });
        game.getMatrix()[2][1].isMine = true;

        game.increasePerimeterProbability({ row: 1, column: 1 });

        expect(game.getMatrix()[2][1].probability).toBe(0);

        expect(game.getMatrix()[2][0].probability).toBe(1);
        expect(game.getMatrix()[2][2].probability).toBe(1);
        expect(game.getMatrix()[1][0].probability).toBe(1);
        expect(game.getMatrix()[1][2].probability).toBe(1);
        expect(game.getMatrix()[0][0].probability).toBe(1);
        expect(game.getMatrix()[0][1].probability).toBe(1);
        expect(game.getMatrix()[0][2].probability).toBe(1);
    });

    // tslint:disable-next-line:max-line-length
    it('should "increasePerimeterProbability" increase around of position in: [up, left],[up],[up, right],[left],[right],[down, left],[down],[down, right] only if the position not out of range to matrix', () => {
        const game = new Minesweeper({ rows: 3, columns: 3, countMines: 0 });

        game.increasePerimeterProbability({ row: 0, column: 0 });

        expect(game.getMatrix()[1][0].probability).toBe(1);
        expect(game.getMatrix()[1][1].probability).toBe(1);
        expect(game.getMatrix()[0][1].probability).toBe(1);
    });

    it('should "processBeaten" change "beaten" and "discovered" to true in correct position', () => {
        const game = new Minesweeper({ rows: 7, columns: 7, countMines: 0 });
        game.processBeaten({ row: 2, column: 5 });

        expect(game.getMatrix()[2][5].beaten).toBeTruthy();
        expect(game.getMatrix()[2][5].discovered).toBeTruthy();
    });

    it('should "processBeaten" if cell in position is mine discover all others mines', () => {
        const game = new Minesweeper({ columns: 3, rows: 3, countMines: 0 });
        game.getMatrix()[0][1].isMine = true;
        game.getMatrix()[1][0].isMine = true;
        game.getMatrix()[2][1].isMine = true;

        game.processBeaten({ row: 0, column: 1 });

        expect(game.getMatrix()[0][1].discovered).toBeTruthy();
        expect(game.getMatrix()[1][0].discovered).toBeTruthy();
        expect(game.getMatrix()[2][1].discovered).toBeTruthy();
    });

    it('should "processBeaten" if cell in the position NOT is mine NOT discover all others mines', () => {
        const game = new Minesweeper({ columns: 3, rows: 3, countMines: 0 });
        game.getMatrix()[0][1].isMine = true;
        game.getMatrix()[1][0].isMine = true;
        game.getMatrix()[2][1].isMine = true;

        game.processBeaten({ row: 0, column: 0 });

        expect(game.getMatrix()[0][1].discovered).toBeFalsy();
        expect(game.getMatrix()[1][0].discovered).toBeFalsy();
        expect(game.getMatrix()[2][1].discovered).toBeFalsy();
    });

    it('should "processBeaten" call "discoverAround" if cell in the position NOT is a mine and probability is 0', () => {
        const game = new Minesweeper({ columns: 3, rows: 3, countMines: 0 });
        const position: BoardPosition = { row: 0, column: 0 };
        spyOn(game, 'discoverAround');

        game.processBeaten(position);

        expect(game.discoverAround).toHaveBeenCalledWith(position);
    });

    it('should "processBeaten" NOT call "discoverAround" if cell in the position NOT is a mine and probability is defferent to 0', () => {
        const game = new Minesweeper({ columns: 3, rows: 3, countMines: 0 });
        const position: BoardPosition = { row: 0, column: 0 };
        game.getMatrix()[0][0].probability = 2;
        spyOn(game, 'discoverAround');

        game.processBeaten(position);

        expect(game.discoverAround).not.toHaveBeenCalled();
    });

    it('should "processBeaten" NOT call "discoverAround" if cell in the position is a mine', () => {
        const game = new Minesweeper({ columns: 3, rows: 3, countMines: 0 });
        game.getMatrix()[0][0].isMine = true;
        const position: BoardPosition = { row: 0, column: 0 };
        spyOn(game, 'discoverAround');

        game.processBeaten(position);

        expect(game.discoverAround).not.toHaveBeenCalled();
    });

    // tslint:disable-next-line:max-line-length
    it('should "discoverAround" discover the cells around of position until find probability different to 0 or mine', () => {
        const game = new Minesweeper({ columns: 3, rows: 3, countMines: 0 });
        const matrix = game.getMatrix();
        matrix[0][0].probability = 1;
        matrix[0][1].probability = 1;
        matrix[1][1].probability = 1;
        matrix[1][0].probability = 1;
        matrix[0][2].isMine = true;

        game.discoverAround({ row: 2, column: 2 });

        expect(matrix[0][0].discovered).toBeFalsy();
        expect(matrix[0][1].discovered).toBeTruthy();
        expect(matrix[1][1].discovered).toBeTruthy();
        expect(matrix[1][0].discovered).toBeTruthy();
        expect(matrix[2][0].discovered).toBeTruthy();
        expect(matrix[2][1].discovered).toBeTruthy();
        expect(matrix[1][2].discovered).toBeTruthy();
    });
});
