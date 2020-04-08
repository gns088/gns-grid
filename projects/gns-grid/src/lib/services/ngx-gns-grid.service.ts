import { Injectable, isDevMode, TrackByFunction } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { coerceBooleanProperty, GridColumnDef, GridConfig, GridPagination, GridState, RowSelectionConfig, SelectionModel } from '../types';
import { GridPaginationConfig } from '../types/grid-pagination-config';
import { coerceArray } from '../types/coerce-functions';
import * as _ from 'lodash';

@Injectable()
export class NgxGnsGridService {
  private _stateObservable$: ReplaySubject<GridState> = new ReplaySubject();
  private _filterObservable$: ReplaySubject<Map<string, any>> = new ReplaySubject();
  private _sortObservable$: ReplaySubject<Map<string, string>> = new ReplaySubject();
  private _paginationObservable$: ReplaySubject<GridPagination> = new ReplaySubject();
  private _trackByFn: TrackByFunction<any>;
  private _dataSource: Array<any> = [];
  private _localDataSource: Array<any> = [];
  private _displayedColumns: string[] = [];
  private _columnDef: GridColumnDef[];
  private _showFooter: boolean = false;
  private _pageable: boolean = true;
  private _sortable: boolean = true;
  private _filterable: boolean = true;
  private _isClientSide: boolean = true;
  private _gridConfig: GridConfig = new GridConfig();
  private _paginationConfig: GridPaginationConfig = new GridPaginationConfig();
  private _stripedRows: boolean = true;
  private _hoverRows: boolean = true;
  private _tableShadow: boolean = true;
  private _tableBordered: boolean = true;
  private _tableSmall: boolean = true;
  private _tableDark: boolean = false;
  private _stickyHeader: boolean = false;
  private _selectable: boolean = false;
  private _selectableConfig: RowSelectionConfig = new RowSelectionConfig();
  private _selectedKeys: any[] = [];
  private _selection = new SelectionModel<any>();
  private _tableHeight: string;

  get stateObservable$(): ReplaySubject<GridState> {
    return this._stateObservable$;
  }

  set stateObservable$(value: ReplaySubject<GridState>) {
    this._stateObservable$ = value;
  }

  get filterObservable$(): ReplaySubject<Map<string, any>> {
    return this._filterObservable$;
  }

  set filterObservable$(value: ReplaySubject<Map<string, any>>) {
    this._filterObservable$ = value;
  }

  get sortObservable$(): ReplaySubject<Map<string, string>> {
    return this._sortObservable$;
  }

  set sortObservable$(value: ReplaySubject<Map<string, string>>) {
    this._sortObservable$ = value;
  }

  get paginationObservable$(): ReplaySubject<GridPagination> {
    return this._paginationObservable$;
  }

  set paginationObservable$(value: ReplaySubject<GridPagination>) {
    this._paginationObservable$ = value;
  }

  get trackByFn(): TrackByFunction<any> {
    return this._trackByFn;
  }

  set trackByFn(fn: TrackByFunction<any>) {
    if (isDevMode() && fn != null && typeof fn !== 'function' && console && console.warn) {
      console.warn(`trackBy must be a function, but received ${JSON.stringify(fn)}.`);
    }
    this.trackByFn = fn;
  }

  get dataSource(): Array<any> {
    return this._dataSource;
  }

  set dataSource(value: Array<any>) {
    if (this.dataSource !== value) {
      this._dataSource = value;
      this._localDataSource = value;
    }
  }

  get localDataSource(): Array<any> {
    return this._localDataSource;
  }

  set localDataSource(value: Array<any>) {
    if (this.localDataSource !== value) {
      this._localDataSource = JSON.parse(JSON.stringify(value));
    }
  }

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  set displayedColumns(value: string[]) {
    this._displayedColumns = value;
  }

  get columnDef(): GridColumnDef[] {
    return this._columnDef;
  }

  set columnDef(value: GridColumnDef[]) {
    this._columnDef = coerceArray(value);
  }

  get showFooter(): boolean {
    return this._showFooter;
  }

  set showFooter(value: boolean) {
    this._showFooter = coerceBooleanProperty(value);
  }

  get pageable(): boolean {
    return this._pageable;
  }

  set pageable(value: boolean) {
    this._pageable = coerceBooleanProperty(value);
  }

  get sortable(): boolean {
    return this._sortable;
  }

  set sortable(value: boolean) {
    this._sortable = coerceBooleanProperty(value);
  }

  get filterable(): boolean {
    return this._filterable;
  }

  set filterable(value: boolean) {
    this._filterable = coerceBooleanProperty(value);
  }

  get isClientSide(): boolean {
    return this._isClientSide;
  }

  set isClientSide(value: boolean) {
    this._isClientSide = coerceBooleanProperty(value);
  }

  get gridConfig(): GridConfig {
    return this._gridConfig;
  }

  set gridConfig(value: GridConfig) {
    value = _.merge(this.gridConfig, value);
    this._gridConfig = value;
  }

  get paginationConfig(): GridPaginationConfig {
    return this._paginationConfig;
  }

  set paginationConfig(value: GridPaginationConfig) {
    value = _.merge(this.paginationConfig, value);
    this._paginationConfig = value;
  }

  get stripedRows(): boolean {
    return this._stripedRows;
  }

  set stripedRows(value: boolean) {
    this._stripedRows = coerceBooleanProperty(value);
  }

  get hoverRows(): boolean {
    return this._hoverRows;
  }

  set hoverRows(value: boolean) {
    this._hoverRows = coerceBooleanProperty(value);
  }

  get tableShadow(): boolean {
    return this._tableShadow;
  }

  set tableShadow(value: boolean) {
    this._tableShadow = value;
  }

  get selectable(): boolean {
    return this._selectable;
  }

  set selectable(value: boolean) {
    this.selectable = coerceBooleanProperty(value);
    if (this.displayedColumns.indexOf('select') === -1) {
      this.displayedColumns.splice(0, 0, 'select');
    }
    this.selection = new SelectionModel<any>(
      this.selectableConfig.multiple,
      []
    );
  }

  get selectableConfig(): RowSelectionConfig {
    return this._selectableConfig;
  }

  set selectableConfig(value: RowSelectionConfig) {
    if (value.columnId) {
      this.selectableConfig.columnId = value.columnId;
    }
    this.selectableConfig.multiple = coerceBooleanProperty(value.multiple);
    this.selection = new SelectionModel<any>(
      this.selectableConfig.multiple,
      []
    );
  }

  get selectedKeys(): any[] {
    return this._selectedKeys;
  }

  set selectedKeys(value: any[]) {
    this._selectedKeys = value;
  }

  get selection(): SelectionModel<any> {
    return this._selection;
  }

  set selection(value: SelectionModel<any>) {
    this._selection = value;
  }


  get tableBordered(): boolean {
    return this._tableBordered;
  }

  set tableBordered(value: boolean) {
    this._tableBordered = coerceBooleanProperty(value);
  }


  get tableSmall(): boolean {
    return this._tableSmall;
  }

  set tableSmall(value: boolean) {
    this._tableSmall = coerceBooleanProperty(value);
  }


  get tableDark(): boolean {
    return this._tableDark;
  }

  set tableDark(value: boolean) {
    this._tableDark = coerceBooleanProperty(value);
  }

  get stickyHeader(): boolean {
    return this._stickyHeader;
  }

  set stickyHeader(value: boolean) {
    this._stickyHeader = coerceBooleanProperty(value);
  }

  get tableHeight(): string {
    return this._tableHeight;
  }

  set tableHeight(value: string) {
    this._tableHeight = value;
  }
}
