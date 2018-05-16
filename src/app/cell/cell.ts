export type CellsMatrix = Cell[][];

export interface Cell {
    isMine: boolean;
    beaten: boolean;
    discovered: boolean;
    probability: number;
}
