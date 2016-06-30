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

    <div>     <!--  *ng If="!_errorMsg" -->
      <h3>Create a New Post</h3>

      <form #postForm="ngForm" class="form-horizontal" novalidate>

        <div class="post-select form-group">
          <label for="type" class="col-sm-2 control-label">Post Type</label>
          <div class="col-sm-10">
            <span *ngFor="let postType of _postTypes">
              <label class="radio-inline">
                <input type="radio" name="type" (click)="model.type = postType" [checked]="postType === model.type"> {{postType | uppercase}} &nbsp;&nbsp;
              </label>
            </span>
          </div>
        </div>

        <div class="post-text form-group">
          <label for="title" class="col-sm-2 control-label">Title</label>
          <div class="col-sm-10">
            <input id="title" type="text" class="form-control" required
              [(ngModel)] = "model.title" placeholder="Post title"
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
                [(ngModel)] = "model.link" placeholder="Paste URL here"
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
              [(ngModel)] = "model.text" placeholder="Post text"
              ngControl = "text" #text="ngForm"
            ></textarea>
            <div [hidden]="text.valid || text.pristine" class="alert alert-danger">
              Text is required
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-2 control-label">Group</label>
          <div class="col-sm-10">
            <div class="">
              <p class="form-control-static">
                <span *ngIf="model.group">
                  {{model.group.supergroup.name | uppercase}}/{{model.group.name}}
                </span>
                <span *ngIf="!model.group"><i>No Group Selected</i></span>
              </p>
              <input id="group" type="text" class="hidden" required
                [(ngModel)] = "model.group"
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
                  {{item.supergroup.name | uppercase}}/{{item.name}}
                </button>
              </div>
            </div>      <!-- ! row -->

          </div>    <!-- col-sm-10 -->
        </div>      <!-- ! form-group -->

        <div class="post-as-anon form-group">
          <label for="post-as-anon" class="col-sm-2 control-label">Post As Anonymous</label>
          <div class="col-sm-10">
            <label  class="radio-inline">
              <input type="radio" name="post-as-anon" (click)="model.post_as_anon = 1"  [checked]="model.post_as_anon === 1"> Yes
            </label>
            <label  class="radio-inline">
              <input type="radio" name="post-as-anon" (click)="model.post_as_anon = 0" [checked]="model.post_as_anon === 0"> No
            </label>
          </div>
        </div>

        <my-error [_errorMsg]="_errorMsg"></my-error>

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
    .my-new-post .search-group-label {
      color: rgba(0, 0, 0, 0.4);
    }
    .my-new-post .search-results {
       margin: 10px 10px 0 0;
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
  private _loggedInUserSubcription = null;
  private _searchString       = '';

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

    let super_group_name = this._routeParams.get('super_group_name') || null;
    let group_name       = this._routeParams.get('group_name') || null;

    let superGroupSlashGroup = null;
    if(super_group_name && group_name) {
      //superGroupSlashGroup = super_group_name + '/' + group_name;
      this._showGroupSearchBox = false;
      this._groupService.getGroup(super_group_name, group_name).subscribe(
        group => {
          this.model.group = group;
        },
        error => {
          this._showGroupSearchBox = true;
        })     // !subscribe
    }
    if(super_group_name && !group_name) {
      this._searchString = super_group_name + '/';
      //superGroupSlashGroup = super_group_name;
    }
    /*
    if(!super_group_name && group_name) {
      superGroupSlashGroup = group_name;
    }
    */
    //this._searchGroup = superGroupSlashGroup;

    this.model =  {
      title: '',
      link: '',
      text: '',
      type: this._postTypes[0],
      //group: superGroupSlashGroup,
      post_as_anon: 0
    }

    // Only logged in uses can post
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(currentUser => {
      if(currentUser) {
        this.model.postedby = currentUser;
        this._errorMsg = null;
        this.search(this._searchString);    // <-- This works
      } else {
        this._errorMsg = "User must be logged in to create new posts.";
      }
    });
    // Only logged in uses can post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if( currentUser ) {
      this.model.postedby = currentUser;
      this._errorMsg = null;
      this.search(this._searchString);      // <-- This does not works
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
      group    : this.model.group.id,
      post_as_anon : this.model.post_as_anon ? true : false
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

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }

  goBack() {
    window.history.back();
  }

}
