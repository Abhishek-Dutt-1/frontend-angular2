import {Component, OnInit, OnDestroy} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {Group} from '../group/group';
import {AuthenticationService} from '../authentication/authentication.service';
import {GroupService} from '../group/group.service';
import {SuperGroupService} from '../super_group/super_group.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ErrorComponent} from '../misc/error.component';
import {AppService} from '../app.service';

@Component({
  selector: 'my-new-group',
  template: `
  <div class="my-new-group">

    <div *ngIf="_errorMsg">
      <my-error [_errorMsg]=_errorMsg></my-error>
    </div>

    <div *ngIf="_readyToEdit">

      <h3 class="col-sm-offset-2">Create a New Group:</h3>

      <form #groupForm="ngForm" class="form-horizontal" novalidate>

        <div class="form-group">
          <label for="group_name" class="col-sm-2 control-label"></label>
          <div class="col-sm-10">
            <p class="form-control-static">{{model.supergroup.name}}/{{model.name}}</p>
          </div>
        </div>

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
              [(ngModel)] = "model.description" placeholder="Tell users what this group is about." required></textarea>
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
              <input type="radio" name="non_members_can_view"
                     (click)="model.non_members_can_view = 1"
                     [checked]="model.non_members_can_view === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="non_members_can_view"
                     (click)="model.non_members_can_view = 0; model.non_members_can_post = 0"
                     [checked]="model.non_members_can_view === 0" > No
            </label>
          </div>
        </div>

        <fieldset [disabled]="model.non_members_can_view === 0">
        <div class="form-group">
          <label for="non_members_can_post" class="col-sm-2 control-label">Can NON Members post in this group?</label>
          <div class="col-sm-10">
            <label class="checkbox-inline">
              <input type="radio" name="non_members_can_post"
                     (click)="model.non_members_can_post = 1"
                     [checked]="model.non_members_can_post === 1" > Yes
            </label>
            <label class="checkbox-inline">
              <input type="radio" name="non_members_can_post"
                     (click)="model.non_members_can_post = 0"
                     [checked]="model.non_members_can_post === 0" > No
            </label>
          </div>
        </div>
        </fieldset>

                <div class="form-group">
                  <label for="allow_anon_posts" class="col-sm-2 control-label">Allow anonymous posts?</label>
                  <div class="col-sm-10">
                    <label class="checkbox-inline">
                      <input type="radio" name="allow_anon_posts" (click)="model.allow_anon_posts = 1" [checked]="model.allow_anon_posts === 1" > Yes
                    </label>
                    <label class="checkbox-inline">
                      <input type="radio" name="allow_anon_posts" (click)="model.allow_anon_posts = 0" [checked]="model.allow_anon_posts === 0" > No
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  <label for="allow_anon_comments" class="col-sm-2 control-label">Allow anonymous comments?</label>
                  <div class="col-sm-10">
                    <label class="checkbox-inline">
                      <input type="radio" name="allow_anon_comments" (click)="model.allow_anon_comments = 1" [checked]="model.allow_anon_comments === 1" > Yes
                    </label>
                    <label class="checkbox-inline">
                      <input type="radio" name="allow_anon_comments" (click)="model.allow_anon_comments = 0" [checked]="model.allow_anon_comments === 0" > No
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
          <div *ngFor="let counter of model.number_of_email_domains">
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

  </div>
  `,
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
  directives: [ErrorComponent]
})
export class NewGroupComponent implements OnInit, OnDestroy  {

  //private model = null;
  private model = {
    name: '',
    description: '',
    supergroup: null,
    owner: null,
    non_members_can_view: 1,
    non_members_can_post: 0,
    allow_anon_posts: 1,
    allow_anon_comments: 1,
    verify_members_email: 0,
    verify_email_domains_list: [],
    number_of_email_domains: [0],      // this tracks the number of email input fields to show in ui (purly frontend stuff)
    membership_needs_approval: 0
  }

  //private _formErrors = null;
  private _formErrors = {
    name        : { isValid: true, errMsg: ''     },
    description : { isValid: true, errMsg: 'YOLO' },
    emailDomain : { isValid: true, errMsg: 'YOLO' },
    isFormValid : false
  }
  private _errorMsg: string = null;
  private _errList:string[] = [];
  private _showSummary: boolean = false;
  private _loggedInUserSubcription = null;
  private _readyToEdit = false;
  private _currentUser = null;

  constructor(
    //private _postService: PostService,
    private _appService: AppService,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService,
    private _groupService: GroupService,
    private _superGroupService: SuperGroupService,
    private _router: Router) {
  }

  ngOnInit() {
    let super_group_name = this._routeParams.get('super_group_name');
    this._superGroupService.getSuperGroupByName(super_group_name).subscribe(
      sg => {
        // Keep model.supergroup as object and not just id as this is returned as is from the server
        // and used by the onSubmit to redirect to the new created group (thus saving a query)
        this.model.supergroup = sg;
        if(this._currentUser) this._readyToEdit = true;
        //console.log(this._readyToEdit)
      },
      error => {
        this._errorMsg = error;
      })

    // Only logged in uses can post
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(currentUser => {
      if(currentUser) {
        this._currentUser = currentUser;
        this.model.owner = currentUser.id;
        this._errorMsg = null;
        if(this.model.supergroup) this._readyToEdit = true;
        //console.log(this._readyToEdit)
      } else {
        this._currentUser = null;
        this._errorMsg = "User must be logged in to create new group.";
      }
    });
    // Only logged in uses can post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._currentUser = currentUser;
      this.model.owner = currentUser.id;
      this._errorMsg = null;
      if(this.model.supergroup) this._readyToEdit = true;
      //console.log(this._readyToEdit)
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
    } else {
      return;
    }

    // Clone the model, this dosen't clones functions if any
    let tmpModel = JSON.parse(JSON.stringify(this.model));
    this.convertBooleanToBinary(tmpModel, false)
    delete tmpModel.number_of_email_domains
    tmpModel.verify_email_domains_list = tmpModel.verify_email_domains_list.map(el => el.trim()).filter(el => el);
    tmpModel.verify_email_domains_list = tmpModel.verify_email_domains_list.filter(function(item, i, ar){ return ar.indexOf(item) === i; });

    this._groupService.createNewGroup(tmpModel)
      .subscribe( group => {
        console.log(group)
        this._router.navigate(['ViewGroup', {super_group_name: group.supergroup.name, group_name: group.name}]);
        this._appService.createNotification( { text: 'Group ' + group.supergroup.name + '/' + group.name + ' created successfully', type: 'success', timeout: 20000 } );
      },
      error => {
        //console.log(error);
        this._errorMsg = error;
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
