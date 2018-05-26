import { Cell, CellsMatrix } from '../cell/cell';
import { BoardPosition } from '../board/board-position';
import { Dimension } from './dimension';
import { DimensionOfMinesweeper } from './dimension-of-minesweeper';
import { Utilities } from '../utilities';

export class Minesweeper {
    private matrix: CellsMatrix;

    constructor(private dimension: DimensionOfMinesweeper) {
        this.matrix = Utilities.generateMatrixWithNewsCells(dimension);
        this.generateMines(dimension.countMines);
    }

    static newBeginersGame() {
        return new Minesweeper({ rows: 8, columns: 8, countMines: 10 });
    }

    generateMines(countMines: number) {
        for (let index = 0; index < countMines; index++) {
            this.generateNewMine();
        }
    }

    getMatrix(): CellsMatrix {
        return this.matrix;
    }

    generateNewMine() {
        const position = this.getFirstPositionWithoutMine();
        const cell = this.getMine(position);

        cell.isMine = true;
        delete cell.probability;

        this.increasePerimeterProbability(position);
    }

    private getMine(position: BoardPosition): Cell {
        return this.matrix[position.row][position.column];
    }

    getFirstPositionWithoutMine(): BoardPosition {
        let position: BoardPosition;

        do {
            position = Utilities.getRandomPosition(this.dimension);
        } while (this.getMine(position).isMine);

        return position;
    }

    increasePerimeterProbability(position: BoardPosition) {
        const callback = (positionInternal: BoardPosition) => this.incrementProbabilityIfNotIsMine(positionInternal);
        this.travelOfPerimeterWithCallBack(position, callback);
    }

    private travelOfPerimeterWithCallBack(position: BoardPosition, callback: any) {
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
        const cell: Cell = this.getMine(position);
        if (!cell.isMine) {
            cell.probability++;
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
            this.discoverAllMines();
        } else if (cellBeaten.probability === 0) {
            this.discoverAround(position);
        }
    }

    private discoverAllMines() {
        this.matrix.forEach((row: Cell[]) => {
            row.forEach((cell: Cell) => {
                if (cell.isMine) {
                    cell.discovered = true;
                }
            });
        });
    }

    discoverAround(position: BoardPosition) {
        const callback = (positionInternal: BoardPosition) => {
            this.processDiscovered(positionInternal);
        };
        this.travelOfPerimeterWithCallBack(position, callback);
    }

    private processDiscovered(position: BoardPosition) {
        const cell = this.getMine(position);
        if (cell.isMine || cell.discovered) {
            return;
        }

        cell.discovered = true;

        if (cell.probability === 0) {
            this.discoverAround(position);
        }
    }

    processMark(position: BoardPosition) {

    }
}
