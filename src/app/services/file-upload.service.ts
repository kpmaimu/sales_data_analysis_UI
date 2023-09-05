import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import { Global } from "../shared/global";

@Injectable({
  providedIn: "root"
})
export class FileUploadService {
  constructor(private http: HttpClient) {}
  postFile(fileToUpload: File): Observable<any> {
    try {
      const formData: FormData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("remark", "test");
      return this.http
        .post(Global.API_BASE_URI + "/upload/", formData, {
          headers: this.getHeaders1(),
          observe: "response"
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      console.error(error);
    }
  }

  getUploadedFileList(): Observable<any> {
    try {
      return this.http
        .get(Global.API_BASE_URI + "/upload/", {
          headers: this.getHeaders()
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      console.error(error);
    }
  }

  deleteDataset(id: any): Observable<any> {
    try {
      return this.http
        .delete(Global.API_BASE_URI + "/upload/" + id, {
          headers: this.getHeaders()
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      console.log(error);
    }
  }
  setDefaultDataset(id: any): Observable<any> {
    try {
      return this.http
        .post(Global.API_BASE_URI + "/dataset/default?id=" + id, {
          headers: this.getHeaders()
        })
        .pipe(catchError(this.handleError));
    } catch (error) {
      console.log(error);
    }
  }

  getHeaders(iContentType?: string): HttpHeaders {
    console.log(localStorage.getItem("access_token"));
    return new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json"
    });
  }
  getHeaders1(iContentType?: string): HttpHeaders {
    console.log(localStorage.getItem("access_token"));
    return new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("access_token")
    });
  }

  handleError(error: Error) {
    try {
      return throwError(error.message || "Something went wrong");
    } catch (error) {
      console.error(error);
    }
  }
}
