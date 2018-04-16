export class Minesweeper {
    private matrix: any[][];

    constructor(rows: number, columns: number, private countMines: number) {
        this.matrix = new Array(rows).fill(new Array(columns));
    }

    static newBeginersGame() {
        return new Minesweeper(8, 8, 10);
    }

    getMatrix(): any[][] {
        return this.matrix;
    }
}
