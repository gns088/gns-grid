import { AfterViewInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NgxGnsGridColumnDirective } from '../../directives/ngx-gns-grid-column.directive';

@Component({selector: 'ngx-gns-grid-column', template: ''})
export class NgxGnsGridColumnComponent implements AfterViewInit {

  @Input() field: string;
  @ContentChild(NgxGnsGridColumnDirective, {static: false}) columnTemplate: TemplateRef<NgxGnsGridColumnDirective>;

  constructor() {
  }

  ngAfterViewInit() {
    console.log('NgxGnsGridColumnComponent');
    console.log(this.field);
    console.log(this.columnTemplate);
  }

}
