import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[ngxGnsGridColumnTemplate]'
})
export class NgxGnsGridColumnDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
