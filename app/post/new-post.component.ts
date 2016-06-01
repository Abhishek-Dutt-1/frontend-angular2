import {Component, OnInit} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {AppService} from '../app.service';
import {Post} from './post';
import {Group} from '../group/group';
import {PostService} from './post.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {GroupService} from '../group/group.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-new-post',
  template: `
  <div class="my-new-post">

    <my-error [_errorMsg]="_errorMsg"></my-error>
    <div *ngIf="_errorMsg">
      <button (click)="goBack()" class="btn btn-default">Back</button>
    </div>

    <div *ngIf="!_errorMsg">
      <h3>Create a New Post</h3>

      <form #postForm="ngForm" class="form-horizontal" novalidate>

        <div class="post-select form-group">
          <label for="type" class="col-sm-2 control-label">Post Type</label>
          <span *ngFor="let postType of _postTypes">
            <div class="radio-inline">
              <label>
                <input type="radio" name="type" (click)="model.type = postType" [checked]="postType === model.type"> {{postType}}
              </label>
            </div>
          </span>
        </div>

        <div class="post-text form-group">
          <label for="title" class="col-sm-2 control-label">Title</label>
          <div class="col-sm-10">
            <input id="title" type="text" class="form-control" required
              [(ngModel)] = "model.title"
              ngControl = "title" #title="ngForm"
            >
            <div [hidden]="title.valid || title.pristine" class="alert alert-danger">
              Title is required
            </div>
          </div>
        </div>

        <div *ngIf="model.type == 'link'">
          <div class="post-text form-group">
            <label for="link" class="col-sm-2 control-label">Link</label>
            <div class="col-sm-10">
              <input id="link" type="url" class="form-control" required
                [(ngModel)] = "model.link"
                ngControl = "link" #link="ngForm"
              >
              <div [hidden]="link.valid || link.pristine" class="alert alert-danger">
                Link is required
              </div>
            </div>
          </div>
        </div>

        <div class="post-textarea form-group">
          <label for="text" class="col-sm-2 control-label">Text</label>
          <div class="col-sm-10">
            <textarea type="text" class="form-control" rows="5" required
              [(ngModel)] = "model.text"
              ngControl = "text" #text="ngForm"
            ></textarea>
            <div [hidden]="text.valid || text.pristine" class="alert alert-danger">
              Text is required
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-2 control-label">Group</label>
          <p class="form-control-static col-md-10">
            <span *ngIf="model.group">
              {{model.group.supergroup.name | uppercase}}/{{model.group.name}}
            </span>
            <span *ngIf="!model.group">
              <i>[No Group Selected]</i>
            </span>
          </p>
          <input id="group" type="text" class="hidden" required
            [(ngModel)] = "model.group"
            ngControl = "group" #group="ngForm"
          >
          <div [hidden]="group.valid || !postForm.form.submitted" class="alert alert-danger">
            Group is required
          </div>
        </div>

        <!--
        <div class="post-text">
          <label for="group" class="">Search Group</label>
          <input id="group" type="text" class="" required
            [(ngModel)] = "model.superGroupSlashGroup"
            ngControl = "superGroupSlashGroup" #superGroupSlashGroup="ngForm"
            (keyup)="search(superGroupSlashGroup.value)"
          >
          <div [hidden]="superGroupSlashGroup.valid || superGroupSlashGroup.pristine" class="alert alert-danger">
            Group is required
          </div>
        </div>
        -->

        <div class="post-text form-group" *ngIf="_showGroupSearchBox">
          <label for="group" class="col-sm-2 control-label">Search Groups (and click on the name to select)</label>
          <div class="col-sm-10">
            <input id="group" type="text" class="form-control"
              ngControl = "searchGroupTmp" #searchGroupTmp="ngForm"
              (keyup)="search(searchGroupTmp.value)"
            >
            <!--
            <div [hidden]="_searchGroup.valid || _searchGroup.pristine" class="alert alert-danger">
              Group is required
            </div>
            -->
          </div>
        </div>

        <ul>
        <li *ngFor="let item of items | async" (click)="selectSuperGroupSlashGroup(item)" class="form-control-static">{{item.supergroup.name | uppercase}}/{{item.name}}</li>
        <!--
        <li *ngFor="#item of itemsV1" (click)="selectSuperGroupSlashGroup(item.super_group.name+'/'+item.name)">{{item.super_group.name}}/{{item.name}}</li>
        -->
        </ul>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button (click)="onSubmit($event)" class="btn btn-default" [disabled]="!postForm.form.valid">Submit</button>
            <button (click)="goBack()" class="btn btn-default">Back</button>
          </div>
        </div>
      </form>
    </div>

  </div>
  `,
  styles: [`
    .my-new-post .ng-valid[required] {
      border-left: 5px solid #42A948; /* green */
    }
    .my-new-post .ng-invalid {
      border-left: 5px solid #a94442; /* red */
    }
    .my-new-post form {
      min-width: 250px;
    }
    .my-new-post .post-textarea textarea{
      width: 100%;
    }
    .my-new-post .post-text input{
      width: 100%;
    }
    .my-new-post .post-select select{
      width: 100%;
    }
  `],
  inputs: ['post'],
  directives: [ErrorComponent]
})
export class NewPostComponent {

