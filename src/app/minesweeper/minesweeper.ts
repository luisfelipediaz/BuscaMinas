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
    }

    getFirstPositionWithoutMine(): BoardPosition {
        let position: BoardPosition;

        do {
            position = Utilities.getRandomPosition(this.dimension);
        } while (this.matrix[position.row][position.column].isMine);

        return position;
    }

    getMatrix(): CellsMatrix {
        return this.matrix;
    }
}
