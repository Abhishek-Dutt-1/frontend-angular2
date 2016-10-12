/**
 * Displays a single post
 */
import {Component, OnInit, EventEmitter} from '@angular/core';
import {Post} from './post';
import {Router, RouterLink} from '@angular/router-deprecated';
import {PostService} from './post.service';
import {PostTemplateType} from './post-template-types';
import {VoteComponent} from '../misc/vote.component';
import {DateFormatPipe} from '../misc/date-format.pipe';
import {PostMetaPanelComponent} from './post-meta-panel.component';
import {ErrorComponent} from '../misc/error.component';
import {AppService} from '../app.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-post',
  template: `
  <div *ngIf="post">
  <div class="my-post">

    <my-error [_error]="_error"></my-error>

    <div *ngIf="type === templateTypeList || type === templateTypeGroupList" class="row">

      <div class="col-xs-12 visible-xs-block visible-sm-block">
        <div class="post-container">

          <div class="row">
            <div class="col-xs-12">
              <a [routerLink]="['ViewPost', {postid: post.id}]" class="post-title">
                <span>{{post.title}}</span>
              </a>    <!--
              <span *ngIf="post.type === 'link'" class="post-type-link">
                <a target="_blank" [href]="post.link">[view link]</a>
              </span> -->
            </div>
          </div>

          <div class="row" *ngIf="post.image">
            <div class="col-xs-12">
              <div class="post-image post-image-list-view">
                <a [routerLink]="['ViewPost', {postid: post.id}]">
                  <img src="{{post.image}}" class="img-responsive img-rounded">
                </a>
              </div>
            </div>
          </div>

          <div class="row" *ngIf="post.type === 'link'" >
            <div class="col-xs-12">
              <div class="post-type-link">
                <a target="_blank" [href]="post.link">View link <i class="fa fa-external-link" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>

          <div class="row" *ngIf="post.text">
            <div class="col-xs-12">
              <div class="post-text">
                <div *ngIf="_textTrimmed" class="post-text-wrap1">{{_textTrimmed}}
                  <div class="read-more">
                    <a [routerLink]="['ViewPost', {postid: post.id}]">Read more ...</a>
                  </div>
                </div>
                <div *ngIf="!_textTrimmed" class="post-text-wrap1">{{post.text}}</div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <my-post-meta-panel [post]="post" [currentUser]="currentUser" [type]="type" [view]="view"></my-post-meta-panel>
            </div>
          </div>     <!-- ! row -->

          <div class="row">
            <div class="col-xs-12">
              <div class="vote-container-horiz">
                <my-vote [_votee]='post' (upVote)='upVotePost($event)' (downVote)='downVotePost($event)'></my-vote>
              </div>
            </div>
          </div>

        </div>      <!-- !post-container -->
      </div>      <!-- !visible-xs/sm-block -->

      <div class="col-xs-12 hidden-xs hidden-sm">
        <div class="post-container">

          <div class="row">

            <div class="col-xs-1">
              <div class="row">
                <div class="col-xs-12">
                  <div class="vote-container">
                    <my-vote [_votee]='post' (upVote)='upVotePost($event)' (downVote)='downVotePost($event)'></my-vote>
                  </div>
                </div>
              </div>
            </div>

            <div [ngClass]="{ 'col-xs-9' : post.image, 'col-xs-10' : !post.image }">

              <div class="row">
                <div class="col-xs-12">
                  <a [routerLink]="['ViewPost', {postid: post.id}]" class="post-title">
                    <span>{{post.title}}</span>
                  </a>    <!--
                  <span *ngIf="post.type === 'link'" class="post-type-link">
                    <a target="_blank" [href]="post.link">[view link]</a>
                  </span>     -->
                </div>
              </div>

              <div class="row" *ngIf="post.type === 'link'">
                <div class="col-xs-12">
                  <div class="post-type-link">
                    <a target="_blank" [href]="post.link">View link <i class="fa fa-external-link" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>

              <div class="row" *ngIf="post.text">
                <div class="col-xs-12">
                  <div class="post-text">
                    <div *ngIf="_textTrimmed" class="post-text-wrap1">{{_textTrimmed}}
                      <div class="read-more"><a [routerLink]="['ViewPost', {postid: post.id}]">Read more ...</a></div>
                    </div>
                    <div *ngIf="!_textTrimmed" class="post-text-wrap1">{{post.text}}</div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-12">
                  <my-post-meta-panel [post]="post" [currentUser]="currentUser" [type]="type" [view]="view"></my-post-meta-panel>
                </div>
              </div>     <!-- ! row -->

            </div>

            <div class="col-xs-2 post-image-md-col">
                <div class="row" *ngIf="post.image">
                  <div class="col-xs-12">
                    <div class="post-image-md">
                      <a [routerLink]="['ViewPost', {postid: post.id}]">
                        <img src="{{post.image}}" class="img-responsive img-rounded">
                      </a>
                    </div>
                  </div>
                </div>
            </div>

          </div>

        </div>      <!-- !post-container -->
      </div>        <!-- !hidden-xs/sm -->

    </div>     <!-- ! ngIf-row -->


    <div *ngIf="type === templateTypeMain" class="row">

      <div class="col-xs-12 visible-xs-block visible-sm-block">
        <div class="post-container">

          <div class="row">
            <div class="col-xs-12">
              <a [routerLink]="['ViewPost', {postid: post.id}]" class="post-title">
                <span>{{post.title}}</span>
              </a><!--
              <span *ngIf="post.type === 'link'" class="post-type-link">
                <a target="_blank" [href]="post.link">[view 2 link]</a>
              </span>  -->
            </div>
          </div>

          <div class="row" *ngIf="post.image">
            <div class="col-xs-12">
              <div class="post-image" (click)="togglePostImageSize()" [ngClass]="{ 'post-image-max-height' : _togglePostImageSize, 'post-image-less-height' : !_togglePostImageSize  }">
                  <img src="{{post.image}}" class="img-responsive img-rounded">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <div *ngIf="post.type === 'link'" class="post-type-link">
                <a target="_blank" [href]="post.link">View link <i class="fa fa-external-link" aria-hidden="true"></i></a>
              </div>
            </div>
          </div>

          <div class="row" *ngIf="post.text">
            <div class="col-xs-12">
              <div class="post-text">
                <div *ngIf="_readmore" class="post-text-wrap">
                  {{_textTrimmed}}
                  <div class="read-more" (click)="_readmore = false">
                    Show more ...
                  </div>
                </div>
                <div *ngIf="!_readmore" class="post-text-wrap">
                  {{post.text}}
                  <div *ngIf="_textTrimmed" class="read-more" (click)="_readmore = true">
                    Show less
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <my-post-meta-panel [post]="post" [currentUser]="currentUser" [type]="type" [view]="view"></my-post-meta-panel>
            </div>
          </div>     <!-- ! row -->

          <div class="row">
            <div class="col-xs-12">
              <div class="vote-container-horiz">
                <my-vote [_votee]='post' (upVote)='upVotePost($event)' (downVote)='downVotePost($event)'></my-vote>
              </div>
            </div>
          </div>

        </div>      <!-- !post-container -->
      </div>      <!-- !visible-xs/sm-block -->

      <div class="col-xs-12 hidden-xs hidden-sm">
        <div class="post-container">

          <div class="row">

            <div class="col-xs-1">
              <div class="row">
                <div class="col-xs-12">
                  <div class="vote-container">
                    <my-vote [_votee]='post' (upVote)='upVotePost($event)' (downVote)='downVotePost($event)'></my-vote>
                  </div>
                </div>
              </div>
            </div>

            <div [ngClass]="{ 'col-xs-9' : post.image, 'col-xs-10' : !post.image }">

              <div class="row">
                <div class="col-xs-12">
                  <a [routerLink]="['ViewPost', {postid: post.id}]" class="post-title">
                    <span>{{post.title}}</span>
                  </a>
                </div>
              </div>

              <div class="row hidden1" *ngIf="post.image">
                <div class="col-xs-12">
                  <div class="post-image" (click)="togglePostImageSize()" [ngClass]="{ 'post-image-max-height' : _togglePostImageSize, 'post-image-less-height' : !_togglePostImageSize }">
                      <img src="{{post.image}}" class="img-responsive img-rounded">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-12">
                  <div *ngIf="post.type === 'link'" class="post-type-link">
                    <a target="_blank" [href]="post.link">View link <i class="fa fa-external-link" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>

              <div class="row" *ngIf="post.text">
                <div class="col-xs-12">
                  <div class="post-text">
                    <div *ngIf="_readmore" class="post-text-wrap">
                      {{_textTrimmed}}
                      <div class="read-more" (click)="_readmore = false">
                        Show more ...
                      </div>
                    </div>
                    <div *ngIf="!_readmore" class="post-text-wrap">
                      {{post.text}}
                      <div *ngIf="_textTrimmed" class="read-more" (click)="_readmore = true">
                        Show less
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12">
                  <my-post-meta-panel [post]="post" [currentUser]="currentUser" [type]="type" [view]="view"></my-post-meta-panel>
                </div>
              </div>     <!-- ! row -->
            </div>
<!--
            <div class="col-xs-2 post-image-md-col">
                <div class="row" *ngIf="post.image">
                  <div class="col-xs-12">
                    <div class="post-image-md">
                      <a [routerLink]="['ViewPost', {postid: post.id}]">
                        <img src="{{post.image}}" class="img-responsive img-rounded">
                      </a>
                    </div>
                  </div>
                </div>
            </div>
-->
          </div>

        </div>      <!-- !post-container -->
      </div>      <!-- !hidden-xs/sm -->

    </div>     <!-- ! ngIf-row -->

  </div>      <!-- my-post -->
  </div>      <!-- ngIfPost -->
  `,
  styles: [`
  .my-post > .row {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .my-post .post-container {
    /** border-bottom: 1px solid lightgrey; */
    padding-bottom: 35px;
    padding-top: 35px;
  }
  .my-post .post-container h5 {
    margin-bottom: 5px;
  }
  .my-post .post-container .post-title {
    color: rgba(0,0,0,.8);
    font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 27px;
    margin-left: -1.75px;
    line-height: 1.12;
    letter-spacing: -.022em;
    word-wrap: break-word;
  }
  .my-post .post-container .post-image {
    padding-top: 20px;
    cursor: pointer;
  }
  .my-post .post-container .post-image-list-view {
    max-height: 250px;
    overflow: hidden;
    opacity: 0.75;
    filter: alpha(opacity=75);
  }
  .my-post .post-container .post-image-less-height {
    max-height: 250px;
    overflow: hidden;
    opacity: 0.75;
    filter: alpha(opacity=75);
  }
  .my-post .post-container .post-image-max-height {
    max-height: initial;
    opacity: 1;
    filter: alpha(opacity=100);
  }
  .my-post .post-container .post-image-md-col {
    padding-left: 0;
  }
  .my-post .post-container .post-image-md {
    max-height: 124px;
    overflow: hidden;
    opacity: 0.75;
    filter: alpha(opacity=75);
  }
  .my-post .post-container .post-text {
    color: rgba(0, 0, 0, 0.8);
    display: block;
    font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
    font-size: 17px;
    font-style: normal;
    font-weight: normal;
    letter-spacing: -0.072px;
    line-height: 27px;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 15px;
    word-wrap: break-word;
    -webkit-font-smoothing: antialiased;
  }
  .my-post .post-container .post-type-link {
    padding-top: 20px;
    color: #af2b2b;
  }
  .my-post .post-container .post-type-link a {
    color: #af2b2b;
  }
  .my-post .post-container .post-text-wrap {
    /*white-space: pre-wrap; */
    white-space: pre-line;
  }
  .my-post .post-container .read-more {
    color: rgba(0, 0, 0, 0.4);
    display: block;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 11px;
    height: 25px;
    line-height: 25.2px;
    margin-top: 15px;
    margin-bottom: 0px;
    cursor: pointer;
  }
  .my-post .post-container .read-more a {
    color: rgba(0, 0, 0, 0.4);
  }
  .my-post .post-container .vote-container {
    margin-top: 5px;
  }
  .my-post .post-container .vote-container-horiz {
    margin-top: 15px;
  }
  `],
  inputs: ['post', 'type', 'currentUser', 'view', 'contextGroups'],
  outputs: ['updateUserScores'],
  directives: [RouterLink, VoteComponent, PostMetaPanelComponent, ErrorComponent],
  pipes: [DateFormatPipe]
})
export class PostComponent implements OnInit {

