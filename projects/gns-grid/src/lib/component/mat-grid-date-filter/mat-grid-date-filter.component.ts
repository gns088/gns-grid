import { Component, Input, OnInit } from '@angular/core';
import { GridColumnFilterDef } from '../../types';
import { NgxGnsGridService } from '../../services/ngx-gns-grid.service';

@Component({
  selector: 'ngx-mat-grid-date-filter',
  templateUrl: './mat-grid-date-filter.component.html',
  styleUrls: ['./mat-grid-date-filter.component.scss']
})
export class MatGridDateFilterComponent implements OnInit {

  private _filterDetails: GridColumnFilterDef = new GridColumnFilterDef();
  private _id: string;
  private _filter: Map<string, any> = new Map<string, any>();

  @Input('type') type: 'date' | 'dateTime' | 'time' = 'date';
  @Input('range') range: boolean = true;

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
  }

  onValueChange(event) {
    this.filter[this.id]['date'] = event;
  }

  onInitFilter() {
    if (!this.filter[this.id]) {
      this.filter[this.id] = new Map<string, any>();
    }
  }

  onChange() {
    setTimeout(() => {
      this.matGridService.filterObservable$.next(this.filter);
    });
  }
}
