import {Component, OnInit, OnDestroy} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {Group} from '../group/group';
import {AuthenticationService} from '../authentication/authentication.service';
import {GroupService} from '../group/group.service';
import {SuperGroupService} from '../super_group/super_group.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-edit-group',
  template: `
  <div class="my-edit-group">
    <div *ngIf="!_errorMsg && _model.supergroup">
      <h3 class="col-sm-offset-2">Create a New Group:</h3>
      <form #groupForm="ngForm" class="form-horizontal" novalidate>
        <h5>{{model.supergroup.name | uppercase}}/{{model.name}}</h5>
        <div class="form-group">
          <label for="group_name" class="col-sm-2 control-label"> Group Name </label>
          <div class="col-sm-10">
            <input id="group_name" type="text" class="form-control" placeholder="group_name" [(ngModel)]="model.name" (keyup)="validateForm('name')" required>
            <div [hidden]="_formErrors.name.isValid" class="alert alert-danger">
              {{_formErrors.name.errMsg}}
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="description" class="col-sm-2 control-label">Description</label>
          <div class="col-sm-10">
            <textarea type="text" rows="5" class="form-control" (keyup)="validateForm('description')"
              [(ngModel)] = "model.description" placeholder="Tell your group members what this group is about." required></textarea>
            <div [hidden]="_formErrors.description.isValid" class="alert alert-danger">
              {{_formErrors.description.errMsg}}
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label for="membership_needs_approval" class="col-sm-2 control-label">Do users need your approval before joining this group?</label>
          <div class="col-sm-10">
            <label class="checkbox-inline">
              <input type="radio" name="membership_needs_approval" (click)="model.membership_needs_approval = 1" [checked]="model.membership_needs_approval === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="membership_needs_approval" (click)="model.membership_needs_approval = 0" [checked]="model.membership_needs_approval === 0" > No
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="non_members_can_view" class="col-sm-2 control-label">Are posts in this group visible to NON Members?</label>
          <div class="col-sm-10">
            <label class="checkbox-inline">
              <input type="radio" name="non_members_can_view" (click)="model.non_members_can_view = 1" [checked]="model.non_members_can_view === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="non_members_can_view" (click)="model.non_members_can_view = 0" [checked]="model.non_members_can_view === 0" > No
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="non_members_can_post" class="col-sm-2 control-label">Can NON Members post in this group?</label>
          <div class="col-sm-10">
            <label class="checkbox-inline">
              <input type="radio" name="non_members_can_post" (click)="model.non_members_can_post = 1" [checked]="model.non_members_can_post === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="non_members_can_post" (click)="model.non_members_can_post = 0" [checked]="model.non_members_can_post === 0" > No
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="verify_members_email" class="col-sm-2 control-label">Restrict membership by Email domain?</label>
          <div class="col-sm-10">
            <label class="checkbox-inline">
              <input type="radio" name="verify_members_email" (click)="model.verify_members_email = 1" [checked]="model.verify_members_email === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="verify_members_email" (click)="model.verify_members_email = 0" [checked]="model.verify_members_email === 0" > No
            </label>
          </div>
        </div>
        
        
        <div *ngIf="model.verify_members_email === 1" class="">
          <div *ngFor="#counter of model.number_of_email_domains">
            <div class="form-group">
              <label for="verify_email_domains_list{counter}" class="col-sm-2 control-label">Email domain #{{counter + 1}}</label>
              <div class="col-sm-10">
                <input type="text" name="verify_email_domains_list{counter}" id="verify_email_domains_list{counter}" 
                    [(ngModel)] = "model.verify_email_domains_list[counter]" class="form-control" (keyup)="validateForm('emailDomain')"
                    placeholder="@mycollege.edu">
              </div>
            </div>
          </div>

          <div [hidden]="_formErrors.emailDomain.isValid" class="alert alert-danger col-sm-offset-2 col-sm-10">
            {{_formErrors.emailDomain.errMsg}}
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button (click)="addMoreEmailDomainInput($event)" class="btn btn-default btn-xs">Add More</button>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button (click)="onSubmit($event)" class="btn btn-default" [disabled]="_formErrors.isFormValid">Submit</button>
            <!--
            <button (click)="onSubmit($event)" class="btn btn-default">Submit</button> -->
            <button (click)="goBack()" class="btn btn-default">Back</button>
          </div>
        </div>
      </form>
    </div>
    <div *ngIf="_errorMsg">
      <my-error [_errorMsg]=_errorMsg></my-error>
      {{_errorMsg}}
      <button (click)="_errorMsg=false" class="btn btn-default">Back</button>
    </div>
  </div>
  `,
  styles: [`
    .my-edit-group .ng-valid[required] {
      border-left: 5px solid #42A948; /* green */
    }
    .my-edit-group .ng-invalid {
      border-left: 5px solid #a94442; /* red */
    }
    .my-edit-group form {
      min-width: 250px;
    }
    .my-edit-group .post-textarea textarea{
      width: 100%;
    }
    .my-edit-group .post-text input{
      width: 100%;
    }
    .my-edit-group .post-select select{
      width: 100%;
    }
  `],
  //styleUrls: ['app/post/new-post.component.css'],
  inputs: ['post', 'error']
})
export class EditGroupComponent implements OnInit, OnDestroy  {
  
  private _model = null;
  private _formErrors = null;
  private _errorMsg: string = null;
  private _errList:string[] = [];
  private _showSummary: boolean = false;
  private _loggedInUserSubcription = null;
  private _currentUser = null;

