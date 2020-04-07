export declare type SortDirection = 'asc' | 'desc' | '';

export interface GridSort {
  /** The id of the column being sorted. */
  field: string;
  /** The sort direction. */
  direction: SortDirection;
}
