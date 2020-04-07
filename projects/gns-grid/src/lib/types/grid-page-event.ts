export declare class GridPageEvent {
  /** The current page index. */
  pageIndex: number;
  /**
   * Index of the page that was selected previously.
   * @breaking-change 8.0.0 To be made into a required property.
   */
  /** The current page size */
  pageSize: number;
  /** The current total number of items being paged */
  length: number;
}
