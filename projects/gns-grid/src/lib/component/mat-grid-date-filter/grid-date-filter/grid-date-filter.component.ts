import { Component, Input, OnInit } from '@angular/core';
import { GridColumnFilterDef } from '../../../types';
import { NgxGnsGridService } from '../../../services/ngx-gns-grid.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-grid-date-filter',
  templateUrl: './grid-date-filter.component.html',
  styleUrls: ['./grid-date-filter.component.scss']
})
export class GridDateFilterComponent implements OnInit {

  private _filterDetails: GridColumnFilterDef = new GridColumnFilterDef();
  private _id: string;
  private _filter: Map<string, any> = new Map<string, any>();

  @Input('type') type: 'date' | 'dateTime' | 'time' = 'date';
  @Input('range') range: boolean = true;
  fromDate: NgbDate;

  @Input()
  get filter(): Map<string, any> {
    return this._filter;
  }

  set filter(value: Map<string, any>) {
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

  constructor(public matGridService: NgxGnsGridService) {
  }

  ngOnInit() {
    if (!this.filterDetails.icon && !this.filterDetails.append) {
      this.filterDetails.icon = true;
      this.filterDetails.append = 'fa fa-calendar';
    }
  }

  onChange() {
    setTimeout(() => {
      this.filter[this.id] = new Date(`${this.fromDate.month}/${this.fromDate.day}/${this.fromDate.year}`).toISOString();
      this.matGridService.filterObservable$.next(this.filter);
    });
  }
}
