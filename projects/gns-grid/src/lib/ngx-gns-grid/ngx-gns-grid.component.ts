import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TrackByFunction,
  ViewEncapsulation
} from '@angular/core';
import { NgxGnsGridService } from '../services/ngx-gns-grid.service';
import { NgxGnsGridStateService } from '../services/ngx-gns-grid-state.service';
import {
  GridColumnDef,
  GridConfig,
  GridPagination,
  GridPaginationConfig,
  GridSort,
  GridState,
  RowSelectionConfig,
  SelectionModel
} from '../types';
import { Subscription } from 'rxjs';
import { GridUtils } from '../utils';
import { NgxGnsGridColumnComponent } from '../template-components/ngx-gns-grid-column/ngx-gns-grid-column.component';

@Component({
  selector: 'ngx-gns-grid',
  templateUrl: './ngx-gns-grid.component.html',
  styleUrls: ['./ngx-gns-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgxGnsGridService, NgxGnsGridStateService]
})
export class NgxGnsGridComponent implements OnInit, OnDestroy {
  /**
   * store state for active grid, store all information about sorting, filtering and pagination
   * */
  @Input('state')
  get state(): GridState {
    return this.ngxGnsGridStateService.state;
  }

  set state(value: GridState) {
    this.ngxGnsGridStateService.state = value;
    this.ngxGnsGridService.stateObservable$.next(this.ngxGnsGridStateService.state);
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
   * Enable footer row
   * */
  @Input('showFooter')
  set showFooter(value: boolean) {
    this.ngxGnsGridService.showFooter = value;
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

  @Input('stickyHeader')
  set stickyHeader(value: boolean) {
    this.ngxGnsGridService.stickyHeader = value;
  }

  @Input('tableHeight')
  set tableHeight(value: string) {
    this.ngxGnsGridService.tableHeight = value;
  }


  private stateSubscription: Subscription;
  private filterSubscription: Subscription;
  private sortSubscription: Subscription;
  private paginationSubscription: Subscription;

  @ContentChildren(NgxGnsGridColumnComponent, {descendants: true}) columnTemplates: QueryList<NgxGnsGridColumnComponent>;

  @Output('stateChange') stateChange: EventEmitter<GridState> = new EventEmitter<GridState>();
  @Output('filterChange') filterChange: EventEmitter<Map<string, any>> = new EventEmitter<Map<string, any>>();
  @Output('sortChange') sortChange: EventEmitter<Map<string, string>> = new EventEmitter<Map<string, string>>();
  @Output('pageChange') pageChange: EventEmitter<GridPagination> = new EventEmitter<GridPagination>();
  @Output('selectionChange') selectionChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(public ngxGnsGridStateService: NgxGnsGridStateService, public ngxGnsGridService: NgxGnsGridService) {
  }

  ngOnInit() {
    this.stateSubscription = this.ngxGnsGridService.stateObservable$.subscribe((value => {
      this.ngxGnsGridStateService.filter = value.filter;
      this.state.filter = value.filter;
      this.ngxGnsGridStateService.sort = value.sort;
      this.state.sort = value.sort;
      const pagination: GridPagination = new GridPagination();
      pagination.pageIndex = value.pageIndex;
      pagination.pageSize = value.pageSize;
      pagination.total = value.total;
      this.state.pageIndex = value.pageIndex;
      this.state.pageSize = value.pageSize;
      this.state.total = value.total;
      this.ngxGnsGridStateService.pagination = pagination;
      this.preserveSelection();
      if (this.ngxGnsGridService.isClientSide) {
        this.processData();
      }
    }));

    this.filterSubscription = this.ngxGnsGridService.filterObservable$.subscribe((value => {
      this.state.pageIndex = 1;
      this.state.filter = value;
      this.filterChange.emit(value);
      this.ngxGnsGridService.stateObservable$.next(this.state);
      this.stateChange.emit(this.state);
    }));

    this.sortSubscription = this.ngxGnsGridService.sortObservable$.subscribe((value => {
      this.state.pageIndex = 1;
      this.state.sort = value;
      this.sortChange.emit(value);
      this.ngxGnsGridService.stateObservable$.next(this.state);
      this.stateChange.emit(this.state);
    }));

    this.paginationSubscription = this.ngxGnsGridService.paginationObservable$.subscribe((value => {
      this.selection = new SelectionModel<Element>(this.ngxGnsGridService.selectableConfig.multiple, []);
      this.state.pageIndex = value.pageIndex;
      this.state.pageSize = value.pageSize;
      this.state.total = value.total;
      this.pageChange.emit(value);
      this.ngxGnsGridService.stateObservable$.next(this.state);
      this.stateChange.emit(this.state);
    }));

    this.preserveSelection();
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }
    if (this.paginationSubscription) {
      this.paginationSubscription.unsubscribe();
    }
  }

  private processData() {
    const result = GridUtils.process([...this.ngxGnsGridService.dataSource], this.state, this.ngxGnsGridService.columnDef);
    this.ngxGnsGridService.localDataSource = result.data;
    this.state.total = result.state.total;
  }

  onSortChange(event: GridSort) {
    this.state.sort = new Map<string, string>();
    if (event.direction) {
      this.state.sort[event.field] = event.direction;
    }
    this.ngxGnsGridService.sortObservable$.next(this.state.sort);
  }

  stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onPageChange(event: number) {
    const pagination = new GridPagination();
    pagination.pageIndex = event;
    pagination.pageSize = this.state.pageSize;
    pagination.total = this.state.total;
    this.ngxGnsGridService.paginationObservable$.next(pagination);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.ngxGnsGridService.selection.selected.length;
    const numRows = this.ngxGnsGridService.localDataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.ngxGnsGridService.selection.clear() :
      this.ngxGnsGridService.localDataSource.forEach(row => {
        this.ngxGnsGridService.selection.select(row);
      });
    this.onSelectionChange();
  }

  onSelectionChange() {
    setTimeout(() => {
      if (this.ngxGnsGridService.selectableConfig.columnId) {
        this.ngxGnsGridService.selectedKeys = this.ngxGnsGridService.selection.selected.map(o => o[this.ngxGnsGridService.selectableConfig.columnId]);
      } else {
        this.ngxGnsGridService.selectedKeys = this.ngxGnsGridService.selection.selected;
      }
      this.selectionChange.emit(this.ngxGnsGridService.selection.selected);
      this.selectedKeysChange.emit(this.ngxGnsGridService.selectedKeys);
    });
  }

  private preserveSelection = () => {
    if (this.ngxGnsGridService.selectableConfig.columnId) {
      this.ngxGnsGridService.localDataSource.forEach((object) => {
        if (this.ngxGnsGridService.selectedKeys.indexOf(object[this.ngxGnsGridService.selectableConfig.columnId]) > -1) {
          this.ngxGnsGridService.selection.select(object);
        }
      });
    } else {
      this.ngxGnsGridService.selectedKeys.forEach((object) => {
        const findObject = this.ngxGnsGridService.localDataSource.find(o => JSON.stringify(o) === JSON.stringify(object));
        if (findObject && !this.ngxGnsGridService.selection.isSelected(findObject)) {
          this.ngxGnsGridService.selection.select(findObject);
        }
      });
    }
  };

}
