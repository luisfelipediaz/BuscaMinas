export type CellsMatrix = Cell[][];

export interface Cell {
    isMine: boolean;
    beaten: boolean;
    discovered: boolean;
    marked: boolean;
    probability: number;
}
