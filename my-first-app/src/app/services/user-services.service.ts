import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private http: HttpClient) { }
   token = sessionStorage.getItem('token').replace(/"/g, '');
   empId = localStorage.getItem('employeeId');

   headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  getAllUsers(){ 
    return this.http.get(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/api/v1/viewEmployeeListByCompanyId/4`, {headers: this.headers});
  }

  findEmployeeById(id: any){
    return this.http.get(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/api/v1/findEmployeeById/${id}`, {headers: this.headers});
  }


  addEmployee(data: any){
    return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/api/v1/insertEmployee`, data, {headers: this.headers});
  }

  addEmployeePersonalInfo(data: any){
    return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/api/v1/insertPersonalInfo`, data, {headers: this.headers});
  }

  addEmlpoyeeAddress(data: any){
    return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/address/addAddress`, data, {headers: this.headers});
  }

  getDepartmentList(){
    return this.http.get(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM//department/viewDepartmentList`, {headers: this.headers});
  }

  getCompanyList(){
    return this.http.get(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM//company/viewCompanyList`, {headers: this.headers});
  }

  getEmployeeListByCompanyId(id: any){
    return this.http.get(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/api/v1/viewEmployeeListByCompanyId/${id}`, {headers: this.headers});
  }

  viewEmployeeById(id: any){
    return this.http.get(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/api/v1/viewEmployeeById/${id}`, {headers: this.headers});
  }

  getDesignationList(){
    return this.http.get(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/designation/list`, {headers: this.headers});
  }

  getShiftList(){
    return this.http.get(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/shift/api/getAllShift`, {headers: this.headers});
  }
}
