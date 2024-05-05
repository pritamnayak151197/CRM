import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('userData');

    if (currentUser) {
      this._loginService.login(currentUser);
    }
  }
  
}
