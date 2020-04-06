export type GridColumnFilterType = 'text' | 'number' | 'date' | 'dateTime' | 'time' | 'singleSelect' | 'multiSelect';

export class GridColumnFilterDef {
  type: GridColumnFilterType;
  placeholder?: string;
  icon?: boolean;
  prepend?: string;
  append?: string;
  /**
   * field required for list filter
   * */
  listValue?: any[];
  listBindKey?: string;
  listDisplayKey?: string;

  /**
   * for date and time filter
   * */
  range?: boolean;
}
