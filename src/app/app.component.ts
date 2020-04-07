import { Component } from '@angular/core';
import { GridColumnDef, GridConfig, GridState } from '../../projects/gns-grid/src/lib/types';
import { GridPaginationConfig } from '../../projects/gns-grid/src/lib/types/grid-pagination-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gns-grid-lib';
  columns: GridColumnDef[] = [
    {
      id: 'id',
      headerTitle: '#',
      width: 300,
      filterDetails: {
        icon: true,
        append: 'fa fa-search',
        type: 'multiSelect',
        placeholder: 'Search',
        listValue: [1, 2, 3, 4, 5, 6, 7, 8]
      }
    },
    {
      id: 'first',
      headerTitle: 'First',
      filterDetails: {
        icon: true,
        range: true,
        append: 'fa fa-search',
        type: 'date',
        placeholder: 'Search',
      }
    },
    {
      id: 'last',
      headerTitle: 'Last'
    },
    {
      id: 'handle',
      headerTitle: 'Handle'
    },
    {
      id: 'action',
      headerTitle: 'Action',
      sortable: false,
      filterable: false,
      width: 110
    }
  ];
  dataSource: any[] = [];
  gridConfig: GridConfig = {};
  paginationConfig: GridPaginationConfig = {
    align: 'end',
    position: 'top'
  };
  state: GridState = new GridState();

  constructor() {
    const length = 20;
    for (let i = 1; i <= length; i++) {
      this.dataSource.push({
        id: i,
        first: 'Mark' + i,
        last: 'Otto',
        handle: 'mdo',
      });
    }
    this.dataSource = [...this.dataSource];
  }

  onReset(): void {
    this.state = new GridState();
  }

  onCloseClick(dataItem): void {
    alert('hello, ' + dataItem.first);
    console.log(dataItem);
  }

  onStateChange(event) {
    console.log(event);
  }
}
