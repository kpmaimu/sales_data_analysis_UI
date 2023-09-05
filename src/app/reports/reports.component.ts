import { Component, OnInit } from "@angular/core";
import { ReportService } from "../services/report.services";
import { Chart } from "chart.js";
import { SharingService } from "../services/sharing.services";
@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"]
})
export class ReportsComponent implements OnInit {
  LineChart: any = [];
  category: any = [];
  categoryCount: any = [];
  bgColor = ["#878BB6", "#FFEA88", "#FF8153", "#4ACAB4", "#c0504d", "#8064a2", "#772c2a", "#f2ab71", "#2ab881", "#4f81bd", "#2c4d75"];
  constructor(
    private reportService: ReportService,
    private sharingService: SharingService
  ) {}

  ngOnInit() {
    let reportsData = this.sharingService.getReportsData();
    console.log(reportsData);
    let chartCategoryData = this.convertToArray(
      reportsData["chartCategory"],
      "Count",
      "Category"
    );
    console.log(chartCategoryData);
    this.category = chartCategoryData["Category"];
    this.categoryCount = chartCategoryData["Count"];
    this.drawChart();

    let chartSubCategoryData = this.convertToArray(
      reportsData["chartSubCategory"],
      "Count",
      "Sub-Category"
    );
    this.category = chartSubCategoryData["Sub-Category"];
    this.categoryCount = chartSubCategoryData["Count"];
    this.drawChartSubCategory();

    let chartRegionData = this.convertToArray(
      reportsData["chartRegion"],
      "Count",
      "Region"
    );
    // Pie chart
    this.drawChartRegion(chartRegionData);

    let chartMonthData = this.convertToArray(
      reportsData["chartMonth"],
      "month",
      "averageSale"
    );
    this.drawChartMonth(chartMonthData);

    // this.reportService.categoryReport('Sub-Category').subscribe(
    //   (res)=>{
    //       console.log(res);
    //       console.log(res['data']);
    //       this.category =  res['data']['Sub-Category'];
    //       this.categoryCount =  res['data']['Count'];
    //       this.drawChartSubCategory();
    //   },

    //   (error)=>{
    //     console.log("Error")
    //   }

    // )
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
            label: "Number of items sold in month(Category wise)",
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
  drawChartSubCategory() {
    console.log(this.category);
    console.log(this.categoryCount);
    this.LineChart = new Chart("lineChartSubCat", {
      type: "bar",
      data: {
        labels: this.category,
        datasets: [
          {
            label: "Number of items sold in month(Sub Category wise)",
            data: this.categoryCount,
            backgroundColor: this.bgColor,
            borderColor: null,
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
  drawChartRegion(chartData: any) {
    let data = {
      
      datasets: [
        {
          label: "Number of items sold in month",
          data: chartData["Count"],
          backgroundColor: ["#f38b4a", "#56d798", "#ff8397", "#6970d5"],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)"              
            ],
            borderWidth: 1
        }
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: chartData["Region"]
    };
    // For a pie chart
    var myPieChart = new Chart("pieChart", {
      type: "pie",
      data: data,
      options: {
        title: {
          display: true,
          text: 'Region wise sales',
          fontSize: 15
      }
      }
    });
  }
  drawChartMonth(chartData: any) {
    this.LineChart = new Chart("lineChartMonth", {
      type: "line",
      data: {
        labels: chartData["month"],
        datasets: [
          {
            label: "Monthly Sale(in dollars)",
            data: chartData["averageSale"],
            backgroundColor: [
              "#aa44dd"              
            ],
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
