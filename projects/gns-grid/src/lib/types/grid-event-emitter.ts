import { GridColumnDef } from './grid-column-def';

export interface GridRowClickEvent {
  dataItem: any;
  index: number;
  event: Event;
}

export interface GridCellClickEvent {
  column: GridColumnDef;
  columnIndex: number;
  row: GridColumnDef;
  rowIndex: number;
  event: Event;
}
