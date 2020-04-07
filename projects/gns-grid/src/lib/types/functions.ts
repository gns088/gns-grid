export declare type ColumnValueFn = (element: any, index: number) => string | string[] | Set<string>;
export declare type RowClassFn = (dataItem: any, index: number) => string | string[] | Set<string>;
export declare type RowStyleFn = (dataItem: any, index: number) => {
  [key: string]: any;
};

// export declare type RowSelectedFn = (context: NgxMatGridRow) => boolean;

export declare type GridClassFn = () => string | string[] | Set<string>;
export declare type GridStyleFn = () => {
  [key: string]: any;
};
export declare type gridHeaderCellClassFn = (column: any, index: number) => string | string[] | Set<string>;
export declare type gridHeaderCellStyle = (column: any, index: number) => {
  [key: string]: any;
};
export declare type gridRowClassFn = (row: any, index: number) => string | string[] | Set<string>;
export declare type gridRowStyle = (row: any, index: number) => {
  [key: string]: any;
};
