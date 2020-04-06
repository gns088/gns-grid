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
      width: 100
    },
    {
      id: 'first',
      headerTitle: 'First'
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
  dataSource: any[] = [
    {
      id: '1',
      first: 'Mark',
      last: 'Otto',
      handle: 'mdo',
    },
    {
      id: '2',
      first: 'Mark',
      last: 'Otto',
      handle: 'mdo',
    },
    {
      id: '3',
      first: 'Mark',
      last: 'Otto',
      handle: 'mdo',
    },
    {
      id: '4',
      first: 'Mark',
      last: 'Otto',
      handle: 'mdo',
    }
  ];
}
