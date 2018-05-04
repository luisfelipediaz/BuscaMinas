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
        this.incrementProbabilityIfNotIsMine({ row: position.row + 1, column: position.column - 1 });
        this.incrementProbabilityIfNotIsMine({ row: position.row + 1, column: position.column });
        this.incrementProbabilityIfNotIsMine({ row: position.row + 1, column: position.column + 1 });
        this.incrementProbabilityIfNotIsMine({ row: position.row, column: position.column - 1 });
        this.incrementProbabilityIfNotIsMine({ row: position.row, column: position.column + 1 });
        this.incrementProbabilityIfNotIsMine({ row: position.row - 1, column: position.column - 1 });
        this.incrementProbabilityIfNotIsMine({ row: position.row - 1, column: position.column });
        this.incrementProbabilityIfNotIsMine({ row: position.row - 1, column: position.column + 1 });
    }

    private incrementProbabilityIfNotIsMine(position: BoardPosition) {
        if (this.isOutOfRange(position)) {
            return;
        }
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

    getMatrix(): CellsMatrix {
        return this.matrix;
    }
}
