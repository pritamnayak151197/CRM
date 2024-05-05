import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { LoginComponent } from './login/login.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ScreenMasterComponent } from './screen-master/screen-master.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Sidebar', component: SideBarComponent, 
        children:[
          { path: 'EmployeeProfile', component: EmployeeProfileComponent },
          { path: 'Dashboard', component: DashboardComponent },
          { path: 'AllUsers', component: AllUsersComponent },
          {path: 'ScreenMaster', component: ScreenMasterComponent},
          {path: '', redirectTo: 'Dashboard', pathMatch: 'full'}
        ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
