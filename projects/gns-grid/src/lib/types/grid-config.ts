import { GridClassFn, gridHeaderCellClassFn, gridHeaderCellStyle, gridRowClassFn, gridRowStyle, GridStyleFn } from './functions';

export class GridConfig {
  headerPosition?: 'top' | 'bottom' | 'both' = 'top';
  filterRowPosition?: 'top' | 'bottom' | 'both' = 'top';
  activeRowClass?: string = 'bg-secondary';
  gridClass?: string;
  gridClassFn?: GridClassFn;
  gridNgStyle?: object;
  gridStyleFn?: GridStyleFn;
  headerClass?: string;
  headerClassFn?: GridClassFn;
  headerNgStyle?: object;
  headerStyleFn?: GridStyleFn;
  bodyClass?: string;
  bodyClassFn?: GridClassFn;
  bodyNgStyle?: object;
  bodyStyleFn?: GridStyleFn;
  headerRowClass?: string;
  headerRowClassFn?: GridClassFn;
  headerRowNgStyle?: object;
  headerRowStyleFn?: GridStyleFn;
  headerFilterRowClass?: string;
  headerFilterRowClassFn?: GridClassFn;
  headerFilterRowNgStyle?: object;
  headerFilterRowStyleFn?: GridStyleFn;
  rowClass?: string;
  rowClassFn?: gridRowClassFn;
  rowNgStyle?: object;
  rowStyleFn?: gridRowStyle;
  headerCellClass?: string;
  headerCellClassFn?: gridHeaderCellClassFn;
  headerCellNgStyle?: object;
  headerCellStyleFn?: gridHeaderCellStyle;
  footerClass?: string;
  footerClassFn?: GridClassFn;
  footerNgStyle?: object;
  footerStyleFn?: GridStyleFn;
  footerRowClass?: string;
  footerRowClassFn?: GridClassFn;
  footerRowNgStyle?: object;
  footerRowStyleFn?: GridStyleFn;
  footerCellClass?: string;
  footerCellClassFn?: gridHeaderCellClassFn;
  footerCellNgStyle?: object;
  footerCellStyleFn?: gridHeaderCellStyle;
}