  private _postTypes          = ['text', 'link'];
  private model               = null;
  private _errorMsg: string   = null;
  private _showGroupSearchBox = true;
  //private _searchGroup      = '';

  constructor(
    private _postService           : PostService,
    private _routeParams           : RouteParams,
    private _authenticationService : AuthenticationService,
    private _groupService          : GroupService,
    private _router                : Router,
    private _appService            : AppService
  )
  { }

  ngOnInit() {

    let super_group_name = this._routeParams.get('super_group_name');
    let group_name       = this._routeParams.get('group_name');

    let superGroupSlashGroup = null;
    if(super_group_name && group_name) {
      //superGroupSlashGroup = super_group_name + '/' + group_name;
      this._showGroupSearchBox = false;
      this._groupService.getGroup(super_group_name, group_name).subscribe(
        group => {
          console.log(group);
          this.model.group = group;
        },
        error => {
          this._showGroupSearchBox = true;
          console.log(error)
        })     // !subscribe
    }
    if(super_group_name && !group_name) {
      superGroupSlashGroup = super_group_name;
    }
    if(!super_group_name && group_name) {
      superGroupSlashGroup = group_name;
    }
    //this._searchGroup = superGroupSlashGroup;

    this.model =  {
      title: 'Post Title',
      link: '',
      text: 'Post Text',
      type: this._postTypes[0],
      group: superGroupSlashGroup,
    }

    // Only logged in uses can post
    this._authenticationService.loggedInUser$.subscribe(currentUser => {
      if(currentUser) {
        this.model.postedby = currentUser;
        this._errorMsg = null;
      } else {
        this._errorMsg = "User must be logged in to create new posts.";
      }
    });
    // Only logged in uses can post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this.model.postedby = currentUser;
      this._errorMsg = null;
    } else {
      this._errorMsg = "User must be logged in to create new posts.";
    }

  }

  /**
   * Auto complete super_group/group
   */
  // Final version
  private _searchTermStream = new Subject<string>();
  search(term: string) {
    this._searchTermStream.next(term);
    console.log(term)
  }
  items:Observable<string> = this._searchTermStream
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap((term:string) => this._groupService.searchGroups(term));

  /*
  // Temporary local version
  private items: Group[];
  search(term: string) {
    // get a 1 or 2 element array, correponding to trerm before and after a '/'
    // filter empty "" strings
    let termArray = term.split('/').slice(0, 2).filter(Boolean);
    this._groupService.searchGroups(termArray).then(
      searchResult => this.items = searchResult
    ).catch(
      err => console.log(err)
    )
  }
  */

  /**
   * User clicked on a gog/group from the autocomplete dropdown list
   */
  selectSuperGroupSlashGroup(item) {
    this.model.group = item;
    //this.model.superGroupSlashGroup = item.supergroup.name+'/'+item.name;
  }

  /**
   * Submit the new post form
   */
  onSubmit(event) {

    event.preventDefault();

    if(!this.model.group) return;

    let properModel = {
      title    : this.model.title,
      link     : this.model.link || null,
      text     : this.model.text || null,
      type     : this.model.type,
      postedby : this.model.postedby.id,
      group    : this.model.group.id
    }

    console.log(properModel);

    this._postService.createNewPost(properModel).subscribe(
      post => {
        console.log(post);
        this._router.navigate(['ViewPost', {postid: post.id}]);
      },
      error => {
        this._errorMsg = error;
        console.log(error);
      });
  }

  goBack() {
    window.history.back();
  }

}
