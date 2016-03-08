import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserService} from './user.service';

@Component({
  selector: 'my-new-user',
  template: `
    <div class="my-new-user">

      <h5>Welcome fellow human!</h5>
      <form #newUserForm="ngForm">
      
        <div>
          <label for="email">Email</label>
          <input id="email" type="text" required
            [(ngModel)] = "model.email"
            ngControl = "email" #email = "ngForm"
          >
          <div [hidden]="email.valid || email.pristine" class="alert alert-danger">
            Email is required
          </div>
        </div>
        
        <div>
          <label for="displayname">Display Name</label>
          <input id="displayname" type="text" required
            [(ngModel)] = "model.displayname"
            ngControl = "displayname" #displayname = "ngForm"
          >
          <div [hidden]="displayname.valid || displayname.pristine" class="alert alert-danger">
            Display name is required
          </div>
        </div>
        
        <div>
          <label for="password">Password</label>
          <input id="password" type="password" required
            [(ngModel)] = "model.password"
            ngControl="password" #password = "ngForm"
          >
          <div [hidden]="password.valid || password.pristine" class="alert alert-danger">
            Password is required
          </div>
        </div>
        
        <div>
          <label for="confirm_password">Confirm Password</label>
          <input id="confirm_password" type="password" required
            [(ngModel)] = "model.confirm_password"
            ngControl="confirm_password" #confirm_password = "ngForm"
           >
          <div [hidden]="confirm_password.valid || confirm_password.pristine" class="alert alert-danger">
            Confirm Password is required
          </div>
        </div>
        
        <div>
          <label for="international">International</label>
          <input id="international" type="text" required
            [(ngModel)] = "model.international"
            ngControl = "international" #international = "ngForm"
          >
          <div [hidden]="international.valid || international.pristine" class="alert alert-danger">
            International is required
          </div>
        </div>
        
        <div>
          <label for="national">National</label>
          <input id="national" type="text" required
            [(ngModel)] = "model.national"
            ngControl = "national" #national = "ngForm"
          >
          <div [hidden]="national.valid || national.pristine" class="alert alert-danger">
            National is required
          </div>
        </div>
        
        <div>
          <label for="state">State</label>
          <input id="state" type="text" required
            [(ngModel)] = "model.state"
            ngControl = "state" #state = "ngForm"
          >
          <div [hidden]="state.valid || state.pristine" class="alert alert-danger">
            State is required
          </div>
        </div>
        
        <div>
          <label for="city">City</label>
          <input id="city" type="text" required
            [(ngModel)] = "model.city"
            ngControl = "city" #city = "ngForm"
          >
          <div [hidden]="city.valid || city.pristine" class="alert alert-danger">
            City is required
          </div>
        </div>
        
        <div>
          <label for="sub_city">Sub City</label>
          <input id="sub_city" type="text" required
            [(ngModel)] = "model.sub_city"
            ngControl = "sub_city" #sub_city = "ngForm"
          >
          <div [hidden]="sub_city.valid || sub_city.pristine" class="alert alert-danger">
            Sub city is required
          </div>
        </div>
        
        <div>
          <button (click)="onSubmit($event)" [disabled]="!newUserForm.form.valid">Submit</button>
          <button (click)="goBack()">Go Back</button>
        </div>
        
      </form>
    </div>
  `,
  styles: [`
    .my-new-user .ng-valid[required] {
      border-left: 5px solid #42A948; /* green */
    }

    .my-new-user .ng-invalid {
      border-left: 5px solid #a94442; /* red */
    }
  `]
  //styleUrls: ['app/post/post.component.css'],
})
export class NewUserComponent {
  
  model = {
    email: null,
    displayname: null,
    password: null,
    confirm_password: null,
    international: 'global',
    national: 'india',
    state: 'karnataka',
    city: 'bangalore',
    sub_city: 'hsr layout'
  };
  
  constructor(
    private _userService: UserService,
    private _router: Router) { }
  
  ngOnInit() {}
  
  onSubmit(event) {
    event.preventDefault();
    this._userService.createNewUser(this.model).then(
      user => {
        this._router.navigate(['ViewUser', {id: user.id}]);        
    });
  }
    
  goBack() {
    window.history.back();
  }

}