  private post                    : Post              = null;
  private type                    : string            = null;
  private templateTypeList        : PostTemplateType  = null;
  private templateTypeGroupList   : PostTemplateType  = null;
  private templateTypeMain        : PostTemplateType  = null;
  private _processingVote         : Boolean           = false;
  private _readmore               : Boolean           = false;
  private _textTrimmed            : string            = null;
  private _error                                      = { msg: null, type: null };
  private _togglePostImageSize    : boolean           = false;
  public  updateUserScores        : EventEmitter<any> = new EventEmitter();    // User action changed Score, so update it all over the UI
  public  contextGroups           : any               = []
  constructor(
    private _appService: AppService,
    private _postService: PostService,
    private _authenticationService: AuthenticationService,
    private _router: Router) { }

  ngOnInit() {
    // TODO: Improve this   // :sync with post-meta-panel
    this.templateTypeList = PostTemplateType.List;
    this.templateTypeGroupList = PostTemplateType.Grouplist;
    this.templateTypeMain = PostTemplateType.Main;

    if ( this.post && this.post.text ) this.post.text = this.post.text.trim()
    let MAXCHARS = 250;
    if(this.post) this._readmore = false;
    if(this.post && this.post.text && this.post.text.length > MAXCHARS) {
      this._textTrimmed = this.post.text.substring(0, MAXCHARS) + ' ...';
      this._readmore = false;
      //this._showFullText = false;     // On Post page, initally hide full text
    }
  }

