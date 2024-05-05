import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgot-passsword', 
  templateUrl: './forgot-passsword.component.html',
  styleUrls: ['./forgot-passsword.component.css']
})
export class ForgotPassswordComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ForgotPassswordComponent>,
    private _loginService: LoginService
  ) { }

  @ViewChild('digit1') digit1Input!: ElementRef<HTMLInputElement>;
  @ViewChild('digit2') digit2Input!: ElementRef<HTMLInputElement>;
  @ViewChild('digit3') digit3Input!: ElementRef<HTMLInputElement>;
  @ViewChild('digit4') digit4Input!: ElementRef<HTMLInputElement>;

  emailOrPhone: string = '';
  showForgotPassword: boolean = true;
  showOTP: boolean = false;
  showResetpass: boolean = false;
  otp: number;
  error: boolean = false;
  pass1: string;
  pass2: string;
  ngOnInit(): void {
  }
  onInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value.trim();
    if (inputValue.length === 1) {
      switch (index) {
        case 1:
          this.digit2Input.nativeElement.focus();
          break;
        case 2:
          this.digit3Input.nativeElement.focus();
          break;
        case 3:
          this.digit4Input.nativeElement.focus();
          break;
        default:
          break;
      }
    } else if (inputValue.length > 1) {
      input.value = inputValue.charAt(0); // Limit to the first character
    }
  }


  onCloseClick(): void {
    this.dialogRef.close();
  }

  forgotPassword(){
    if(this.emailOrPhone != '' && this.emailOrPhone != null){
    this.showForgotPassword = false;
    this.showOTP = true;
    }
    else{
      this.error = true;
      return;
    }
    this._loginService.forgotPasswordViaEmail(this.emailOrPhone).subscribe((res)=>{
      console.log(res);
    })
  }

  otpValidate(){
    this.showForgotPassword = false;
    this.showOTP = false;
    this.showResetpass = true;
    let otpParams = {}
    otpParams = {
      "otp": this.otp,
      "type": this.emailOrPhone,
    }
    this._loginService.otpValidate(otpParams).subscribe((res: any)=>{
      console.log(res);
      sessionStorage.setItem('token', JSON.stringify(res.token));
      localStorage.setItem('employeeId', res.empId);
    })
  }

  setpassword(){
    let passwords = {}
    passwords ={
      "newPassword": this.pass1,
      "confirmPassword": this.pass2,
  }
    this._loginService.changePassword(passwords).subscribe((res)=>{
      console.log(res);
    })
  }
}
