import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[ngx-gns-grid-column]'
})
export class NgxGnsGridColumnDirective {

  @Input('field') field: string;

  constructor(public templateRef: TemplateRef<string>) {
  }
}
