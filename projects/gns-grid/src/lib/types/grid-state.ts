import { GridStateSort } from './grid-state-sort';

export class GridState {
  public filter?: GridStateFilter[] = [];
  public pageIndex: number = 1;
  public pageSize?: number = 10;
  public sort?: GridStateSort[] = [];
}

export class GridStateFilter {
  field: string;
  value: any;
  index: number;
}


