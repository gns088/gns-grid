import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[ngxGridSortColumn][grid-sort-header]'
})
export class GridSortColumnDirective implements OnInit {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    console.log('inint')
    console.log(this.elementRef);
  }
}