  gotoPost(id: number) {
    this._router.navigate(['ViewPost', {id: id}]);
  }

  /**
   * User clicked upvote
   */
  upVotePost(id:number) {
    //console.log("Inside post comp upvoting ", id)
    if(this._processingVote) return;
    this._processingVote = true;
//console.log(this.contextGroups)
    let contextGroups = this.contextGroups.map( group => group.id );
    // Context Groups are used to calculate User's score depending on which  page the post is
    this._postService.upVotePost(id, contextGroups).subscribe(
      post => {
        this._processingVote = false;
        //this.post = post;
        this.post.upvotes = post.post.upvotes;
        this.post.downvotes = post.post.downvotes;
        this.post.currentUserHasUpVoted = post.post.currentUserHasUpVoted;
        this.post.currentUserHasDownVoted = post.post.currentUserHasDownVoted;
        //console.log("UpVote susccess");
        //console.log(post)
        this.updateUserScoresEvent( post.changedScores );
        this._error.msg = null;
      },
      error => {
        this._processingVote = false;
        //this._errorMsg = error;
        this._appService.createNotification( { text: error, type: 'danger' } );
      });
  }

  downVotePost(id:number) {
    //console.log("Inside post comp Down Voting ", id)
    if(this._processingVote) return;
    this._processingVote = true;

    let contextGroups = this.contextGroups.map( group => group.id );
    // Context Groups are used to calculate User's score depending on which  page the post is
    this._postService.downVotePost(id, contextGroups).subscribe(
      post => {
        this._processingVote = false;
        //this.post = post;
        this.post.upvotes = post.post.upvotes;
        this.post.downvotes = post.post.downvotes;
        this.post.currentUserHasUpVoted = post.post.currentUserHasUpVoted;
        this.post.currentUserHasDownVoted = post.post.currentUserHasDownVoted;
        //console.log("Down Vote susccess");
        this.updateUserScoresEvent( post.changedScores );
        this._error.msg = null;
      },
      error => {
        //console.log(error)
        this._processingVote = false;
        //this._errorMsg = error;
        this._appService.createNotification( { text: error, type: 'danger' } );
      });
  }

  /**
   *
   */
  updateUserScoresEvent( userScoreObj ) {
    //console.log("POST", userScoreObj)
    this.updateUserScores.next( userScoreObj );
    // Don't want to track current user in PostComponent also, so let AuthService find
    // the right user from the obj
    this._authenticationService.updateCurrentUsersScore( userScoreObj );
  }

  /**
   * User clicked on the post image in post view
   * So toggle the image size to show full size image if it is larger than max-height
   */
  togglePostImageSize() {
    this._togglePostImageSize = !this._togglePostImageSize;
  }

  ngOnDestroy() {
  }

}
