import { Component, OnInit, ViewChild} from '@angular/core';
import { ScreenService } from '../services/screen.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExportToExcelService } from '../services/export-to-excel.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewScreenComponent } from './create-new-screen/create-new-screen.component';


@Component({
  selector: 'app-screen-master',
  templateUrl: './screen-master.component.html',
  styleUrls: ['./screen-master.component.css']
})
export class ScreenMasterComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private _screenService: ScreenService,
    private _exportToExcelService: ExportToExcelService
  ) { }

  displayedColumns: string[] = ['screenId', 'screenName', 'screenDetails', 'AvailableOptions', 'activeInactive', 'action'];
  dataSource: any;
  dataSource1: any;


  ngOnInit(): void {
    this._screenService.getAllScreens().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource1 = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

   
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  exportToExcel(): void {
    this._exportToExcelService.exportToExcel(this.dataSource1, 'exported_data');
  }


  createNewScreen(): void {
    const dialogRef = this.dialog.open(CreateNewScreenComponent, {
      width: '40%', // Set the width of the dialog
      height: '%', // Set the height of the dialog
      // Optionally, you can set more dialog options here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }
}

