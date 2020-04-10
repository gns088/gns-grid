import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GridColumnFilterDef, GridStateFilter } from '../../../types';
import { NgxGnsGridService } from '../../../services/ngx-gns-grid.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-grid-date-filter',
  templateUrl: './grid-date-filter.component.html',
  styleUrls: ['./grid-date-filter.component.scss']
})
export class GridDateFilterComponent implements OnInit, OnDestroy {

  private _filterDetails: GridColumnFilterDef = new GridColumnFilterDef();
  private _id: string;
  private _filter: GridStateFilter[] = [];

  @Input('type') type: 'date' | 'dateTime' | 'time' = 'date';
  @Input('range') range: boolean = true;
  fromDate: NgbDate;

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

  constructor(public ngxGnsGridService: NgxGnsGridService) {
  }

  ngOnInit() {
    if (!this.filterDetails.icon && !this.filterDetails.append) {
      this.filterDetails.icon = true;
      this.filterDetails.append = 'fa fa-calendar';
    }

    this.subscription = this.ngxGnsGridService.stateObservable$.subscribe((state) => {
      if (!state.filter.find(o => o.field === this.id)) {
        this.fromDate = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onChange() {
    setTimeout(() => {
      const value = new Date(`${this.fromDate.month}/${this.fromDate.day}/${this.fromDate.year}`).toISOString();
      this.filter = this.ngxGnsGridService.setGridFilterById(this.filter, this.id, value);
      this.ngxGnsGridService.filterObservable$.next(this.filter);
    });
  }
}
