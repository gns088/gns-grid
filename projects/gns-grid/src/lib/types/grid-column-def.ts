import { ColumnValueFn, RowClassFn, RowStyleFn } from './functions';
import { GridColumnFilterDef } from './grid-column-filter-def';

export class GridColumnDef {
  id: string;
  hide?: boolean;
  headerTitle?: string;
  headerTitleFn?: RowClassFn;
  valueFn?: ColumnValueFn;
  class?: string;
  classFn?: RowClassFn;
  ngClass?: object;
  ngStyle?: object;
  styleFn?: RowStyleFn;
  cellClass?: string;
  cellClassFn?: RowClassFn;
  cellNgClass?: object;
  cellNgStyle?: object;
  cellStyleFn?: RowStyleFn;
  minWidth?: number;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  filterDetails?: GridColumnFilterDef;
}
