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
      <h5>Create a New Group</h5>
      <form #groupForm="ngForm">
        
        <div class="post-text">
          <label for="name" class="">Group Name</label>
          <input id="name" type="text" class="" required
            [(ngModel)] = "model.name"
            ngControl = "name" #name="ngForm"
          >
          <div [hidden]="name.valid || name.pristine" class="alert alert-danger">
            Name is required
          </div>
        </div>
        
        <div class="post-textarea">
          <label for="description" class="">Description</label>
          <textarea type="text" class="" rows="5" required
            [(ngModel)] = "model.description"
            ngControl = "description" #description="ngForm"
          ></textarea>
          <div [hidden]="description.valid || description.pristine" class="alert alert-danger">
            Description is required
          </div>
        </div>
        
        <div class="">{{model.non_members_can_view}}
          <label for="non_members_can_view">Non members can view posts in this group?</label>
            <input type="radio" name="non_members_can_view" (click)="model.non_members_can_view = 1"  [checked]="model.non_members_can_view === 1" > Yes
            <input type="radio" name="non_members_can_view" (click)="model.non_members_can_view = 0" [checked]="!model.non_members_can_view === 0" > No
        </div>
        
        
        <button (click)="onSubmit($event)" class="btn btn-default" [disabled]="!groupForm.form.valid">Submit</button>
        <button (click)="goBack()" class="btn btn-default">Back</button>
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
  private _errorMsg: string = null;
  
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
      name: 'Group_Name',
      description: 'Group Description',
      super_group_name: super_group_name,
      non_members_can_view: 1,
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
  
    let newGroup = this._groupService.createNewGroup(this.model)
    newGroup.then(group => {
      this._router.navigate(['ViewGroup', {super_group_name: group.super_group.name, group_name: group.name}]);
    });

  } 
  
  goBack() {
    window.history.back();
  }

}