import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
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

@Component({
  selector: 'my-view-post',
  template: `
    <div class="my-view-post">

      <div *ngIf="post">

        <my-post [post]="post" [type]="postTemplateType" [currentUser]="_currentUser"></my-post>

        <!-- split it into comment-list component if need to reuse -->
        <div> <!-- comments start -->
          <!-- Replies to Post -->
          <div class="comment-list level-1">
            <div *ngFor="let comment1 of post.comments" class="comment-level-1">
              <my-comment1 [comment1]="comment1" [post]="post"></my-comment1>

              <!-- Replies to comments (Level 2) -->
              <div *ngIf="comment1.comments && comment1.comments.length > 0" class="comment-list level-2">
                <div *ngFor="let comment2 of comment1.comments" class="comment-level-2">
                  <my-comment2 [comment2]="comment2" [post]="post"></my-comment2>

                  <!-- Replies to reply (Level 3) -->
                  <div *ngIf="comment2.comments && comment2.comments.length > 0" class="comment-list level-3">
                    <div *ngFor="let comment3 of comment2.comments" class="comment-level-3">
                      <my-comment3 [comment3]="comment3" [post]="post"></my-comment3>

                      <!-- Replies to reply (Level 3) -->
                      <div *ngIf="comment3.comments && comment3.comments.length > 0" class="comment-list level-4">
                        <div *ngFor="let comment4 of comment3.comments" class="comment-level-3">
                          <my-comment4 [comment4]="comment4" [post]="post"></my-comment4>

                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>  <!-- end comments -->

      </div>  <!-- end ifPost -->
    </div>
  `,
  styles: [`
  .my-view-post .comment-level-1 {
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding: 10px 0;
  }
  .my-view-post .comment-list .level-2 {
    padding: 10px 10px 0px 40px;
  }
  .my-view-post .comment-list .level-3 {
    padding: 10px 10px 0px 40px;
  }
  .my-view-post .comment-list .level-4 {
    padding: 10px 10px 0px 40px;
  }
  `],
  //styleUrls: ['app/post/view-post.component.css'],
  directives: [PostComponent, Comment1Component, Comment2Component, Comment3Component, Comment4Component]
  //////inputs: ['post']////
})
export class ViewPostComponent {

  private post: Post;
  private postTemplateType: any = null;
  private _loggedInUserSubcription = null;
  private _currentUser = null;
  private _errorMsg = null;

  constructor(
    private _appService: AppService,
    private _postService: PostService,
    private _routeParams: RouteParams,
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
        this._errorMsg = error;
      });
    // Only logged in uses view post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
      this._currentUser = currentUser;
      this._errorMsg = null;
    // Logged in or not fetch post immidiately
    this.getPosts(postId);
  }

  getPosts(postId: any) {
    this._postService.getPost(postId).subscribe(
      post => {
        this.post = post;
      },
      error => {
        //console.log(error);
        this._errorMsg = error;
      });
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
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
