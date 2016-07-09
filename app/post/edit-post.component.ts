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
  selector: 'my-edit-post',
  template: `
  <div class="my-edit-post">

    <div *ngIf="_readyToEdit">     <!--  *ng If="!_errorMsg" -->

      <form #postForm="ngForm" class="form-horizontal" novalidate>

        <div class="post-select form-group">
          <div class="col-xs-12 col-sm-offset-2 col-sm-10">
            <h3>Edit Post</h3>
          </div>
        </div>

        <div class="post-select form-group">
          <label for="type" class="col-sm-2 control-label">Post Type</label>
          <div class="col-sm-10">
            <span *ngFor="let postType of _postTypes">
              <label class="radio-inline">
                <input type="radio" name="type" (click)="_model.type = postType" [checked]="postType === _model.type"> {{postType | uppercase}} &nbsp;&nbsp;
              </label>
            </span>
          </div>
        </div>

        <div class="post-text form-group">
          <label for="title" class="col-sm-2 control-label">Title</label>
          <div class="col-sm-10">
            <input id="title" type="text" class="form-control" required
              [(ngModel)] = "_model.title" placeholder="Post title"
              ngControl = "title" #title="ngForm"
            >
            <div [hidden]="title.valid || title.pristine" class="alert alert-danger">
              Title is required
            </div>
          </div>
        </div>

        <div *ngIf="_model.type == 'link'">
          <div class="post-text form-group">
            <label for="link" class="col-sm-2 control-label">Link</label>
            <div class="col-sm-10">
              <input id="link" type="url" class="form-control" required
                [(ngModel)] = "_model.link" placeholder="Paste URL here"
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
            <textarea type="text" class="form-control" rows="5"
              [(ngModel)] = "_model.text" placeholder="Post text"
              ngControl = "text" #text="ngForm"
            ></textarea>
            <div [hidden]="text.valid || text.pristine" class="alert alert-danger">
              Text is required
            </div>
          </div>
        </div>

        <div class="form-group hidden">
          <label class="col-sm-2 control-label">Group</label>
          <div class="col-sm-10">
            <div class="">
              <p class="form-control-static">
                <span *ngIf="_model.group">
                  {{_model.group.supergroup.name | uppercase}}/{{_model.group.name}}
                </span>
                <span *ngIf="!_model.group"><i>No Group Selected</i></span>
              </p>
              <input id="group" type="text" class="hidden" required
                [(ngModel)] = "_model.group"
                ngControl = "group" #group="ngForm">
              <div [hidden]="group.valid || !postForm.form.submitted" class="alert alert-danger">
                Group is required
              </div>
            </div>

            <div class="row" *ngIf="_showGroupSearchBox">
              <div class="col-xs-12">
                <div class="post-text form-group1">
                  <label for="group-search" class="search-group-label">Search Groups (and click on the name to select)</label>
                </div>
              </div>
              <div class="col-sm-12">
                <input id="group-search" type="text" class="form-control"
                  ngControl = "searchGroupTmp" #searchGroupTmp="ngForm" [(ngModel)]="_searchString"
                  (keyup)="search(searchGroupTmp.value)">
              </div>
              <div class="col-sm-12">
                <button class="btn btn-sm btn-default search-results" *ngFor="let item of items | async" (click)="selectSuperGroupSlashGroup(item)">
                  {{item.supergroup.name}}/{{item.name}}
                </button>
              </div>
            </div>      <!-- ! row -->

          </div>    <!-- col-sm-10 -->
        </div>      <!-- ! form-group -->

        <div class="post-as-anon form-group hidden">
          <label for="post-as-anon" class="col-sm-2 control-label">Post As Anonymous</label>
          <div class="col-sm-10">
            <label  class="radio-inline">
              <input type="radio" name="post-as-anon" (click)="_model.post_as_anon = 1"  [checked]="_model.post_as_anon === 1"> Yes
            </label>
            <label  class="radio-inline">
              <input type="radio" name="post-as-anon" (click)="_model.post_as_anon = 0" [checked]="_model.post_as_anon === 0"> No
            </label>
          </div>
        </div>

        <div *ngIf="_model.postedby && _model.group">
          <div class="sticky-post form-group" [ngClass]="{ hidden: _model.group.owner !== _model.postedby.id }">
            <label for="sticky-post" class="col-sm-2 control-label">Sticky Post</label>
            <div class="col-sm-10">
              <label  class="radio-inline">
                <input type="radio" name="sticky-post" (click)="_model.sticky_post = 1"  [checked]="_model.sticky_post === 1"> Yes
              </label>
              <label  class="radio-inline">
                <input type="radio" name="sticky-post" (click)="_model.sticky_post = 0" [checked]="_model.sticky_post === 0"> No
              </label>
            </div>
          </div>
        </div>

        <div class="post-select form-group">
          <div class="col-xs-12 col-sm-offset-2 col-sm-10">
            <my-error [_errorMsg]="_errorMsg"></my-error>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button (click)="onSubmit($event)" class="btn btn-default" [disabled]="!postForm.form.valid">Update Post</button>
            <button (click)="goBack()" class="btn btn-default">Back</button>
          </div>
        </div>
      </form>
    </div>

  </div>
  `,
  styles: [`
    .my-edit-post .ng-valid[required] {
      border-left: 5px solid #42A948; /* green */
    }
    .my-edit-post .ng-invalid {
      border-left: 5px solid #a94442; /* red */
    }
    .my-edit-post form {
      min-width: 250px;
    }
    .my-edit-post .post-textarea textarea{
      width: 100%;
    }
    .my-edit-post .post-text input{
      width: 100%;
    }
    .my-edit-post .post-select select{
      width: 100%;
    }
    .my-edit-post .search-group-label {
      color: rgba(0, 0, 0, 0.4);
    }
    .my-edit-post .search-results {
       margin: 10px 10px 0 0;
     }
  `],
  inputs: ['post'],
  directives: [ErrorComponent]
})
export class EditPostComponent {

