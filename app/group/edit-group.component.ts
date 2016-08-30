import {Component, OnInit, OnDestroy} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
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

    <my-error [_errorMsg]="_errorMsg"></my-error>

    <div *ngIf="_readyToEdit">

      <h3 class="col-sm-offset-2">Edit Group:</h3>

      <form #groupForm="ngForm" class="form-horizontal" novalidate>
        <h5>{{_model.supergroup.name | uppercase}} / {{_model.name}}</h5>

        <div class="form-group">
          <label for="group_name" class="col-sm-2 control-label"> Group Name </label>
          <div class="col-sm-10">
            <p class="form-control-static">{{_model.name}}</p>
          </div>
        </div>

        <div class="form-group">
          <label for="description" class="col-sm-2 control-label">Description</label>
          <div class="col-sm-10">
            <textarea type="text" rows="5" class="form-control" (keyup)="validateForm('description')"
              [(ngModel)] = "_model.description" placeholder="Tell your group members what this group is about." required></textarea>
            <div [hidden]="_formErrors.description.isValid" class="alert alert-danger">
              {{_formErrors.description.errMsg}}
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="membership_needs_approval" class="col-sm-2 control-label">Do users need your approval before joining this group?</label>
          <div class="col-sm-10">
            <label class="checkbox-inline">
              <input type="radio" name="membership_needs_approval" (click)="_model.membership_needs_approval = 1" [checked]="_model.membership_needs_approval === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="membership_needs_approval" (click)="_model.membership_needs_approval = 0" [checked]="_model.membership_needs_approval === 0" > No
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="non_members_can_view" class="col-sm-2 control-label">Are posts in this group visible to NON Members?</label>
          <div class="col-sm-10">
            <label class="checkbox-inline">
              <input type="radio" name="non_members_can_view"
                     (click)="_model.non_members_can_view = 1"
                     [checked]="_model.non_members_can_view === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="non_members_can_view"
                     (click)="_model.non_members_can_view = 0; _model.non_members_can_post = 0"
                     [checked]="_model.non_members_can_view === 0" > No
            </label>
          </div>
        </div>

        <fieldset [disabled]="_model.non_members_can_view === 0">
        <div class="form-group">
          <label for="non_members_can_post" class="col-sm-2 control-label">Can NON Members post in this group?</label>
          <div class="col-sm-10">
            <label class="checkbox-inline">
              <input type="radio" name="non_members_can_post"
                     (click)="_model.non_members_can_post = 1"
                     [checked]="_model.non_members_can_post === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="non_members_can_post"
                     (click)="_model.non_members_can_post = 0"
                     [checked]="_model.non_members_can_post === 0" > No
            </label>
          </div>
        </div>
        </fieldset>

        <div class="form-group">
          <label for="allow_anon_posts" class="col-sm-2 control-label">Allow anonymous posts?</label>
          <div class="col-sm-10">
            <label class="checkbox-inline">
              <input type="radio" name="allow_anon_posts" (click)="_model.allow_anon_posts = 1" [checked]="_model.allow_anon_posts === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="allow_anon_posts" (click)="_model.allow_anon_posts = 0" [checked]="_model.allow_anon_posts === 0" > No
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="allow_anon_comments" class="col-sm-2 control-label">Allow anonymous comments?</label>
          <div class="col-sm-10">
            <label class="checkbox-inline">
              <input type="radio" name="allow_anon_comments" (click)="_model.allow_anon_comments = 1" [checked]="_model.allow_anon_comments === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="allow_anon_comments" (click)="_model.allow_anon_comments = 0" [checked]="_model.allow_anon_comments === 0" > No
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="verify_members_email" class="col-sm-2 control-label">Restrict membership by Email domain?</label>
          <div class="col-sm-10">
            <label class="checkbox-inline">
              <input type="radio" name="verify_members_email" (click)="_model.verify_members_email = 1" [checked]="_model.verify_members_email === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="verify_members_email" (click)="_model.verify_members_email = 0" [checked]="_model.verify_members_email === 0" > No
            </label>
          </div>
        </div>


        <div *ngIf="_model.verify_members_email === 1" class="">
          <div *ngFor="let counter of _model.number_of_email_domains">
            <div class="form-group">
              <label for="verify_email_domains_list{counter}" class="col-sm-2 control-label">Email domain #{{counter + 1}}</label>
              <div class="col-sm-10">
                <input type="text" name="verify_email_domains_list{counter}" id="verify_email_domains_list{counter}"
                    [(ngModel)] = "_model.verify_email_domains_list[counter]" class="form-control" (keyup)="validateForm('emailDomain')"
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
  inputs: ['post', 'error'],
  directives: [ErrorComponent]

})
export class EditGroupComponent implements OnInit, OnDestroy  {

