import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {AppService} from '../app.service';
import {UserService} from './user.service';
//import {GroupService} from '../group/group.service';
import {SuperGroupService} from '../super_group/super_group.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-new-user',
  template: `
    <div class="my-new-user">
      <div class="row">
        <div class="col-xs-12 col-md-offset-3 col-md-6">

          <h3>Welcome fellow human!</h3>
          <form #newUserForm="ngForm" class="">
          
            <h4>Basic info:</h4>
            <div class="form-group">
              <label for="displayname">Display Name</label>
              <input id="displayname" type="text" class="form-control" placeholder="Display name" required
                [(ngModel)] = "model.displayname"
                ngControl = "displayname" #displayname = "ngForm"
              >
              <div [hidden]="displayname.valid || displayname.pristine" class="alert alert-danger">
                Display name is required
              </div>
              <div class="text-muted pull-right field-explainer">
                Display name will be visible on posts and comments posted by you.<br/> 
                Once set here it cannot be changed.<br/>
                We suggest to keep it as you real world name.<br/> 
                Don't worry, you can also post as anonymous anytime.<br/>
              </div>
            </div>
            
            <br/><br/><br/><br/>          
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="text" class="form-control" placeholder="Email" required
                [(ngModel)] = "model.email"
                ngControl = "email" #email = "ngForm"
              >
              <div [hidden]="email.valid || email.pristine" class="alert alert-danger">
                Email is required
              </div>
              <span class="text-muted pull-right field-explainer">Email is used to login to the site.</span>
            </div>
            
            <br/>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" type="password" class="form-control" placeholder="Password" required
                [(ngModel)] = "model.password"
                ngControl="password" #password = "ngForm"
              >
              <div [hidden]="password.valid || password.pristine" class="alert alert-danger">
                Password is required
              </div>
              <span class="text-muted pull-right field-explainer">Password is also used to login to the site.</span>
            </div>
            
            <br/>
            <div class="form-group">
              <label for="confirm_password">Confirm Password</label>
              <input id="confirm_password" type="password" class="form-control" placeholder="Confirm Password" required
                [(ngModel)] = "model.confirm_password"
                ngControl="confirm_password" #confirm_password = "ngForm"
              >
              <div [hidden]="(confirm_password.value == password.value) || confirm_password.pristine" class="alert alert-danger">
                Passwords do not match.
              </div>
              <span class="text-muted pull-right field-explainer">Retype password just to be sure.</span>
            </div>
            
            <br/>
            <hr/>
            <h4>Let's setup some defaults:</h4>
            Users can group groups into collections.<br/> 
            We have created 5 of these collections called <b>'International', 'National', 'State', 'City'</b> and <b>'Local'</b> for all users.<br/>
            This would be a good time to select which groups you would like to see in these collections of groups.<br/>
            These settings can be changed any time.
            <div class="form-group">
              <label for="international">International</label>
<div>
<span *ngFor="#international of _groupList.international">
<label class="checkbox-inline">
<input type="checkbox" [(ngModel)]="international.selected"> {{international.name}}
</label>
</span>
</div>
              <!--
              <input id="international" type="text" class="form-control" required
                [(ngModel)] = "model.international"
                ngControl = "international" #international = "ngForm"
              >
              <div [hidden]="international.valid || international.pristine" class="alert alert-danger">
                International is required
              </div>
              -->
              <span class="text-muted pull-right field-explainer">Select your 'International' groups. Multiple groups can be selected.</span>
            </div>        
            
            <br/>
            <div class="form-group">
              <label for="national">National</label>
<div>
<span *ngFor="#national of _groupList.national">
<label class="radio-inline">
<input type="radio" name="national" (click)="_groupList.selectedNational = national" [checked]="national === _groupList.selectedNational"> {{national.name}}
</label>
</span>
</div>
              <!--
              <input id="national" type="text" class="form-control" required
                [(ngModel)] = "model.national"
                ngControl = "national" #national = "ngForm"
              >
              <div [hidden]="national.valid || national.pristine" class="alert alert-danger">
                National is required
              </div>
              -->
              <span class="text-muted pull-right field-explainer">Select your 'National' groups. Only one group can be selected.</span>
            </div>
            
            <br/>
            <div class="form-group">
              <label for="state">State</label>
<div>
<span *ngFor="#state of _groupList.state">
<label class="checkbox-inline">
<input type="checkbox" [(ngModel)]="state.selected"> {{state.name}}
</label>
</span>
</div>
              <!--
              <input id="state" type="text" class="form-control" required
                [(ngModel)] = "model.state"
                ngControl = "state" #state = "ngForm"
              >
              <div [hidden]="state.valid || state.pristine" class="alert alert-danger">
                State is required
              </div>
              -->
              <span class="text-muted pull-right field-explainer">Select your 'State' groups. Multiple groups can be selected.</span>
            </div>
            
            <br/>
            <div class="form-group">
              <label for="city">City</label>
<div>
<span *ngFor="#city of _groupList.city">
<label class="checkbox-inline">
<input type="checkbox" [(ngModel)]="city.selected"> {{city.name}}
</label>
</span>
</div>
              <!--
              <input id="city" type="text" class="form-control" required
                [(ngModel)] = "model.city"
                ngControl = "city" #city = "ngForm"
              >
              <div [hidden]="city.valid || city.pristine" class="alert alert-danger">
                City is required
              </div>
              -->
              <span class="text-muted pull-right field-explainer">Select your 'City' groups. Multiple groups can be selected.</span>
            </div>
            
            <br/>
            <div class="form-group">
              <label for="local">Local</label>
<div>
<span *ngFor="#local of _groupList.local">
<label class="checkbox-inline">
<input type="checkbox" [(ngModel)]="local.selected"> {{local.name}}
</label>
</span>
</div>
              <!--
              <input id="local" type="text" class="form-control" required
                [(ngModel)] = "model.local"
                ngControl = "local" #local = "ngForm"
              >
              <div [hidden]="local.valid || local.pristine" class="alert alert-danger">
                Local is required
              </div>
              -->
              <span class="text-muted pull-right field-explainer">Select your 'Local' groups. Multiple groups can be selected.</span>
            </div>
            
            <br/><br/>
            
            <div class="alert alert-danger" role="alert" [hidden]="!_errorMsg">
              <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span class="sr-only">Error:</span>
              {{_errorMsg}}
            </div>
            <div>
              <button (click)="onSubmit($event)" [disabled]="!newUserForm.form.valid" class="btn btn-default">Submit</button>
              <button (click)="goBack()" class="btn btn-default">Go Back</button>
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
    }
  `]
  //styleUrls: ['app/post/post.component.css'],
})
export class NewUserComponent {
  
