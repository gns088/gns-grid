import { Injectable } from '@angular/core';
import { GridPagination, GridState } from '../types';

@Injectable()
export class NgxGnsGridStateService {
  private _state: GridState = new GridState();
  private _filter: Map<string, any> = new Map<string, any>();
  private _sort: Map<string, string> = new Map<string, string>();
  private _pagination: GridPagination = new GridPagination();

  get state(): GridState {
    return this._state;
  }

  set state(value: GridState) {
    this._state = value;
  }

  get filter(): Map<string, any> {
    return this._filter;
  }

  set filter(value: Map<string, any>) {
    this._filter = value;
  }

  get sort(): Map<string, string> {
    return this._sort;
  }

  set sort(value: Map<string, string>) {
    this._sort = value;
  }

  get pagination(): GridPagination {
    return this._pagination;
  }

  set pagination(value: GridPagination) {
    this._pagination = value;
  }
}
