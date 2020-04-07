import { Component, Input, OnInit } from '@angular/core';
import { GridColumnFilterDef } from '../../types';
import { NgxGnsGridService } from '../../services/ngx-gns-grid.service';

@Component({
  selector: 'ngx-mat-grid-list-filter',
  templateUrl: './mat-grid-list-filter.component.html',
  styleUrls: ['./mat-grid-list-filter.component.scss']
})
export class MatGridListFilterComponent implements OnInit {

  private _filterDetails: GridColumnFilterDef = new GridColumnFilterDef();
  private _id: string;
  private _filter: Map<string, any>;

  @Input('type') type: 'singleSelect' | 'multiSelect' = 'singleSelect';

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
