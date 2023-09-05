import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  username: string = "";
  name: string = "";
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem("username");
    console.log(localStorage.getItem("access_token"));
    this.authService.getUserByUsername(this.username).subscribe(
      res => {
        console.log(res["data"]);
        this.name = res["first_name"] + " " + res["last_name"];
        console.log(this.name)
      },
      error => {
        console.log("error");
        console.log(error);
      }
    );
  }
  logout(){
    console.log("logout");
    localStorage.clear();
    this.router.navigate(['']);
  }
}
