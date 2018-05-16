import { Cell, CellsMatrix } from '../cell/cell';
import { BoardPosition } from '../board/board-position';
import { Dimension } from './dimension';
import { DimensionOfMinesweeper } from './dimension-of-minesweeper';
import { Utilities } from '../utilities';

export class Minesweeper {
    private matrix: CellsMatrix;

    constructor(private dimension: DimensionOfMinesweeper) {
        this.matrix = Utilities.generateMatrixWithNewsCells(dimension);
        this.createMines(dimension.countMines);
    }

    static newBeginersGame() {
        return new Minesweeper({ rows: 8, columns: 8, countMines: 10 });
    }

    createMines(countMines: number) {
        for (let index = 0; index < countMines; index++) {
            this.generateNewMine();
        }
    }

    generateNewMine() {
        const position = this.getFirstPositionWithoutMine();

        this.matrix[position.row][position.column].isMine = true;
        delete this.matrix[position.row][position.column].probability;

        this.increasePerimeterProbability(position);
    }

    getFirstPositionWithoutMine(): BoardPosition {
        let position: BoardPosition;

        do {
            position = Utilities.getRandomPosition(this.dimension);
        } while (this.matrix[position.row][position.column].isMine);

        return position;
    }

    increasePerimeterProbability(position: BoardPosition) {
        this.travelInPerimeterOfPositionWithCallBack(position,
            (positionInternal: BoardPosition) => this.incrementProbabilityIfNotIsMine(positionInternal));
    }

    private travelInPerimeterOfPositionWithCallBack(position: BoardPosition, callback: any) {
        this.verifyPositionAndCallBack({ row: position.row + 1, column: position.column - 1 }, callback);
        this.verifyPositionAndCallBack({ row: position.row + 1, column: position.column }, callback);
        this.verifyPositionAndCallBack({ row: position.row + 1, column: position.column + 1 }, callback);
        this.verifyPositionAndCallBack({ row: position.row, column: position.column - 1 }, callback);
        this.verifyPositionAndCallBack({ row: position.row, column: position.column + 1 }, callback);
        this.verifyPositionAndCallBack({ row: position.row - 1, column: position.column - 1 }, callback);
        this.verifyPositionAndCallBack({ row: position.row - 1, column: position.column }, callback);
        this.verifyPositionAndCallBack({ row: position.row - 1, column: position.column + 1 }, callback);
    }

    private verifyPositionAndCallBack(position: BoardPosition, callback: any) {
        if (this.isOutOfRange(position)) {
            return;
        }

        callback(position);
    }

    private incrementProbabilityIfNotIsMine(position: BoardPosition) {
        if (!this.matrix[position.row][position.column].isMine) {
            this.matrix[position.row][position.column].probability++;
        }
    }

    private isOutOfRange(position: BoardPosition) {
        if (position.row < 0 || position.row >= this.dimension.rows) {
            return true;
        }

        if (position.column < 0 || position.column >= this.dimension.columns) {
            return true;
        }

        return false;
    }

    processBeaten(position: BoardPosition) {
        const cellBeaten: Cell = this.matrix[position.row][position.column];
        cellBeaten.discovered = cellBeaten.beaten = true;

        if (cellBeaten.isMine) {
            this.matrix.forEach((row: Cell[]) => {
                row.forEach((cell: Cell) => {
                    if (cell.isMine) {
                        cell.discovered = true;
                    }
                });
            });
        } else if (cellBeaten.probability === 0) {
            this.discoverAround(position);
        }
    }

    discoverAround(position: BoardPosition) {
        const callback = (positionInternal: BoardPosition) => {
            this.processDiscovered(positionInternal);
        };
        this.travelInPerimeterOfPositionWithCallBack(position, callback);
    }

    private processDiscovered(position: BoardPosition) {
        const cell = this.matrix[position.row][position.column];
        if (cell.isMine || cell.discovered) {
            return;
        }

        cell.discovered = true;

        if (cell.probability === 0) {
            this.discoverAround(position);
        }
    }

    getMatrix(): CellsMatrix {
        return this.matrix;
    }
}
