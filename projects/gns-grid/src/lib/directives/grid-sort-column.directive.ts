import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { GridState, SortableConfig, SortDirection } from '../types';
import { NgxGnsGridService } from '../services/ngx-gns-grid.service';
import { Subscription } from 'rxjs';

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
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'sortable.enable && rotate()'
  }
})
export class GridSortColumnDirective implements OnInit, OnDestroy {

  private _state: GridState;
  @Input('state')
  get state(): GridState {
    return this._state;
  }

  set state(value: GridState) {
    this._state = value;
  }

  @Input() multiple: boolean = false;
  @Input() field: string = '';
  @Input() sortable: SortableConfig;
  @Input() direction: SortDirection = '';
  private subscription: Subscription;

  constructor(private ngxGnsGridService: NgxGnsGridService) {
  }

  ngOnInit(): void {
    if (this.sortable.enable) {
      this.subscription = this.ngxGnsGridService.stateObservable$.subscribe((state) => {
        if (!this.ngxGnsGridService.getGridSortById(this.state.sort, this.field)) {
          this.direction = '';
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  rotate() {
    const sortObject = this.ngxGnsGridService.getGridSortById(this.state.sort, this.field);
    if (sortObject) {
      this.direction = rotate[sortObject.direction];
    } else {
      this.direction = rotate[''];
    }
    if (!this.sortable.multiple) {
      this.state.sort = [];
    }
    this.state.sort = this.ngxGnsGridService.setGridSortById(this.state.sort, this.field, this.direction);
    this.ngxGnsGridService.sortObservable$.next(this.state.sort);
  }

}
