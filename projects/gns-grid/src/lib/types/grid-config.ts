import { GridClassFn, gridHeaderCellClassFn, gridHeaderCellStyle, gridRowClassFn, gridRowStyle, GridStyleFn } from './functions';

export class GridConfig {
  gridClass?: string;
  gridNgClass?: object;
  gridClassFn?: GridClassFn;
  gridNgStyle?: object;
  gridStyleFn?: GridStyleFn;
  gridHeaderRowClass?: string;
  gridHeaderRowNgClass?: object;
  gridHeaderRowClassFn?: GridClassFn;
  gridHeaderRowNgStyle?: object;
  gridHeaderRowStyleFn?: GridStyleFn;
  gridRowClass?: string;
  gridRowNgClass?: object;
  gridRowClassFn?: gridRowClassFn;
  gridRowNgStyle?: object;
  gridRowStyleFn?: gridRowStyle;
  gridHeaderCellClass?: string;
  gridHeaderCellNgClass?: object;
  gridHeaderCellClassFn?: gridHeaderCellClassFn;
  gridHeaderCellNgStyle?: object;
  gridHeaderCellStyleFn?: gridHeaderCellStyle;
  gridFooterClass?: string;
  gridFooterNgClass?: object;
  gridFooterClassFn?: GridClassFn;
  gridFooterNgStyle?: object;
  gridFooterStyleFn?: GridStyleFn;
}
