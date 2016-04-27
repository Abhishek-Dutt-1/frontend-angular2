import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {Post} from './post';
import {Group} from '../group/group';
import {PostService} from './post.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {GroupService} from '../group/group.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'my-new-group',
  template: `
  <div class="my-new-group">
    <div *ngIf="!_errorMsg">
      <h3 class="col-sm-offset-2">Create a New Group: GLOBAL/{{model.name}}</h3>
      <form #groupForm="ngForm" class="form-horizontal" novalidate>
        
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
      {{_errorMsg}}
      <button (click)="goBack()" class="btn btn-default">Back</button>
    </div>
  </div>
  `,
  templateUrl: 'app/post/new-post.component.html',
  styles: [`
    .my-new-group .ng-valid[required] {
      border-left: 5px solid #42A948; /* green */
    }
    .my-new-group .ng-invalid {
      border-left: 5px solid #a94442; /* red */
    }
    .my-new-group form {
      min-width: 250px;
    }
    .my-new-group .post-textarea textarea{
      width: 100%;
    }
    .my-new-group .post-text input{
      width: 100%;
    }
    .my-new-group .post-select select{
      width: 100%;
    }
  `],
  //styleUrls: ['app/post/new-post.component.css'],
  inputs: ['post']
})
export class NewGroupComponent {
  
  private model = null;
  private _formErrors = null;
  private _errorMsg: string = null;
  private _errList:string[] = [];
  private _showSummary: boolean = false;


  constructor(
    //private _postService: PostService,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService,
    private _groupService: GroupService,
    private _router: Router) {
  }
  
  ngOnInit() {
    let super_group_name = this._routeParams.get('super_group_name');
    this.model =  {
      name: '',
      description: '',
      super_group_name: super_group_name,
      non_members_can_view: 1,
      non_members_can_post: 0,
      verify_members_email: 0,
      verify_email_domains_list: [],
      number_of_email_domains: [0]      // this tracks the number of email input fields to show in ui
    }
    this._formErrors = {
      name: {isValid: true, errMsg: ''},
      description: {isValid: true, errMsg: 'YOLO'},
      emailDomain: {isValid: true, errMsg: 'YOLO'},
      isFormValid: false
    }

    // Only logged in uses can post
    this._authenticationService.loggedInUser$.subscribe(currentUser => {
      if(currentUser) {
        this.model.owner = currentUser;
        this._errorMsg = null;
      } else {
        this._errorMsg = "User must be logged in to create new group.";
      }
    });
    // Only logged in uses can post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this.model.owner = currentUser;
      this._errorMsg = null;
    } else {
      this._errorMsg = "User must be logged in to create new group.";
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
      return;
    } else {
      console.log("FORM IS not VALID")
      return;
    }

    let emailDomainList = [];
    if(this.model.verify_members_email == 1) {
      this.model.verify_email_domains_list.forEach(function(email) {
        if(email && /@(.+)/.test(email)) {
          emailDomainList.push(email);
        } else if(email == '') {

        } else {
          this._errList.push("Invalid email domain: " + email + " Email domain's must be of the form @mycollege.edu");
        }
      });
      console.log(emailDomainList);
    }

    if(this._errList.length == 0) {
      this._showSummary = true;
    } else {
      return
    }

    /*
    if(this.model.non_members_can_view == 1) this.model.non_members_can_view = true;
    if(this.model.non_members_can_view == 0) this.model.non_members_can_view = false;

    if(this.model.non_members_can_post == 1) this.model.non_members_can_post = true;
    if(this.model.non_members_can_post == 0) this.model.non_members_can_post = false;

    if(this.model.verify_members_email == 1) this.model.verify_members_email = true;
    if(this.model.verify_members_email == 0) this.model.verify_members_email = false;
    */
    return;

    let newGroup = this._groupService.createNewGroup(this.model)
    newGroup.then(group => {
      this._router.navigate(['ViewGroup', {super_group_name: group.super_group.name, group_name: group.name}]);
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
            this._formErrors.emailDomain.errMsg = "Invalid email domain: " + emailList.join(", ") + " Email domain's must be of the form @mycollege.edu";
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

  
  goBack() {
    window.history.back();
  }

}
