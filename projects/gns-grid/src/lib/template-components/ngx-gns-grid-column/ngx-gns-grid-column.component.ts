import { Component, ContentChild, Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[ngxGnsGridColumnCellTemplate]'
})
export class NgxGnsGridColumnCellTemplateDirective {
  constructor(public templateRef: TemplateRef<NgxGnsGridColumnCellTemplateDirective>) {
  }
}

@Directive({
  selector: 'ng-template[ngxGnsGridColumnFilterTemplate]'
})
export class NgxGnsGridColumnFilterTemplateDirective {
  constructor(public templateRef: TemplateRef<NgxGnsGridColumnFilterTemplateDirective>) {
  }
}

@Directive({
  selector: 'ng-template[ngxGnsGridColumnFooterTemplate]'
})
export class NgxGnsGridColumnFooterTemplateDirective {
  constructor(public templateRef: TemplateRef<NgxGnsGridColumnFooterTemplateDirective>) {
  }
}


@Component({selector: 'ngx-gns-grid-column', template: ''})
export class NgxGnsGridColumnComponent {

  @Input() id: string;
  @ContentChild(NgxGnsGridColumnCellTemplateDirective, {static: false}) cellTemplate: TemplateRef<NgxGnsGridColumnCellTemplateDirective>;
  @ContentChild(NgxGnsGridColumnFilterTemplateDirective, {static: false}) filterTemplate: TemplateRef<NgxGnsGridColumnFilterTemplateDirective>;
  @ContentChild(NgxGnsGridColumnFooterTemplateDirective, {static: false}) footerTemplate: TemplateRef<NgxGnsGridColumnFooterTemplateDirective>;

  constructor() {
  }

}
