import { Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {UserServicesService} from '../services/user-services.service';
import {MatPaginator} from '@angular/material/paginator';
import { ExportToExcelService } from '../services/export-to-excel.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeeProfileComponent } from '../employee-profile/employee-profile.component';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';



export interface TableData {
  position: number;
  name: string;
  weight: number;
}

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
  providers: []
})
export class AllUsersComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private _userServices: UserServicesService,
    private _exportToExcelService: ExportToExcelService,
    private router: Router,
     private dataService: DataService
  ) { 
    
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showUsers = false; // Initialize showDiv as false
  showLockedUsers = true;
  employeeId: any;
  activeEmployees: any;
  dataSource: any;
  totalRecords: any;
  dataSource1: any;
  isLoading: boolean = false;
  displayedColumns: string[] = ['selectEmployee' ,'CompanyName', 'EmployeeName', 'Desihnation', 'Department', 'ReportingManager', 'ExtentionNo','CurrentLockStatus', 'ActiveStatus', 'Action'];




  

  tabChanged(event: any): void {
    // Check the selected index to determine whether to show/hide the div
    if (event.index === 1) { // Assuming Tab 2 is the index 1 (zero-based index)
      this.showUsers = true; // Show the div when Tab 2 is selected
    this.showLockedUsers = false;
    } else {
      this.showLockedUsers = true; // Hide the div for other tabs
      this.showUsers = false;
    }
  }

  createEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '80%', // Set the width of the dialog
      height: '100%', // Set the height of the dialog
      // Optionally, you can set more dialog options here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }


  exportToExcel(): void {
    this._exportToExcelService.exportToExcel(this.dataSource1, 'exported_data');
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this._userServices.getAllUsers().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource1 = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.totalRecords = res.length;
      this.activeEmployees = res.filter(item => item.status == true).length;
    })
  }

  onCellClick(empId){

    this.dataService.changeId(empId);
    this.router.navigate(['/Sidebar/EmployeeProfile']);

  }
  ngAfterViewInit() {
  }
  

}