  constructor(
    //private _postService: PostService,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService,
    private _groupService: GroupService,
    private _superGroupService: SuperGroupService,
    private _router: Router) {
  }
  
  ngOnInit() {
    let groupId = this._routeParams.get('group_id');
    this._groupService.getGroupById(groupId).subscribe(
      group => {
        console.log(group);
        this._model.group = group;
      },
      error => {
        this._errorMsg = error;
      })

    // Only logged in uses can post
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(currentUser => {
      if(currentUser) {
        this._currentUser = currentUser;
        this._errorMsg = null;
      } else {
        this._currentUser = null;
        this._errorMsg = "User must be logged in to edit a group.";
      }
    });
    // Only logged in uses can post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._currentUser = currentUser;
      this._errorMsg = null;
    } else {
      this._errorMsg = "User must be logged in to edit a group.";
    }
  
    // DO SOMETHING WIHT THE GORUP AND CURRENT USER
  
    this._model = {
      name: '',
      description: '',
      supergroup: null,
      non_members_can_view: 1,
      non_members_can_post: 0,
      verify_members_email: 0,
      verify_email_domains_list: [],
      number_of_email_domains: [0],      // this tracks the number of email input fields to show in ui (purely frontend stuff)
      membership_needs_approval: 0
    }
    
    this._formErrors = {
      name: {isValid: true, errMsg: ''},
      description: {isValid: true, errMsg: 'YOLO'},
      emailDomain: {isValid: true, errMsg: 'YOLO'},
      isFormValid: false
    }
}
  
  /**
   * Submit the form
   */
  onSubmit(event) {

    event.preventDefault();
    console.log(this.model);

    ['name', 'description', 'emailDomain'].forEach( field => this.validateForm(field) );
    if(this._formErrors.name.isValid && this._formErrors.description.isValid && this._formErrors.emailDomain.isValid) {
      console.log("FORM IS VALID")
    } else {
      console.log("FORM IS not VALID")
      return;
    }

    if(this.model.non_members_can_view == 1) this.model.non_members_can_view = true;
    if(this.model.non_members_can_view == 0) this.model.non_members_can_view = false;

    if(this.model.non_members_can_post == 1) this.model.non_members_can_post = true;
    if(this.model.non_members_can_post == 0) this.model.non_members_can_post = false;

    if(this.model.verify_members_email == 1) this.model.verify_members_email = true;
    if(this.model.verify_members_email == 0) this.model.verify_members_email = false;

    if(this.model.membership_needs_approval == 1) this.model.membership_needs_approval = true;
    if(this.model.membership_needs_approval == 0) this.model.membership_needs_approval = false;

    delete this.model.number_of_email_domains

    this._groupService.createNewGroup(this.model)
      .subscribe( group => {
        console.log(group)
        this._router.navigate(['ViewGroup', {super_group_name: group.supergroup.name, group_name: group.name}]);
      },
      error => {
        console.log(error); 
        this._errorMsg = error;

        // Revive users selection
        if ( this.model.non_members_can_view == true  ) this.model.non_members_can_view = 1;
        if ( this.model.non_members_can_view == false ) this.model.non_members_can_view = 0;

        if ( this.model.non_members_can_post == true  ) this.model.non_members_can_post = 1;
        if ( this.model.non_members_can_post == false ) this.model.non_members_can_post = 0;

        if ( this.model.verify_members_email == true  ) this.model.verify_members_email = 1;
        if ( this.model.verify_members_email == false ) this.model.verify_members_email = 0;

        if ( this.model.membership_needs_approval == true  ) this.model.membership_needs_approval = 1;
        if ( this.model.membership_needs_approval == false ) this.model.membership_needs_approval = 0;

      });

  }

  validateForm(field) {

    switch(field) {
      case 'name':
        if(this.model.name.trim() && /^[a-zA-Z0-9-_]+$/.test(this.model.name.trim()) && this.model.name.length < 30) {
          this._formErrors.name.isValid = true;
        } else {
          this._formErrors.name.isValid = false;
          this._formErrors.name.errMsg = "Group name is required. No spaces, only alphabets, numbers, dashes and underscores please. Max 30 characters."
        }
        break;
      case 'description':
        if(this.model.description.trim()) {
          this._formErrors.description.isValid = true;
        } else {
          this._formErrors.description.isValid = false;
          this._formErrors.description.errMsg = "Group description is required.";
        }
        break;
      case 'emailDomain': 
        if(this.model.verify_members_email == 1) {
          var emailList = [];
          this.model.verify_email_domains_list.forEach(function(email) {
            if( email.trim() && !( /@(.+)/.test(email.trim()) ) ) {
              emailList.push(email.trim());
            }
          });

          if(emailList.length > 0) {
            this._formErrors.emailDomain.isValid = false;
            this._formErrors.emailDomain.errMsg = "Invalid email domain: " + emailList.join(", ") + " Email domain's must be of the form @email.com";
          } else {
            this._formErrors.emailDomain.isValid = true;
            this._formErrors.emailDomain.errMsg = '';
          }
        } else {
          this._formErrors.emailDomain.isValid = true;
          this._formErrors.emailDomain.errMsg = '';
        }
      break;
    }

  }

  /**
   * Display another input box for email domain
   * @param event
   */
  addMoreEmailDomainInput(event) {
    event.preventDefault();
    if(this.model.number_of_email_domains.length >= 20) return;
    this.model.number_of_email_domains.push(this.model.number_of_email_domains.length);
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }
  
  goBack() {
    window.history.back();
  }

}
