import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserServicesService } from 'src/app/services/user-services.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeData = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "hireDate": "",
    "companyId": "",
    "departmentId": "",
    "designationId": "",
    "status": null,
    "immediateManagerId": "",
    "extensionNumber": "",
    "employeeType":"",
    "inOffice": null,
    "userEmpId":"",
    "shiftId": null
};
  employeePersonalInfo = {
    "empId": "",
    "personalEmail": "",
    "homeNumber": "",
    "gender": "",
    "maritalStatus": "",
    "birthDate": "",
    "highestQualification": "",
    "anniversaryDate": "",
    "uidNumber": "",
    "panNumber": "",
    "totalExperience": "",
    "profileImageUrl":"",
    "userEmpId": ""
}
employeeAddress ={
  "empId": "",
  "currentAddressData": {
      "officeType": "",
      "location": "",
      "companyId": null,
      "cityId": null,
      "stateId": null,
      "pincode": ""
  },
   "permanentAddressData": {
      "officeType": "",
      "location": "",
      "companyId": null,
      "cityId": null,
      "stateId": null,
      "pincode": ""
  },
  "userEmpId": "810003"
}
  maritalStatuses: string[] = ['Single', 'Married', 'Widowed', 'Divorced', 'Legally Separated'];
  genders = ['Male', 'Female', 'Non-binary', 'Genderqueer', 'Agender', 'Bigender', 'Genderfluid', 'Transgender', 'Cisgender'];

  departMentList = [];
  companyList: any = [];
  employeeList: any = [];
  selectedCpmpany: any;
  selectedDepartment: any;
  selectedDepartMentHead: any;
  reportingManagerName: any;
  designationList: any = [];
  imageUrl: string | ArrayBuffer | null = null;
  selectedDob = new Date().toISOString().substring(0, 10);
  SelectedHireDate = new Date().toISOString().substring(0, 10);
  selectedAnniversaryDate = new Date().toISOString().substring(0, 10);
  newEmployee: any;
  shiftList: any;
  statusList = ['Active', 'Inactive'];

  
  constructor(public dialogRef: MatDialogRef<AddEmployeeComponent>,
     private _userServices: UserServicesService,
  ) { }
  



  ngOnInit(): void {
    this._userServices.getDepartmentList().subscribe((res: any) => {
      this.departMentList = res;
    })

    this._userServices.getCompanyList().subscribe((res: any) => {
      this.companyList = res;
    })

    this._userServices.getEmployeeListByCompanyId(4).subscribe((res: any) => {
      this.employeeList = res;
      console.log(this.employeeList);
    })

    this._userServices.getDesignationList().subscribe((res: any) => {
      this.designationList = res;
    });

    this._userServices.getShiftList().subscribe((res: any) => {
      this.shiftList = res;
    });

  }

  onDateChange(event: any) {
    this.SelectedHireDate = event.value;
    this.employeeData.hireDate = this.SelectedHireDate;
  }

  dobChange(event: any) {
    this.selectedDob = event.value;
    this.employeePersonalInfo.birthDate = this.selectedDob;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSelectShift(event: any){
    this.employeeData.shiftId = event;
  }

  onSelectStatus(event: any){
    this.employeeData.status = event;
  }
  addEmployee(){
    this.employeeData.inOffice = true;
    this.employeeData.userEmpId = localStorage.getItem('employeeId');
    this._userServices.addEmployee(this.employeeData).subscribe((res: any) => {
    this.newEmployee = res.employeeId;
      
    })
  }
  addEmployeePersonalInfo(){
    this.employeePersonalInfo.empId = this.newEmployee;
    this.employeePersonalInfo.userEmpId = localStorage.getItem('employeeId');
    this.employeePersonalInfo.profileImageUrl = null;
    this._userServices.addEmployeePersonalInfo(this.employeePersonalInfo).subscribe((res: any) => {
      console.log(res);

    })
  }

addEmployeeAddress(){

  this._userServices.addEmlpoyeeAddress(this.employeeData).subscribe((res: any) => {
    console.log(res);
  });
}


  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      // Generate a URL for the selected file (assuming it's an image)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  onSelectCompanyId(value: any) {
    this.employeeData.companyId = value;
  }
  onSelectReportingManager(value: any) {
    this.employeeData.immediateManagerId = value;

  }
  onSelectDepartment(value: any) {
    this.employeeData.departmentId = value;
  }

  onSelectDesignation(value: any) {
    this.employeeData.designationId = value;
  }

  onSelectMaritalStatus(value: any) {
    this.employeePersonalInfo.maritalStatus = value;
  }
  onSelectGender(value: any) {
    this.employeePersonalInfo.gender = value;
  }

  onDateChangeAnniversaryDate(event: any) {
    this.selectedAnniversaryDate = event.value;
    this.employeePersonalInfo.anniversaryDate = this.selectedAnniversaryDate;
  }

  uploadProfilePicture(): void {
    if (this.selectedFile) {
      // Perform upload logic here (similar to previous examples)
      console.log('Uploading profile picture:', this.selectedFile.name);
    } else {
      console.warn('No file selected.');
    }
  }
}
