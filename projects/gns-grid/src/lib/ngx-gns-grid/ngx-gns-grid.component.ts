import { Component, EventEmitter, Input, OnInit, Output, TrackByFunction, ViewEncapsulation } from '@angular/core';
import { NgxGnsGridService } from '../services/ngx-gns-grid.service';
import { NgxGnsGridStateService } from '../services/ngx-gns-grid-state.service';
import { GridColumnDef, GridConfig, GridState, RowSelectionConfig, SelectionModel } from '../types';
import { GridPaginationConfig } from '../types/grid-pagination-config';

@Component({
  selector: 'ngx-gns-grid',
  templateUrl: './ngx-gns-grid.component.html',
  styleUrls: ['./ngx-gns-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgxGnsGridService, NgxGnsGridStateService]
})
export class NgxGnsGridComponent implements OnInit {
  /**
   * store state for active grid, store all information about sorting, filtering and pagination
   * */
  @Input('state')
  get state(): GridState {
    return this.ngxGnsGridStateService.state;
  }

  set state(value: GridState) {
    this.ngxGnsGridService.stateObservable$.next(value);
    this.ngxGnsGridStateService.state = value;
  }

  /**
   * Tracking function that will be used to check the differences in data changes. Used similarly
   * to `ngFor` `trackBy` function.
   * */
  @Input()
  set trackBy(fn: TrackByFunction<any>) {
    this.ngxGnsGridService.trackByFn = fn;
  }

  /**
   * data list
   * */
  @Input()
  set dataSource(value: Array<any>) {
    this.ngxGnsGridService.dataSource = value;
  }

  /**
   * used by mat-table to show identify which column we need to show.
   * */
  @Input('displayedColumns')
  set displayedColumns(value: string[]) {
    this.ngxGnsGridService.displayedColumns = value;
  }

  /**
   * Column definitions
   * class - string can pass class names
   * classFn - if you want to apply class condition wise for specific column cell
   * id - key of column, same as in displayedColumn name, it will be used to store filter,sortable details of column in state
   * displayName- name to be showing on heading for given id
   * style - can pass style string
   * styleFn - can pass style function for conditional styling
   * width - width of column
   * ngStyle - ngStyle of column for apply style
   * ngClass - ngClass of column for apply class
   */
  @Input('columnDef')
  set columnDef(value: GridColumnDef[]) {
    this.ngxGnsGridService.columnDef = value;
  }

  /**
   * Enable selection in mat-grid
   * */
  @Input('selectable')
  set selectable(value: boolean) {
    this.ngxGnsGridService.selectable = value;
  }

  @Input('selectableConfig')
  set selectableConfig(value: RowSelectionConfig) {
    this.ngxGnsGridService.selectableConfig = value;
  }

  @Input('selectedKeys')
  set selectedKeys(value: any[]) {
    this.ngxGnsGridService.selectedKeys = value;
  }

  @Output('selectedKeysChange') selectedKeysChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  /**
   * Enable pagination in mat-grid
   * */
  @Input('pageable')
  set pageable(value: boolean) {
    this.ngxGnsGridService.pageable = value;
  }

  /**
   * Enable pagination in mat-grid
   * */
  @Input('selection')
  set selection(value: SelectionModel<any>) {
    this.ngxGnsGridService.selection = value;
  }

  /**
   * enable sorting in mat-grid
   * */
  @Input('sortable')
  set sortable(value: boolean) {
    this.ngxGnsGridService.sortable = value;
  }

  /**
   * enable filtration in mat-grid
   * */
  @Input('filterable')
  set filterable(value: boolean) {
    this.ngxGnsGridService.filterable = value;
  }

  /**
   * filtering, sorting and pagination is client side or server side.
   * if it is client side then all process will be handle by mat-grid locally.
   * */
  @Input('isClientSide')
  set isClientSide(value: boolean) {
    this.ngxGnsGridService.isClientSide = value;
  }

  /**
   * mat-grid config for header footer and grid(table) classes
   * */
  @Input('gridConfig')
  set gridConfig(value: GridConfig) {
    this.ngxGnsGridService.gridConfig = value;
  }

  /**
   *pagination config for mat-paginator configurations
   * */
  @Input('paginationConfig')
  set paginationConfig(value: GridPaginationConfig) {
    this.ngxGnsGridService.paginationConfig = value;
  }

  @Input('stripedRows')
  set stripedRows(value: boolean) {
    this.ngxGnsGridService.stripedRows = value;
  }

  @Input('hoverRows')
  set hoverRows(value: boolean) {
    this.ngxGnsGridService.hoverRows = value;
  }

  @Input('tableShadow')
  set tableShadow(value: boolean) {
    this.ngxGnsGridService.tableShadow = value;
  }

  @Input('tableBordered')
  set tableBordered(value: boolean) {
    this.ngxGnsGridService.tableBordered = value;
  }

  @Input('tableSmall')
  set tableSmall(value: boolean) {
    this.ngxGnsGridService.tableSmall = value;
  }

  @Input('tableDark')
  set tableDark(value: boolean) {
    this.ngxGnsGridService.tableDark = value;
  }

  constructor(public ngxGnsGridService: NgxGnsGridService,
              public ngxGnsGridStateService: NgxGnsGridStateService) {
  }

  ngOnInit() {
  }

}
