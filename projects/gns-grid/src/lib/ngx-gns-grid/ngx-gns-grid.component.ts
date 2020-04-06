import { Component, OnInit } from '@angular/core';
import { NgxGnsGridService } from '../services/ngx-gns-grid.service';

@Component({
  selector: 'ngx-gns-grid',
  templateUrl: './ngx-gns-grid.component.html',
  styleUrls: ['./ngx-gns-grid.component.css'],
  providers: [NgxGnsGridService]
})
export class NgxGnsGridComponent implements OnInit {

  constructor(public ngxGnsGridService: NgxGnsGridService) {
  }

  ngOnInit() {
  }

}
