import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharingService } from '../services/sharing.services';
import { ReportService } from '../services/report.services';
import { Chart } from "chart.js";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  myDate = new Date();
  chartData: any;
  
  summaryData : string[];
  least_amount_customer: string;
  title : string = 'Line chart';
  LineChart: any = [];
  category: any = [];
  categoryCount: any = [];
  bgColor = ["#878BB6", "#FFEA88", "#FF8153", "#4ACAB4", "#c0504d", "#8064a2", "#772c2a", "#f2ab71", "#2ab881", "#4f81bd", "#2c4d75"];
  constructor(private sharingService:SharingService, private reportService: ReportService) { }

  ngOnInit() {
    //this.summaryData = this.sharingService.getData() as string [];
    console.log('this.summaryData');  
    let reportsData = this.sharingService.getReportsData();
    console.log(reportsData);  
    this.summaryData = reportsData['summary'];
    console.log(this.summaryData);  

    let chartCategoryData = this.convertToArray(
      reportsData["chartCategory"],
      "Count",
      "Category"
    );
    console.log(chartCategoryData);
    this.category = chartCategoryData["Category"];
    this.categoryCount = chartCategoryData["Count"];
    this.drawChart();
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

    drawChart() {
      console.log(this.category);
      console.log(this.categoryCount);
      this.LineChart = new Chart("lineChart", {
        type: "bar",
        data: {
          labels: this.category,
          datasets: [
            {
              label: "Number of items sold in month",
              data: this.categoryCount,
              backgroundColor: this.bgColor,
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
    convertToArray(data: any, arr1: string, arr2: string): any {
      console.log(data);
      let dataJson: any = {};
      let valX: any = [];
      let valY: any = [];
      data.forEach(element => {
        valX.push(element[arr1]);
        valY.push(element[arr2]);
      });
      dataJson = { [arr1]: valX, [arr2]: valY };
      return dataJson;
    }

}