  private _model = null;
  //private _formErrors = null;
  private _formErrors = {
    name: {isValid: true, errMsg: ''},
    description: {isValid: true, errMsg: 'YOLO'},
    emailDomain: {isValid: true, errMsg: 'YOLO'},
    isFormValid: false
  }
  private _errorMsg: string = null;
  private _errList:string[] = [];
  private _showSummary: boolean = false;
  private _loggedInUserSubcription = null;
  private _currentUser = null;
  private _readyToEdit = false;
  //private _group = null;

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
        // Do some post prep for the form
        this.convertBooleanToBinary(group, true)
        group.number_of_email_domains = [];
        //console.log("Group", group)
        for (var i = 0; i < group.verify_email_domains_list.length; i++) {
          group.number_of_email_domains.push(i);
        }
        this._model = group;
        if ( this._currentUser && this._currentUser.id == this._model.owner ) this._readyToEdit = true;
        if ( this._currentUser && this._currentUser.id != this._model.owner ) {
          this._errorMsg = "Only group admin can edit group settings.";
          this._readyToEdit = false;
        }
      },
      error => {
        this._errorMsg = error;
      })

    // Only logged in uses can post
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(currentUser => {
      if(currentUser) {
        this._currentUser = currentUser;
        if ( this._model && this._currentUser.id == this._model.owner ) this._readyToEdit = true;
        this._errorMsg = null;
        if ( this._model && this._currentUser.id != this._model.owner ) {
          this._errorMsg = "Only group admin can edit group settings.";
          this._readyToEdit = false;
        }
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
      if ( this._model && this._currentUser.id == this._model.owner ) this._readyToEdit = true;
      this._errorMsg = null;
      if ( this._model && this._currentUser.id != this._model.owner ) {
          this._errorMsg = "Only group admin can edit group settings.";
          this._readyToEdit = false;
      }
    } else {
      this._errorMsg = "User must be logged in to edit a group.";
    }

}

  /**
   * Submit the form
   */
  onSubmit(event) {

    event.preventDefault();
    //console.log(this._model);

    ['name', 'description', 'emailDomain'].forEach( field => this.validateForm(field) );
    if(this._formErrors.name.isValid && this._formErrors.description.isValid && this._formErrors.emailDomain.isValid) {
    } else {
      return;
    }
    // Clone the model, this dosen't clones functions if any
    let tmpModel = JSON.parse(JSON.stringify(this._model));

    this.convertBooleanToBinary(tmpModel, false)
    delete tmpModel.number_of_email_domains
    tmpModel.verify_email_domains_list = tmpModel.verify_email_domains_list.map(el => el.trim()).filter(el => el);
    tmpModel.verify_email_domains_list = tmpModel.verify_email_domains_list.filter(function(item, i, ar){ return ar.indexOf(item) === i; });

    this._groupService.editGroup(tmpModel)
      .subscribe( group => {
        //console.log(group)
        this._router.navigate(['ViewGroup', {super_group_name: group.supergroup.name, group_name: group.name}]);
      },
      error => {
        //console.log(error);
        this._errorMsg = error;
      });
  }

  validateForm(field) {

    switch(field) {
      case 'name':
        if(this._model.name.trim() && /^[a-zA-Z0-9-_]+$/.test(this._model.name.trim()) && this._model.name.length < 30) {
          this._formErrors.name.isValid = true;
        } else {
          this._formErrors.name.isValid = false;
          this._formErrors.name.errMsg = "Group name is required. No spaces, only alphabets, numbers, dashes and underscores please. Max 30 characters."
        }
        break;
      case 'description':
        if(this._model.description.trim()) {
          this._formErrors.description.isValid = true;
        } else {
          this._formErrors.description.isValid = false;
          this._formErrors.description.errMsg = "Group description is required.";
        }
        break;
      case 'emailDomain':
        if(this._model.verify_members_email == 1) {
          var emailList = [];
          this._model.verify_email_domains_list.forEach(function(email) {
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
    if(this._model.number_of_email_domains.length >= 20) return;
    this._model.number_of_email_domains.push(this._model.number_of_email_domains.length);
  }

  /**
   * Makes true/false to 1/0 or vice versa (coz radio does not seem to work with boolean)
   */
  convertBooleanToBinary(model: any, booleanToBinary: boolean) {
    if(booleanToBinary) {

        if ( model.non_members_can_view == true  ) model.non_members_can_view = 1;
        if ( model.non_members_can_view == false ) model.non_members_can_view = 0;

        if ( model.non_members_can_post == true  ) model.non_members_can_post = 1;
        if ( model.non_members_can_post == false ) model.non_members_can_post = 0;

        if ( model.verify_members_email == true  ) model.verify_members_email = 1;
        if ( model.verify_members_email == false ) model.verify_members_email = 0;

        if ( model.membership_needs_approval == true  ) model.membership_needs_approval = 1;
        if ( model.membership_needs_approval == false ) model.membership_needs_approval = 0;

        if ( model.allow_anon_posts == true  ) model.allow_anon_posts = 1;
        if ( model.allow_anon_posts == false ) model.allow_anon_posts = 0;

        if ( model.allow_anon_comments == true  ) model.allow_anon_comments = 1;
        if ( model.allow_anon_comments == false ) model.allow_anon_comments = 0;

    } else {
        if ( model.non_members_can_view == 1 ) model.non_members_can_view = true;
        if ( model.non_members_can_view == 0 ) model.non_members_can_view = false;

        if ( model.non_members_can_post == 1 ) model.non_members_can_post = true;
        if ( model.non_members_can_post == 0 ) model.non_members_can_post = false;

        if ( model.verify_members_email == 1 ) model.verify_members_email = true;
        if ( model.verify_members_email == 0 ) model.verify_members_email = false;

        if ( model.membership_needs_approval == 1 ) model.membership_needs_approval = true;
        if ( model.membership_needs_approval == 0 ) model.membership_needs_approval = false;

        if ( model.allow_anon_posts == 1 ) model.allow_anon_posts = true;
        if ( model.allow_anon_posts == 0 ) model.allow_anon_posts = false;

        if ( model.allow_anon_comments == 1 ) model.allow_anon_comments = true;
        if ( model.allow_anon_comments == 0 ) model.allow_anon_comments = false;
    }
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }

  goBack() {
    window.history.back();
  }

}
