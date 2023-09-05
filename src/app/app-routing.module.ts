import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportComponent } from './import/import.component';
import { SummaryComponent } from './summary/summary.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { ReportsComponent } from './reports/reports.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [{
      path: '',
      component: HomeComponent,
      pathMatch: 'full'
    },
    {
      path: 'import',
      component: ImportComponent,
      pathMatch: 'full'
    },
    {
      path: 'summary',
      component: SummaryComponent,
      pathMatch: 'full'
    },
    {
      path: 'reports',
      component: ReportsComponent,
      pathMatch: 'full'
    },
    {
      path: 'sentiment',
      component: SentimentComponent,
      pathMatch: 'full'
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
