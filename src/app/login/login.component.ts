import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Router} from '@angular/router'
import { HttpParams } from '@angular/common/http';
import { ReportService } from '../services/report.services';
import { SharingService } from '../services/sharing.services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginStatus = true;
  constructor(
    private router : Router,
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private reportService: ReportService,
    private sharingService: SharingService
    ) {

     }

  ngOnInit() {    
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]      
    });
  }
  get f() { return this.loginForm.controls }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }  
    //body for o/token API for Authentication 
    const body = new HttpParams()
    .set('username', this.loginForm.controls.username.value)
    .set('password', this.loginForm.controls.password.value)
    .set('grant_type', 'password')
    .set('client_id', 'HbBfkdyzrclpMLS0HTrGDsOKhp1lcbg0m9rHD5si')
    .set('client_secret', 'H51XpMByNSgi6Yt5qfQ4EqoUMTLQhfnrkos1fcuyqXpl8mLbkQ9QTwhtjzpj7NwOxXBZtnmdrNIhv01dQjd21LZ0oQ8FJaBkOucsKqNiCi4KkCMDPbhbgwb4ebK6d3XN');    
   
    // Call auth API via service.
    this.authService.auth(body).subscribe(
      (res) => {
        console.log("heee");
        this.loginStatus = true;
        console.log(res);
        console.log(res["access_token"]);
        localStorage.setItem("access_token", res["access_token"]);
        localStorage.setItem("username", this.loginForm.controls.username.value);
        // Call the reports API and store in sharedData service.
        this.reportService.reports('Category').subscribe(
          (res)=>{              
              console.log(res['data']);
              this.sharingService.setReportsData(res['data']);
              this.router.navigate(['dashboard']);              
          },
          (error)=>{
            console.log('error');
            console.log(error);
          }
        )
        

      },
      (error) => {
        this.loginStatus = false;
        console.log("invalid");
        // console.error(error);        
      }
    );
  }
}
