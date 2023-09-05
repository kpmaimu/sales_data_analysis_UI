import { Component, OnInit, Inject } from "@angular/core";
import { FileUploadService } from "../services/file-upload.service";
import { Router } from "@angular/router";
import { SharingService } from "../services/sharing.services";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogComponent } from "../dialog/dialog.component";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-import",
  templateUrl: "./import.component.html",
  styleUrls: ["./import.component.css"]
})
export class ImportComponent implements OnInit {
  fileToUpload: File = null;
  selectedFilename: string = "Choose file";
  uploadErrorMessage: string = "";
  uploadingStatus: boolean = null;
  summary: any;
  uploadedFileList: any;
  constructor(
    private fileUploadService: FileUploadService,
    private router: Router,
    private sharingService: SharingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getUploadedFileList();
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.selectedFilename = this.fileToUpload.name;
    this.uploadErrorMessage = "";
    console.log(this.selectedFilename.split(".").pop());
    if (this.selectedFilename.split(".").pop() != "xlsx") {
      console.log("Invalid file, please use xlsx file.");
      this.fileToUpload = null;
      this.selectedFilename = "Choose file";
      this.uploadErrorMessage = "Invalid file, please use xlsx file.";
    }
  }
  uploadFile() {
    this.uploadingStatus = false;
    this.fileUploadService.postFile(this.fileToUpload).subscribe(
      data => {
        // do something, if upload success
        console.log(data);
        console.log(data.body);
        console.log(data["body"]);
        this.uploadingStatus = true;
        this.summary = data;
        this.sharingService.setData(data.body);
        this.sharingService.setReportsData(data.body);
        this.router.navigate(["dashboard"]);
        //console.log(this.summary);

        // console.log(data['least_amount_customer']);
      },
      error => {
        this.uploadingStatus = null;
        this.uploadErrorMessage = error;
      }
    );
  }
  getUploadedFileList() {
    this.fileUploadService.getUploadedFileList().subscribe(
      res => {
        this.uploadedFileList = res["data"];
        console.log(this.uploadedFileList);
      },
      error => {
        console.log(error);
      }
    );
  }

  isFileSelected() {
    return this.selectedFilename == "Choose file" ? true : false;
  }
  getUploadingStatus() {
    if (this.uploadingStatus == null) {
      return "";
    } else if (this.uploadingStatus == false) {
      return "Uploading..";
    } else {
      return "Uploaded";
    }
  }
  deleteDataset(id: any, index: any) {
    this.fileUploadService.deleteDataset(id).subscribe(
      res => {
        this.uploadedFileList.splice(index, 1);
      },
      error => {
        console.log(error);
      }
    );
  }

  // Function to open dialog
  openModal(id: any, index: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      message: "Are you sure to delete?",
      title: "Sales Data Analysis"
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.deleteDataset(id, index);
      }
    });
  }
  // Function to open dialog
  confirmDatasetDefault(id: any, index: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
      message: "Are you sure?",
      title: "Sales Data Analysis"
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fileUploadService.setDefaultDataset(id).subscribe(
          res => {
            console.log(res["data"]);
            this.sharingService.setReportsData(res["data"]);
            this.getUploadedFileList();
          },
          error => {
            console.error(error);
          }
        );
      }
    });
  }
}
