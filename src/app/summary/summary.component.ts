import { Component, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.services';
import { Chart } from 'chart.js';
import {ReportService} from '../services/report.services';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  chartData: any;
  summaryData : string[];
  least_amount_customer: string;
  title : string = 'Line chart';
  LineChart: any = [];
  category: any = [];
  categoryCount: any = [];
  constructor(private sharingService:SharingService, private reportService: ReportService) { }

  ngOnInit() {
    //this.summaryData = this.sharingService.getData() as string [];
    console.log('this.summaryData');  
    let reportsData = this.sharingService.getReportsData();
    console.log(reportsData);  
    this.summaryData = reportsData['summary'];
    console.log(this.summaryData);  
  }
  
  
  filterChart(filter: any){
    this.reportService.categoryReport(filter).subscribe(
      (res) => {
        this.chartData = res['data'];
        console.log(this.chartData);  
      });
    }
    getMonthFromId(monthId: any){
      console.log(monthId);
      let months = ['Janunary', 'February','March','April','May','June','July','August','September','October','November','December'];
      return(months[monthId+1]);
    }
}
