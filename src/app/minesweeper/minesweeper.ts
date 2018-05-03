export class Minesweeper {
    private matrix: Cell[][];

    constructor(rows: number, columns: number, private countMines: number) {
        this.matrix = new Array(rows).fill(new Array(columns));
        this.createMines(countMines);
    }

    static newBeginersGame() {
        return new Minesweeper(8, 8, 10);
    }

    createMines(countMines: number) {

    }

    getMatrix(): any[][] {
        return this.matrix;
    }
}

export interface Cell {
    isMine: boolean;
    beaten: boolean;
    probability: number;
}
