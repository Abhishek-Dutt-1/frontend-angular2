import {Component, OnInit} from '@angular/core';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
import {AppService} from '../app.service';
import {Post} from './post';
import {PostService} from './post.service';
import {PostComponent} from './post.component';
import {Comment1Component} from '../comment1/comment1.component';
import {Comment2Component} from '../comment2/comment2.component';
import {Comment3Component} from '../comment3/comment3.component';
import {Comment4Component} from '../comment4/comment4.component';
import {PostTemplateType} from './post-template-types';
import {AuthenticationService} from '../authentication/authentication.service';
import {FabButtonComponent} from '../misc/fab-button.component';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-view-post',
  template: `
    <div class="my-view-post">
      <div *ngIf="post">

        <div *ngIf="_sticky" class="dummy-div"></div>
        <div class="group-details" [ngClass]="{sticky: _sticky}">
          <div class="group-details-panel">
            <div class="row border-row">
              <div class="col-xs-12 group-name-row">
                <div class="supergroup-name pull-left">
                  <div>
                    <a class="menu-link" [routerLink]="[ '/HyperGroupPostList', { geo: _hyper_group } ]">
                      <i class="fa" [ngClass]="{'fa-plane': _hyper_group == 'international', 'fa-train': _hyper_group == 'national', 'fa-bus': _hyper_group === 'state', 'fa-car': _hyper_group === 'city', 'fa-bicycle': _hyper_group === 'local' }"></i> /
                    </a>
                    <a [routerLink]="['SuperGroupPostList', {super_group_name: _super_group.name}]">
                      {{_super_group.name}} / <small class="hidden">{{_super_group.description}}</small>
                    </a>
                    <a [routerLink]="['ViewGroup', {super_group_name: _group.supergroup.name, group_name: _group.name}]">
                      {{_group.name}} / <small class="hidden">{{_group.description}}</small>
                    </a>
                  </div>
                </div>

                <div class="pull-right">
                  <div class="new-post pull-right hidden-xs">
                    <div>
                      <a class="btn btn-sm btn-default new-post-button" [routerLink]="[ 'NewPost', {super_group_name: _group.supergroup.name, group_name: _group.name} ]">
                        <i class="fa fa-pencil" aria-hidden="true"></i> &nbsp;New Post
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>    <!-- ! group-details-panel -->
        </div>    <!-- group-details -->

        <div class="row">
          <div class="col-xs-12">
            <my-post [post]="post" [type]="postTemplateType" [currentUser]="_currentUser" [view]="_view"></my-post>
          </div>
        </div>

        <!-- split it into comment-list component if need to reuse -->
        <div class="row"> <!-- comments start -->
          <div class="col-xs-12">
            <!-- Replies to Post -->
            <div class="comment-list level-1">

              <my-error [_errorMsg]="_errorMsg" [_errorType]="_errorType"></my-error>

              <div *ngFor="let comment1 of post.comments" class="comment-level-1">
                <div class="row">
                  <div class="col-xs-12">
                    <div class="comment1-container">
                      <my-comment1 [comment1]="comment1" [post]="post" [currentUser]="_currentUser"></my-comment1>
                    </div>

                    <!-- Replies to comments (Level 2) -->
                    <div *ngIf="comment1.comments && comment1.comments.length > 0" class="comment-list level-2">
                      <div *ngFor="let comment2 of comment1.comments" class="comment-level-2">

                        <div class="row">
                          <div class="col-xs-12">
                            <div class="comment2-container">
                              <my-comment2 [comment2]="comment2" [post]="post" [currentUser]="_currentUser"></my-comment2>
                            </div>

                            <!-- Replies to reply (Level 3) -->
                            <div *ngIf="comment2.comments && comment2.comments.length > 0" class="comment-list level-3">
                              <div *ngFor="let comment3 of comment2.comments" class="comment-level-3">

                                <div class="row">
                                  <div class="col-xs-12">
                                    <div class="comment3-container">
                                      <my-comment3 [comment3]="comment3" [post]="post" [currentUser]="_currentUser"></my-comment3>
                                    </div>

                                    <!-- Replies to reply (Level 3) -->
                                    <div *ngIf="comment3.comments && comment3.comments.length > 0" class="comment-list level-4">
                                      <div *ngFor="let comment4 of comment3.comments" class="comment-level-4">

                                        <div class="row">
                                          <div class="col-xs-12">
                                            <div class="comment4-container">
                                              <my-comment4 [comment4]="comment4" [post]="post" [currentUser]="_currentUser"></my-comment4>
                                            </div>
                                          </div>
                                        </div>

                                      </div>      <!-- comment-list-4 -->
                                    </div>

                                  </div>
                                </div>

                              </div>      <!-- comment-list-3 -->
                            </div>

                          </div>
                        </div>

                      </div>     <!-- comment-level-2 -->
                    </div>

                  </div>
                </div>

              </div>    <!-- comment-level-1 -->
            </div>

          </div>
        </div>  <!-- end comments -->

        <div class="fab-button visible-xs-block">
          <my-fab-button (clicked)='gotoNewPostForm($event)'></my-fab-button>
        </div>

      </div>  <!-- end ifPost -->
    </div>
  `,
  styles: [`
  .my-view-post .dummy-div {
    /** dummy div should be the exact height of the sticky div
     * this is to prevent jumping of the page
     */
    height: 55px;
  }
  .my-view-post .sticky {
    position: fixed;
    top: 0;
    background-color: rgba(255, 255, 255, 0.98);
    z-index: 10;
    margin-left: -15px;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.05); */
  }
  .my-view-post .comment-level-1 {
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding: 20px 0;
  }
  .my-view-post .comment-list .level-2 {
    padding: 0px 0px 0px 40px;
  }
  .my-view-post .comment-list .level-3 {
    padding: 0px 0px 0px 40px;
  }
  .my-view-post .comment-list .level-4 {
    padding: 0px 0px 0px 40px;
  }
  .my-view-post .group-name-row {
    margin: 15px 0;
  }
  .my-view-post .supergroup-name {
    transition: 0.05s ease-in-out;
    display: block;
    vertical-align: baseline;
    letter-spacing: 1px;
    font-size: 18px;
    font-family: WorkSans,sans-serif;
    overflow-wrap: break-word;
    word-wrap: break-word;
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }
  .my-view-post .supergroup-name a {
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }
  .my-view-post .border-row {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .my-view-post .post-list-area {
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
  .my-view-post .new-post {
    /* padding-top: 15px; */
  }
  .my-view-post .new-post-button {
    padding: 3px 15px 3px 10px;
    color: #af2b2b;
  }
  .my-view-post .add-supergroups-button {
    padding-right: 10px;
  }
  .my-view-post .comment1-container, .comment2-container, .comment3-container, .comment4-container{
    margin-bottom: 20px;
  }
  `],
  //styleUrls: ['app/post/view-post.component.css'],
  directives: [RouterLink, PostComponent, ErrorComponent, FabButtonComponent, Comment1Component, Comment2Component, Comment3Component, Comment4Component]
  //////inputs: ['post']////
})
export class ViewPostComponent {

