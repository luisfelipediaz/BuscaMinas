import { Utilities } from './utilities';
import { Cell } from './cell/cell';
import { BoardPosition } from './board/board-position';

describe('Utilities', () => {
    it('should "generateMatrixWithNewsCells" return a new matrix expected', () => {
        const cell: Cell = {
            isMine: false,
            beaten: false,
            probability: 0
        };
        const expected = new Array(10).fill(new Array(9).fill(cell));
        const actual = Utilities.generateMatrixWithNewsCells({ rows: 10, columns: 9 });

        expect(actual).toEqual(expected);
    });

    it('should "getRandomNumer" call "Math.random" and "Math.floor"', () => {
        spyOn(Math, 'random').and.returnValue(2);
        spyOn(Math, 'floor');

        Utilities.getRandomNumer(1);

        expect(Math.floor).toHaveBeenCalledWith(2);
        expect(Math.random).toHaveBeenCalled();
    });

    it('should "getRandomPosition" call "getRandomNumer" two times and return one Position', () => {
        spyOn(Utilities, 'getRandomNumer').and.returnValue(2);
        const expected: BoardPosition = { row: 2, column: 2 };

        const actual = Utilities.getRandomPosition({ rows: 5, columns: 5 });

        expect(Utilities.getRandomNumer).toHaveBeenCalledTimes(2);
        expect(actual).toEqual(expected);
    });
});
