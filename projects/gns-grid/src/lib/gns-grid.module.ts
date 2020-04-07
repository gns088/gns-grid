import { NgModule } from '@angular/core';
import { NgxGnsGridComponent } from './ngx-gns-grid/ngx-gns-grid.component';
import { ReduceValuePipe } from './pipes/reduce-value.pipe';
import { CommonModule } from '@angular/common';
import { GridSortColumnDirective } from './directives/grid-sort-column.directive';
import { MatGridStringFilterComponent } from './component/mat-grid-string-filter/mat-grid-string-filter.component';
import { MatGridNumberFilterComponent } from './component/mat-grid-number-filter/mat-grid-number-filter.component';
import { MatGridListFilterComponent } from './component/mat-grid-list-filter/mat-grid-list-filter.component';
import { MatGridFilterStateComponent } from './component/mat-grid-filter-state/mat-grid-filter-state.component';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbPaginationModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { GridDateRangeFilterComponent } from './component/mat-grid-date-filter/grid-date-range-filter/grid-date-range-filter.component';
import { GridDateFilterComponent } from './component/mat-grid-date-filter/grid-date-filter/grid-date-filter.component';
import { NgxGnsGridColumnDirective } from './directives/ngx-gns-grid-column.directive';
import { NgxGnsGridColumnComponent } from './template-components/ngx-gns-grid-column/ngx-gns-grid-column.component';

const filterComponents = [
  MatGridFilterStateComponent,
  MatGridStringFilterComponent,
  MatGridNumberFilterComponent,
  MatGridListFilterComponent,
  GridDateRangeFilterComponent,
  GridDateFilterComponent
];
const COMPONENTS_EXPORT = [NgxGnsGridComponent, NgxGnsGridColumnDirective, NgxGnsGridColumnComponent];
const COMPONENTS_ENTRY = [];
const COMPONENTS = [...COMPONENTS_EXPORT, ...COMPONENTS_ENTRY,
  filterComponents, ReduceValuePipe, GridSortColumnDirective];

const MODULES_EXPORT = [];
const MODULES = [...MODULES_EXPORT,
  CommonModule,
  FormsModule,
  NgSelectModule,
  NgbDropdownModule,
  NgbPaginationModule,
  NgbDatepickerModule,
  NgbTimepickerModule
];

@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS_ENTRY],
  imports: [...MODULES],
  exports: [...MODULES_EXPORT, ...COMPONENTS_EXPORT]
})
export class GnsGridModule {
}
