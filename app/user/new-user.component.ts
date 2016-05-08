import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {AppService} from '../app.service';
import {UserService} from './user.service';
//import {GroupService} from '../group/group.service';
import {SuperGroupService} from '../super_group/super_group.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-new-user',
  template: `
    <div class="my-new-user">
      <div class="row">
        <div class="col-xs-12 col-md-offset-3 col-md-6">

          <h3>Welcome fellow human!</h3>
          <form #newUserForm="ngForm" class="form-horizontal" novalidate>
          
            <div class="form-group">
              <label for="displayname" class="col-sm-2 control-label">Display Name</label>
              <div class="col-sm-10">
                <input id="displayname" type="text" class="form-control" placeholder="Display name" required
                  [(ngModel)] = "model.displayname"
                  ngControl = "displayname" #displayname = "ngForm"
                >
                <div [hidden]="displayname.valid || displayname.pristine" class="alert alert-danger">
                  Display name is required
                </div>
                <div class="text-muted pull-right field-explainer">
                  Display name will be visible on your posts and comments. 
                  We suggest to keep it as you real world name.<br/> 
                  Once set here it <b>cannot be changed</b>.<br/>
                  Don't worry, you can also post as <b>anonymous</b> anytime.<br/>
                </div>
              </div>
            </div>
                    
            <div class="form-group">
              <label for="email" class="col-sm-2 control-label">Email</label>
              <div class="col-sm-10">
                <input id="email" type="text" class="form-control" placeholder="Email" required
                  [(ngModel)] = "model.email"
                  ngControl = "email" #email = "ngForm"
                >
                <div [hidden]="email.valid || email.pristine" class="alert alert-danger">
                  Email is required
                </div>
                <span class="text-muted pull-right field-explainer">Email is used to login to the site.</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="password" class="col-sm-2 control-label">Password</label>
              <div class="col-sm-10">
                <input id="password" type="password" class="form-control" placeholder="Password" required
                  [(ngModel)] = "model.password"
                  ngControl="password" #password = "ngForm"
                >
                <div [hidden]="password.valid || password.pristine" class="alert alert-danger">
                  Password is required
                </div>
                <span class="text-muted pull-right field-explainer">Password is also used to login to the site.</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="confirm_password" class="col-sm-2 control-label">Confirm Password</label>
              <div class="col-sm-10">
                <input id="confirm_password" type="password" class="form-control" placeholder="Confirm Password" required
                  [(ngModel)] = "model.confirm_password"
                  ngControl="confirm_password" #confirm_password = "ngForm"
                >
                <div [hidden]="(confirm_password.value == password.value) || confirm_password.pristine" class="alert alert-danger">
                  Passwords do not match.
                </div>
                <span class="text-muted pull-right field-explainer">Retype password just to be sure.</span>
              </div>
            </div>
            
            <div class="alert alert-danger" role="alert" [hidden]="!_errorMsg">
              <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span class="sr-only">Error:</span>
              {{_errorMsg}}
            </div>
            <my-error [_errorMsg]="_errorMsg"></my-error>
            
            <div class="form-group">
              <div class="col-sm-10 col-sm-offset-2">
                <button (click)="onSubmit($event)" [disabled]="!newUserForm.form.valid" class="btn btn-default">Submit</button>
                <button (click)="goBack()" class="btn btn-default">Go Back</button>
              </div>
            </div>
            
          </form>
            
        </div>
      </div>
    </div>
  `,
  styles: [`
    .my-new-user .ng-valid[required] {
      border-left: 5px solid #42A948; /* green */
    }
    .my-new-user .ng-invalid {
      border-left: 5px solid #a94442; /* red */
    }
    .my-new-user .field-explainer {
      text-align: right;
      font-size: 0.9em;
      font-style: italic;
    }
  `],
  directives: [ErrorComponent]
})
export class NewUserComponent {
  
  private model = {
    email: null,
    displayname: null,
    password: null,
    confirm_password: null,
    /*
    international: [],
    national: {},
    state: [],
    city: [],
    local: []
    */
  };
  private _groupList = {international: [], national: [], state: [], city: [], local: [], selectedNational: {}};
  private _errorMsg = false;
  
  constructor(
    private _appService: AppService,
    private _userService: UserService,
    private _superGroupService: SuperGroupService,
    private _authenticationService: AuthenticationService,
    private _router: Router) {}
  
  ngOnInit() {
    /*
    this._superGroupService.getSuperGroupsByType('international').then( sgList => this._groupList.international = sgList );
    this._superGroupService.getSuperGroupsByType('national').then( sgList => this._groupList.national = sgList );
    this._superGroupService.getSuperGroupsByType('state').then( sgList => this._groupList.state = sgList );
    this._superGroupService.getSuperGroupsByType('city').then( sgList => this._groupList.city = sgList );
    this._superGroupService.getSuperGroupsByType('local').then( sgList => this._groupList.local = sgList );
    */
  }
  
  onSubmit(event) {
    this._errorMsg = null;
    event.preventDefault();
    /*
    this.model.international = this._groupList.international.filter(el => el.selected == true)
    this.model.national = this._groupList.selectedNational
    this.model.state = this._groupList.state.filter(el => el.selected == true)
    this.model.city = this._groupList.city.filter(el => el.selected == true)
    this.model.local = this._groupList.local.filter(el => el.selected == true)
    */
    
    console.log(this.model);

    if(this._appService.getSiteParams().servicesMode === 'server') {
      this._userService.createNewUser(this.model).subscribe(
        user => {
          // Registeratin success
          // redirect ot login page (TODO: Auto login the new registered user)
          console.log(user)
          //this._router.navigate(['ViewUser', {id: user.id}]);
          this._router.navigate(['Login']);
        },
        error => {
          // TODO:: Handle errors
          console.log(error)
          this._errorMsg = error;
        }
      )
    }
  }
    
  goBack() {
    window.history.back();
  }

}