  private model = {
    email: null,
    displayname: null,
    password: null,
    confirm_password: null,
    //international: 'global',
    international: [],
    national: {},
    state: [],
    city: [],
    local: []
  };
  private _groupList = {international: [], national: [], state: [], city: [], local: [], selectedNational: {}};
  private _errorMsg = null;
  
  constructor(
    private _appService: AppService,
    private _userService: UserService,
    private _superGroupService: SuperGroupService,
    private _authenticationService: AuthenticationService,
    private _router: Router) {}
  
  ngOnInit() {
    this._superGroupService.getSuperGroupsByType('international').then( sgList => this._groupList.international = sgList );
    this._superGroupService.getSuperGroupsByType('national').then( sgList => this._groupList.national = sgList );
    this._superGroupService.getSuperGroupsByType('state').then( sgList => this._groupList.state = sgList );
    this._superGroupService.getSuperGroupsByType('city').then( sgList => this._groupList.city = sgList );
    this._superGroupService.getSuperGroupsByType('local').then( sgList => this._groupList.local = sgList );
  }
  
  onSubmit(event) {
    this._errorMsg = null;
    event.preventDefault();
    
    this.model.international = this._groupList.international.filter(el => el.selected == true)
    this.model.national = this._groupList.selectedNational
    this.model.state = this._groupList.state.filter(el => el.selected == true)
    this.model.city = this._groupList.city.filter(el => el.selected == true)
    this.model.local = this._groupList.local.filter(el => el.selected == true)
    
    console.log(this.model);
    if(this._appService.getSiteParams().servicesMode === 'local') {
      this._userService.createNewUser(this.model).then(
        user => {
          this._authenticationService.loginUser(user).then(
            user => this._router.navigate(['ViewUser', {id: user.id}])
          ).catch(err => console.log(err))           
      });
    }
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