import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPassswordComponent } from './forgot-passsword/forgot-passsword.component';
import { ToasterService } from '../services/toster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _loginService: LoginService,
    private router: Router,
    public dialog: MatDialog,
    private toasterService: ToasterService
  ) { }
  logIn : any = {
    "email": "",
      "phone":"",
      "password": ""
  }
  username: string = '';
  rememberCred : boolean = false;
  showToaster = false;
  toasterMessage = '';
  toasterType: 'success' | 'error' = 'success';
  ngOnInit(): void {
  }

  loginRequest(event: any){
    
    //check if the username is an email or a phone number
    if(this.username.includes('@')){
      this.logIn.email = this.username;
    }
    else{
      this.logIn.phone = this.username;
    }
    this._loginService.login(this.logIn).subscribe((res: any)=>{
      if(res.success){
        sessionStorage.setItem('token', JSON.stringify(res.token.token));
        localStorage.setItem('employeeId', res.token.empId);
        this.router.navigate(['Sidebar/Dashboard']);
        this.toasterService.showSuccess('Login successful');

        if(this.rememberCred){
          localStorage.setItem('userData', JSON.stringify({ logIn: this.logIn }));
        }
      }
    }, (error)=>{
      alert(error.error.error.message);
    });

  }

  forgotPassword(){
    const dialogRef = this.dialog.open(ForgotPassswordComponent, {
      width: '40%', // Set the width of the dialog
      height: '65%', // Set the height of the dialog
      // Optionally, you can set more dialog options here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }


}
