export class GridState {
  public filter?: Map<string, any> = new Map<string, any>();
  public pageIndex: number = 1;
  public pageSize?: number = 10;
  public sort?: Map<string, string> = new Map<string, string>();
}
