export class Minesweeper {
    private matrix: Cell[][];
    private dimensions: { rows: number, columns: number };

    constructor(rows: number, columns: number, private countMines: number) {
        this.matrix = new Array(rows).fill(new Array(columns).fill({ ...newCell }));
        this.dimensions = { rows, columns };
        this.createMines(countMines);
    }

    static newBeginersGame() {
        return new Minesweeper(8, 8, 10);
    }

    createMines(countMines: number) {
        for (let index = 0; index < countMines; index++) {
            this.generateNewMine();
        }
    }

    generateNewMine() {
        let row: number;
        let column: number;

        do {
            row = Math.floor(Math.random() * this.dimensions.rows);
            column = Math.floor(Math.random() * this.dimensions.columns);
        } while (this.matrix[row][column].isMine);

        this.matrix[row][column].isMine = true;
    }

    getMatrix(): any[][] {
        return this.matrix;
    }
}

export function generateMatrixWithNewsCells(dimensions: { rows: number, columns: number }): Cell[][] {
    const matrix: Cell[][] = new Array(dimensions.rows);
    matrix.fill({...new Array(dimensions.columns).fill({ ...newCell })});
    return matrix;
}

const newCell: Cell = {
    isMine: false,
    beaten: false,
    probability: 0
};

export interface Cell {
    isMine: boolean;
    beaten: boolean;
    probability: number;
}
