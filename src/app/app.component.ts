import { Component } from '@angular/core';
import { GridColumnDef } from '../../projects/gns-grid/src/lib/types';

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
        append: 'fa fa-user-circle',
        type: 'singleSelect',
        placeholder: 'Search',
        listValue: [1, 2, 3, 4, 5, 6, 7, 8, 10]
      }
    },
    {
      id: 'first',
      headerTitle: 'First',
      filterDetails: {
        range: true,
        type: 'date',
        placeholder: 'Search'
      }
    },
    {
      id: 'last',
      headerTitle: 'Last'
    },
    {
      id: 'handle',
      headerTitle: 'Handle'
    }
  ];
  dataSource: any[] = [];

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
}
