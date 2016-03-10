import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'my-authentication',
  template: `
    <div class="my-authentication">

      <h5>Welcome fellow human</h5>

      <form #loginForm="ngForm">
      
        <div>
          <label for="email">Email</label>
          <input id="email" type="text" required
            [(ngModel)] = "model.email"
            ngControl = "email" #email = "ngForm"
            (click)="clearErrorMsg()"
          >
          <div [hidden]="email.valid || email.pristine" class="alert alert-danger">
            Email is required
          </div>
        </div>
                
        <div>
          <label for="password">Password</label>
          <input id="password" type="password" required
            [(ngModel)] = "model.password"
            ngControl="password" #password = "ngForm"
            (click)="clearErrorMsg()"
          >
          <div [hidden]="password.valid || password.pristine" class="alert alert-danger">
            Password is required
          </div>
        </div>
        
        <div>
          <button (click)="onSubmit($event)" [disabled]="!loginForm.form.valid">Submit</button>
          <button (click)="goBack()">Go Back</button>
        </div>
        
        <div>
          <div [hidden]="!errorMsg">
            {{errorMsg}}
          </div>
        </div>
        
      </form>
      
    </div>
  `,
})
export class AuthenticationComponent {
  
  model = {
    email: null,
    password: null
  };
  errorMsg = null;
  
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router) { }
  
  onSubmit(event) {
    
    event.preventDefault();
    
    this._authenticationService.loginUser(this.model).then(
      user => {
        if(user) {
          this._router.navigate(['ViewUser', {id: user.id}]);
        }  else {
          this.errorMsg = "Incorrect email or password!"
        }       
    }).catch((reason) => {
      console.log(reason);
    });
    
  }
  
  clearErrorMsg() {
    this.errorMsg = null;
  }
    
  goBack() {
    window.history.back();
  }
  
}