import { Component, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  activeLink : string = 'dashboard';
  constructor(
    private sharingService: SharingService
  ) { }

  ngOnInit() {
    console.log(localStorage.getItem('access_token'));
    console.log("db component");
    this.sharingService.getReportsData();
  }

  whichIsActiveLink(link: any){
    console.log(link);
    this.activeLink = link;
  }

}
