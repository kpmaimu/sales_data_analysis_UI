import { Component, OnInit, Pipe, PipeTransform } from "@angular/core";
import { SentimentService } from "../services/sentiment.service";
import { SharingService } from "../services/sharing.services";
@Component({
  selector: "app-sentiment",
  templateUrl: "./sentiment.component.html",
  styleUrls: ["./sentiment.component.css"]
})
export class SentimentComponent implements OnInit {
  sentimentData: any;

  constructor(
    private sentimentService: SentimentService,
    private sharingService: SharingService
  ) {}

  ngOnInit() {
    // this.sentimentService.sentimentReport("Category").subscribe(
    //   (res) => {
    //     this.sentimentData = res['data'];
    //     console.log(res);
    //   });
    let reportData = this.sharingService.getReportsData();
    this.sentimentData = reportData["sentimentCategory"];
  }
  filterSentiment(filter: any) {
    let reportData = this.sharingService.getReportsData();
    switch (filter) {
      case "Category":
        this.sentimentData = reportData["sentimentCategory"];
        break;
      case "Product Name":
        this.sentimentData = reportData["sentimentProduct"];
        break;
      case "Sub-Category":
        this.sentimentData = reportData["sentimentSubcategory"];
        break;
      default:
        this.sentimentData = reportData["sentimentCategory"];
        break;
    }
    // this.sentimentService.sentimentReport(filter).subscribe(
    //   (res) => {
    //     this.sentimentData = res['data'];
    //     console.log(this.sentimentData);
    //   });
  }
}
