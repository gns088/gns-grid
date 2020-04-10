import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GridColumnFilterDef, GridStateFilter } from '../../types';
import { NgxGnsGridService } from '../../services/ngx-gns-grid.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-mat-grid-list-filter',
  templateUrl: './mat-grid-list-filter.component.html',
  styleUrls: ['./mat-grid-list-filter.component.scss']
})
export class MatGridListFilterComponent implements OnInit, OnDestroy {

  private _filterDetails: GridColumnFilterDef = new GridColumnFilterDef();
  private _id: string;
  private _filter: GridStateFilter[] = [];

  @Input('type') type: 'singleSelect' | 'multiSelect' = 'singleSelect';

  @Input()
  get filter(): GridStateFilter[] {
    return this._filter;
  }

  set filter(value: GridStateFilter[]) {
    this._filter = value;
  }

  @Input()
  get id(): string {
    return this._id;
  }


  set id(value: string) {
    this._id = value;
  }

  @Input()
  get filterDetails(): GridColumnFilterDef {
    return this._filterDetails;
  }

  set filterDetails(value: GridColumnFilterDef) {
    this._filterDetails = value;
  }

  private subscription: Subscription;
  public value: any;

  constructor(public ngxGnsGridService: NgxGnsGridService) {
  }

  ngOnInit() {
    this.subscription = this.ngxGnsGridService.stateObservable$.subscribe((state) => {
      if (!this.ngxGnsGridService.getGridFilterById(this.filter, this.id)) {
        this.value = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onChange() {
    if (this.filterDetails.type === 'multiSelect' && (this.value && this.value.length === 0)) {
      this.value = null;
    }
    this.filter = this.ngxGnsGridService.setGridFilterById(this.filter, this.id, this.value);
    this.ngxGnsGridService.filterObservable$.next(this.filter);
  }
}
