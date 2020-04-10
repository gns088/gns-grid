export declare type SortDirection = 'asc' | 'desc' | '';

export interface GridStateSort {
  /** The id of the column being sorted. */
  field: string;
  /** The sort direction. */
  direction: SortDirection;
  /** the index of sort */
  index: number;
}

export class SortableConfig {
  multiple: boolean = false;
  enable: boolean = true;
}
