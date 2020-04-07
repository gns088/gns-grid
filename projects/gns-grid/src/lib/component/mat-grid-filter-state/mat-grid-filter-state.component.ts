import { Component, Input } from '@angular/core';
import { GridColumnDef, GridState } from '../../types';

@Component({
  selector: 'ngx-mat-grid-filter-state',
  templateUrl: './mat-grid-filter-state.component.html',
  styleUrls: ['./mat-grid-filter-state.component.scss']
})
export class MatGridFilterStateComponent {

  private _column: GridColumnDef = new GridColumnDef();

  @Input()
  get column(): GridColumnDef {
    return this._column;
  }

  set column(value: GridColumnDef) {
    this._column = value;
  }

  private _state: GridState;

  @Input()
  get state(): GridState {
    return this._state;
  }

  set state(value: GridState) {
    this._state = value;
  }

  private _isClientSide: boolean;

  @Input()
  get isClientSide(): boolean {
    return this._isClientSide;
  }

  set isClientSide(value: boolean) {
    this._isClientSide = value;
  }
}
