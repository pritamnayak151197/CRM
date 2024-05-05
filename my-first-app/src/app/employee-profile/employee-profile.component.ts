import { Component, OnInit, Inject, InjectionToken,} from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  constructor( private _userServices: UserServicesService,
    private dataService: DataService
   
  ) { }

  employeeData: any;
  selectedTab: number = 1;
  empId: any;

  showTab(tabNumber: number): void {
    this.selectedTab = tabNumber;
  }
  ngOnInit(): void {
    this.dataService.currentId.subscribe(id => this.empId = id);
    this._userServices.viewEmployeeById(this.empId).subscribe((data: any) => {
      this.employeeData = data;
    });
  }

  onCloseClick(): void {
    // this.dialogRef.close();
  }
}
