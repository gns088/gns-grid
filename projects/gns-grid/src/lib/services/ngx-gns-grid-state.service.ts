import { Injectable } from '@angular/core';
import { GridPagination, GridState, GridStateFilter, GridStateSort } from '../types';

@Injectable()
export class NgxGnsGridStateService {
  private _state: GridState = new GridState();
  private _filter: GridStateFilter[] = [];
  private _sort: GridStateSort[] = [];
  private _pagination: GridPagination = new GridPagination();

  get state(): GridState {
    return this._state;
  }

  set state(value: GridState) {
    if (!value.filter) {
      value.filter = [];
    }
    if (!value.sort) {
      value.sort = [];
    }
    this._state = value;
  }

  get filter(): GridStateFilter[] {
    return this._filter;
  }

  set filter(value: GridStateFilter[]) {
    this._filter = value;
  }

  get sort(): GridStateSort[] {
    return this._sort;
  }

  set sort(value: GridStateSort[]) {
    this._sort = value;
  }

  get pagination(): GridPagination {
    return this._pagination;
  }

  set pagination(value: GridPagination) {
    this._pagination = value;
  }
}
