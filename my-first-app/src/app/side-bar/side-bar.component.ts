import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  collapsed = false;
  empId = localStorage.getItem('employeeId');
  
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  logout() {

    localStorage.removeItem('my_app_token'); // Or sessionStorage.removeItem('my_app_token')

    this.router.navigate(['Login']);
  }

  viewMyProfile(){
    console.log(this.empId);
    this.dataService.changeId(+this.empId);
    this.router.navigate(['/Sidebar/EmployeeProfile']);
  }
}
