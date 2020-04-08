import { Pipe, PipeTransform, QueryList } from '@angular/core';
import { NgxGnsGridColumnComponent } from '../template-components/ngx-gns-grid-column/ngx-gns-grid-column.component';
import { GridColumnDef } from '../types';

@Pipe({
  name: 'findColumnTemplate'
})
export class FindColumnTemplatePipe implements PipeTransform {

  transform(field: GridColumnDef, columnTemplates: QueryList<NgxGnsGridColumnComponent>, type: 'cell' | 'filter' | 'footer'): any {
    const findObj = (columnTemplates || []).find(d => d.id === field.id);
    if (findObj) {
      switch (type) {
        case 'cell':
          if (!findObj.cellTemplate || (findObj.cellTemplate && !findObj.cellTemplate.templateRef)) {
            return null;
          }
          return findObj.cellTemplate.templateRef;
        case 'filter':
          if (!findObj.filterTemplate || (findObj.filterTemplate && !findObj.filterTemplate.templateRef)) {
            return null;
          }
          return findObj.filterTemplate.templateRef;
        case 'footer':
          if (!findObj.footerTemplate || (findObj.footerTemplate && !findObj.footerTemplate.templateRef)) {
            return null;
          }
          return findObj.footerTemplate.templateRef;
      }
    }
    return null;
  }

}
