import { Component, Input, OnInit } from '@angular/core';
import { NgxGnsGridService } from '../../services/ngx-gns-grid.service';
import { GridColumnFilterDef } from '../../types';

@Component({
  selector: 'ngx-mat-grid-number-filter',
  templateUrl: './mat-grid-number-filter.component.html',
  styleUrls: ['./mat-grid-number-filter.component.scss']
})
export class MatGridNumberFilterComponent implements OnInit {

  private _filterDetails: GridColumnFilterDef = new GridColumnFilterDef();
  private _id: string;
  private _filter: Map<string, any>;

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

  constructor(public ngxMatGridService: NgxGnsGridService) {
  }

  ngOnInit() {
  }

  onChange() {
    this.ngxMatGridService.filterObservable$.next(this.filter);
  }
}
