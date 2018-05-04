export type CellsMatrix = Cell[][];

export interface Cell {
    isMine: boolean;
    beaten: boolean;
    probability: number;
}
