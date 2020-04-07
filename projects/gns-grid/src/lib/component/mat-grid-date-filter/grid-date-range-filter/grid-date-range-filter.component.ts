import { Component, Input, OnInit } from '@angular/core';
import { GridColumnFilterDef } from '../../../types';
import { NgxGnsGridService } from '../../../services/ngx-gns-grid.service';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-grid-date-range-filter',
  templateUrl: './grid-date-range-filter.component.html',
  styleUrls: ['./grid-date-range-filter.component.scss']
})
export class GridDateRangeFilterComponent implements OnInit {

  private _filterDetails: GridColumnFilterDef = new GridColumnFilterDef();
  private _id: string;
  private _filter: Map<string, any> = new Map<string, any>();

  @Input('type') type: 'date' | 'dateTime' | 'time' = 'date';
  @Input('range') range: boolean = true;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

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

  constructor(public matGridService: NgxGnsGridService, private calendar: NgbCalendar,
              public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    if (!this.filterDetails.icon && !this.filterDetails.append) {
      this.filterDetails.icon = true;
      this.filterDetails.append = 'fa fa-calendar';
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input?: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  onChange() {
    setTimeout(() => {
      if (this.fromDate && this.toDate) {
        this.filter[this.id] = [
          new Date(`${this.fromDate.month}/${this.fromDate.day}/${this.fromDate.year}`).toISOString(),
          new Date(`${this.toDate.month}/${this.toDate.day}/${this.toDate.year}`).toISOString()
        ];
        this.matGridService.filterObservable$.next(this.filter);
      }
    });
  }
}