  private _postTypes          = ['text', 'link'];
  private _model               = null;
  private _errorMsg: string   = null;
  private _showGroupSearchBox = true;
  //private _searchGroup      = '';
  private _loggedInUserSubcription = null;
  private _searchString       = '';
  private _post = null;
  private _readyToEdit = false;
  private _currentUser = null;

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

    let postId = this._routeParams.get('postid') || null;

    if( postId ) {
      this._postService.getPost(postId).subscribe(
        post => {
          this._model = post;
          this._model.post_as_anon = 0;
          if ( this._currentUser ) this._readyToEdit = true;
        },
        error => {
          this._errorMsg = error;
        })     // !subscribe
    }

    // Only logged in uses can post
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(currentUser => {
      if(currentUser) {
        this._currentUser = currentUser;
        this._errorMsg = null;
        //  if ( ! currentUser.emailverified ) this._errorMsg = "Users must have a verified email to edit posts.";
        if ( this._model ) this._readyToEdit = true;
      } else {
        this._errorMsg = "User must be logged in to edit posts.";
        this._readyToEdit = false;
      }
    });
    // Only logged in uses can post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if( currentUser ) {
      this._currentUser = currentUser;
      this._errorMsg = null;
      // this._model.postedby = currentUser;
      if ( this._model ) this._readyToEdit = true;
      // if ( ! currentUser.emailverified ) this._errorMsg = "Users must have a verified email to edit posts.";
    } else {
      this._errorMsg = "User must be logged in to edit posts.";
      this._readyToEdit = false;
    }

  }

  /**
   * Auto complete super_group/group
   */
  // Final version
  private _searchTermStream = new Subject<string>();
  search(term: string) {
    this._searchTermStream.next(term);
  }
  items:Observable<string> = this._searchTermStream
    .debounceTime(500)
    .distinctUntilChanged()
    .switchMap((term:string) => this._groupService.searchGroups(term));

  /**
   * User clicked on a gog/group from the autocomplete dropdown list
   */
  selectSuperGroupSlashGroup(item) {
    this._model.group = item;
    //this.model.superGroupSlashGroup = item.supergroup.name+'/'+item.name;
  }

  /**
   * Submit the new post form
   */
  onSubmit(event) {

    event.preventDefault();

    if( !this._model.group || !this._model.postedby ) return;

    let properModel = {
      id       : this._model.id,
      title    : this._model.title,
      link     : this._model.link || null,
      text     : this._model.text || null,
      type     : this._model.type,
      postedby : this._model.postedby.id,
      group    : this._model.group.id,
      post_as_anon : this._model.post_as_anon ? true : false,
      sticky_level : this._model.sticky_post ? 1 : 0     // 1 for group, 0 for no sticky
    }

    console.log(properModel);

    this._postService.editPost(properModel).subscribe(
      post => {
        console.log(post);
        this._router.navigate(['ViewPost', {postid: post.id}]);
      },
      error => {
        this._errorMsg = error;
        console.log(error);
      });
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }

  goBack() {
    window.history.back();
  }

}
