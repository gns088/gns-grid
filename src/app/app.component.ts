import { Component } from '@angular/core';
import { GridCellClickEvent, GridColumnDef, GridConfig, GridRowClickEvent, GridState } from '../../projects/gns-grid/src/lib/types';
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
      width: 200,
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
      filterable: true,
      width: 110
    }
  ];
  dataSource: any[] = [];
  selectedKeys: any[] = [1, 3];
  gridConfig: GridConfig = {
    footerClass: 'bg-primary',
    footerCellClassFn: column => {
      return column.id === 'first' ? 'bg-danger' : '';
    }
    // headerRowClass: 'bg-primary text-white',
    // headerFilterRowClass: 'bg-secondary',
    // bodyClass: 'bg-info shadow',
    // rowClassFn: (dateItem, index) => {
    //   if (dateItem.first === 'Mark3') {
    //     return 'bg-danger';
    //   }
    //   return null;
    // }
  };
  paginationConfig: GridPaginationConfig = {
    position: 'bottom',
    align: 'end'
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

  onCloseClick(dataItem, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    console.log(dataItem);
    alert('hello, ' + dataItem.first);
  }

  onStateChange(event) {
    console.log(event);
  }

  onRowClick(event: GridRowClickEvent): void {
    console.log(event);
  }

  onCellClick(event: GridCellClickEvent): void {
    // console.log(event);
  }

  onSelectionChange(event) {
    // console.log(event);
    // this.selectedKeys = event;
  }

  onSelectedKeysChange(event) {
    this.selectedKeys = event;
    console.log(this.selectedKeys);
  }
}
