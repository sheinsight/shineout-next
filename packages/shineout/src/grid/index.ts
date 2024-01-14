import Grid from './grid';

type RefGrid = typeof Grid;

export interface GridComponent extends RefGrid {
  displayName: string;
}

const GridComp: GridComponent = Grid as GridComponent;

GridComp.displayName = 'ShineoutGrid';

export default GridComp;
