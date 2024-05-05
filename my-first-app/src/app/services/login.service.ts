import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient){}
  


  login(param){
  return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/auth/v1/userLogin/emailOrPhone`, param);
}

forgotPasswordViaEmail(emailorMobile: string){
  return this.http.get(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM//auth/v1/forgetPasswordByEmailOrPhone/${emailorMobile}`);
}


otpValidate(otpParams){
  return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/auth/v1/otpValidate`, otpParams);
}

changePassword(passwordParam){
  let token = sessionStorage.getItem('token').replace(/"/g, '');
  let empId = localStorage.getItem('employeeId');

 let headers = new HttpHeaders({
   'Authorization': `Bearer ${token}`
 });
  return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/auth/v1/changePassword`, passwordParam, {headers: headers});
}

forgetPassword(newPassword){
  return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/auth/v1/forgetPassword`, newPassword);
}

otpValidateForForgetPassword(otpParams){
  return this.http.post(`https://uuor3m2oka.execute-api.ap-south-1.amazonaws.com/skydecorCRM/auth/v1/otpValidate`, otpParams); 
}

}
