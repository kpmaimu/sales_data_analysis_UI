import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator'
import { RegisterService } from '../services/register.service'
import { Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = "";
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) {
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirm_password')
      });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log("hello");
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log("invalid form data");
      return;
    }
    let regData = JSON.stringify(this.registerForm.value);
    
    // let x =this.registerService.register(y);
    this.registerService.register(regData).subscribe(
      (res) => {
        console.log("res");
        console.log(res);
        this.router.navigate([""]);
      },
      (error) => {
        console.log("Failed:"+error);
        this.errorMessage = "An error occurred!!";
      }

    );



  }



}