  private post: Post;
  private postTemplateType: any = null;
  private _loggedInUserSubcription = null;
  private _currentUser = null;
  private _errorMsg = null;
  private _errorType = null;
  private _group = null;
  private _super_group = null;
  private _hyper_group = null;
  private _sticky:boolean = false;
  private _view = "post";

  constructor(
    private _appService: AppService,
    private _postService: PostService,
    private _routeParams: RouteParams,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    let postId = this._routeParams.get('postid');
    //console.log(PostTemplateType)
    this.postTemplateType = PostTemplateType.Main;

    // Only logged in uses view posts
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(
      currentUser => {
        this._currentUser = currentUser;
        this._errorMsg = null;
        this.getPosts(postId);
      },
      error => {
        this._errorType = "danger";
        this._errorMsg = error;
      });
    // Only logged in uses view post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
      this._currentUser = currentUser;
      this._errorMsg = null;
    // Logged in or not fetch post immidiately
    this.getPosts(postId);

    // Sticky header. Ref: Geo-filter component for details
    window.addEventListener("scroll", this.myEfficientFn);
  }

  myEfficientFn = this.debounce( () => {
	  // All the taxing stuff you do
    this._sticky = window.scrollY > 60;
    //console.log(this._sticky)
  }, 100, false);
  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }

  getPosts(postId: any) {
    this._postService.getPost(postId).subscribe(
      post => {
        //console.log(post)
        this.post = post;
        this._group = post.group;
        this._super_group = post.group.supergroup;
        this._hyper_group = post.group.supergroup.type;
        if ( this._hyper_group == 'international' ) {
          if ( this._currentUser && this._currentUser.national.find( group => group.id === this._super_group.id ) ) {
            this._hyper_group = 'national'
          }
        }
        if ( this.post.comments.length == 0 ) {
          this._errorMsg = "There are no comments on this post. You can post the first by clicking 'Reply'.";
          this._errorType = "info";
        }
      },
      error => {
        //console.log(error);
        this._errorType = "danger";
        this._errorMsg = error;
      });
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
    window.removeEventListener("scroll", this.myEfficientFn);
  }

  gotoNewPostForm() {
    this._router.navigate(['NewPost', {super_group_name: this._group.supergroup.name, group_name: this._group.name}]);
  }

  /*
  goBack() {
    window.history.back();
  }

  upVotePost(id:number) {
    this.post.upvotes++
    this._postService.upVotePost(id)
  }

  downVotePost(id:number) {
    this.post.downvotes++
    this._postService.downVotePost(id)
  }
  */
}
