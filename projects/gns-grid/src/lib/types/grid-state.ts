export class GridState {
  public filter?: Map<string, any> = new Map<string, any>();
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public sort?: Map<string, string> = new Map<string, string>();
  public total: number = 0;
}
