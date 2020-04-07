import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { GridSort, GridState, SortDirection } from '../types';

const rotate: { [key: string]: SortDirection } = {
  'asc': 'desc',
  'desc': '',
  '': 'asc'
};
const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  field: string;
  direction: SortDirection;
}

@Directive({
  selector: '[sortable]',
  host: {
    '[class.asc]': 'state.sort[sortable] === "asc"',
    '[class.desc]': 'state.sort[sortable] === "desc"',
    '(click)': 'allowSort && rotate()'
  }
})
export class GridSortColumnDirective {

  @Input() state: GridState;
  @Input() multiple: boolean = false;
  @Input() sortable: string = '';
  @Input() allowSort: boolean;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<GridSort>();

  rotate() {
    this.direction = rotate[this.state.sort[this.sortable]];
    if (!this.state.sort[this.sortable]) {
      this.direction = rotate[''];
    }
    this.state.sort[this.sortable] = this.direction;
    this.sort.emit({field: this.sortable, direction: this.direction});
  }

}
