import { NgModule } from '@angular/core';
import { NgxGnsGridComponent } from './ngx-gns-grid/ngx-gns-grid.component';
import { ReduceValuePipe } from './pipes/reduce-value.pipe';
import { CommonModule } from '@angular/common';
import { GridSortColumnDirective } from './directives/grid-sort-column.directive';


@NgModule({
  imports: [CommonModule],
  declarations: [NgxGnsGridComponent, ReduceValuePipe, GridSortColumnDirective],
  exports: [NgxGnsGridComponent],
})
export class GnsGridModule {
}
