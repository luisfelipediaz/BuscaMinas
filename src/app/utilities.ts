import { Cell, CellsMatrix } from './cell/cell';
import { Dimension } from './minesweeper/dimension';
import { BoardPosition } from './board/board-position';

const newCell: Cell = {
    isMine: false,
    beaten: false,
    discovered: false,
    probability: 0
};

export class Utilities {
    static generateMatrixWithNewsCells(dimensions: Dimension): CellsMatrix {
        const matrix: CellsMatrix = [];
        this.iterateOfNumberToCallBack(dimensions.rows, (row: number) => {
            matrix[row] = [];
            this.iterateOfNumberToCallBack(dimensions.columns, (column: number) => {
                matrix[row][column] = { ...newCell };
            });
        });
        return matrix;
    }

    private static iterateOfNumberToCallBack(count: number, callback: any) {
        for (let index = 0; index < count; index++) {
            callback(index);
        }
    }

    static getRandomPosition(dimension: Dimension): BoardPosition {
        return {
            row: this.getRandomNumer(dimension.rows),
            column: this.getRandomNumer(dimension.columns)
        };
    }

    static getRandomNumer(number: number): number {
        return Math.floor(Math.random() * number);
    }
}
