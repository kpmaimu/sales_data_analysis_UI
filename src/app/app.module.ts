import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule, MatButtonModule, MatDialogRef, MAT_DIALOG_DATA, MatIconModule, MatCardModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportComponent } from './import/import.component';
import { SummaryComponent } from './summary/summary.component'
import { SharingService } from './services/sharing.services';
import { SentimentComponent } from './sentiment/sentiment.component';
import { SharedModule } from './shared/shared.module';
import { ReportsComponent } from './reports/reports.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DialogComponent } from './dialog/dialog.component'
import { AuthInterceptor } from './services/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    ImportComponent,
    SummaryComponent,
    SentimentComponent,
    ReportsComponent,
    SidebarComponent,
    DialogComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    SharedModule.forRoot()
  ],
  entryComponents:[DialogComponent],
  providers: [
    AuthService, 
    SharingService, 
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
