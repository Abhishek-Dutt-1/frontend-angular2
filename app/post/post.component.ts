/**
 * Displays a single post
 */
import {Component, OnInit} from '@angular/core';
import {Post} from './post';
import {Router, RouterLink} from '@angular/router-deprecated';
import {PostService} from './post.service';
import {PostTemplateType} from './post-template-types';
import {VoteComponent} from '../misc/vote.component';
import {DateFormatPipe} from '../misc/date-format.pipe';


@Component({
  selector: 'my-post',
  template: `
  <div *ngIf="post">
  <div class="my-post">

    <div *ngIf="type === templateTypeList || type === templateTypeGroupList" class="row">
      <div class="col-xs-12">
        <div class="post-container">

          <div class="row">
            <div class="col-xs-12">
              <a [routerLink]="['ViewPost', {postid: post.id}]" class="post-title">
                <span>{{post.title}}</span>
              </a>
              <span *ngIf="post.type === 'link'" class="post-type-link">
                <a target="_blank" [href]="post.link">[view link]</a>
              </span>
            </div>
          </div>

          <div class="row" *ngIf="post.text">
            <div class="col-xs-12">
              <div class="post-text">
                <div *ngIf="_textTrimmed">
                  {{_textTrimmed}}
                  <div class="read-more">
                    Read more ...
                  </div>
                </div>
                <div *ngIf="!_textTrimmed">
                  {{post.text}}
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <div class="post-info">

                <div class="">
                  <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                    <div class="profile-image pull-left">
                      <img *ngIf="post.postedby.profileimage" src="{{post.postedby.profileimage}}" class="profileimage">
                    </div>
                  </a>
                </div>
                <div class="post-info-text pull-left">
                  <div class="profile-name pull-left">
                    <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                      {{post.postedby.displayname}}
                    </a>
                  </div>
                  <div *ngIf="type != templateTypeGroupList">
                    <div class="bullet pull-left"> in </div>
                    <div class="post-grouplink pull-left">
                      <a class="" [routerLink]="['ViewGroup', {super_group_name: post.group.supergroup.name, group_name: post.group.name}]">
                        {{post.group.supergroup.name}}/{{post.group.name}}
                      </a>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                  <div class="post-createdat pull-left">
                    {{ post.createdAt | timeAgo }} &bull;
                  </div>
                  <div class="post-commentstotal pull-left">
                    {{post.comments.length}} Comments &bull; &nbsp;
                  </div>
                  <div class="post-delete pull-left">
                    <span *ngIf="currentUser && currentUser.id == post.postedby.id">
                      <a class="" [routerLink]="['ConfirmPostDelete', {postid: post.id}]">Delete</a>
                    </span>
                  </div>
                </div>

              </div>      <!-- ! post-info -->
            </div>
          </div>     <!-- ! row -->

          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <div class="vote-container">
                <my-vote [_votee]='post' (upVote)='upVotePost($event)' (downVote)='downVotePost($event)'></my-vote>
              </div>
            </div>
          </div>

        </div>      <!-- !post-container -->
      </div>
    </div>     <!-- ! ngIf-row -->



    <div *ngIf="false && type === templateTypeGroupList" class="row">
      <div class="col-xs-12">
        <div class="post-container">

          <div class="row">
            <div class="col-xs-12">
              <a [routerLink]="['ViewPost', {postid: post.id}]" class="post-title">
                <span>{{post.title}}</span>
              </a>
              <span *ngIf="post.type === 'link'">
                <a target="_blank" [href]="post.link">[view link]</a>
              </span>
            </div>
          </div>

          <div class="row" *ngIf="post.textTrimmed">
            <div class="col-xs-12">
              <div class="post-text">
                {{post.textTrimmed}}
              </div>
              <div class="read-more">
                Read more ...
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <div class="post-info">

                <div class="">
                  <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                    <div class="profile-image pull-left">
                      <!-- <i class="fa fa-user"></i> -->
                    </div>
                  </a>
                </div>
                <div class="pull-left">
                  <div class="profile-name pull-left">
                    <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                      {{post.postedby.displayname}}
                    </a>
                  </div>
                  <div class="bullet">&bull;</div>
                  <!--
                  <div class="post-grouplink">
                    <a class="" [routerLink]="['ViewGroup', {super_group_name: post.group.supergroup.name, group_name: post.group.name}]">
                      go/{{post.group.supergroup.name}}/{{post.group.name}}
                    </a>
                  </div>
                  -->
                  <div class="clearfix"></div>
                  <div class="post-createdat pull-left">
                    {{ post.createdAt | timeAgo }} &bull;
                  </div>
                  <div class="post-commentstotal pull-left">
                    {{post.comments.length}} Comments &bull; &nbsp;
                  </div>
                  <div class="post-delete pull-left">
                    <span *ngIf="currentUser && currentUser.id == post.postedby.id">
                      <a class="" [routerLink]="['ConfirmPostDelete', {postid: post.id}]">Delete</a>
                    </span>
                  </div>
                </div>

              </div>      <!-- ! post-info -->
            </div>
          </div>     <!-- ! row -->

          <div class="row">
            <div class="col-xs-12">
              <div class="vote-container">
                <my-vote [_votee]='post' (upVote)='upVotePost($event)' (downVote)='downVotePost($event)'></my-vote>
              </div>
            </div>
          </div>

        </div>      <!-- !post-container -->
      </div>
    </div>     <!-- ! ngIf-row -->


    <div *ngIf="type === templateTypeMain" class="row">

      <div class="col-xs-12">
        <div class="post-container">

          <div class="row">
            <div class="col-xs-12">
              <a [routerLink]="['ViewPost', {postid: post.id}]" class="post-title">
                <span>{{post.title}}</span>
              </a>
              <span *ngIf="post.type === 'link'" class="post-type-link">
                <a target="_blank" [href]="post.link">[view link]</a>
              </span>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12">
              <div class="post-text">
                <div *ngIf="_readmore">
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
              <div class="post-info">

                <div class="">
                  <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                    <div class="profile-image pull-left">
                      <!-- <i class="fa fa-user"></i> -->
                    </div>
                  </a>
                </div>
                <div class="post-info-text pull-left">
                  <div class="profile-name pull-left">
                    <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                      {{post.postedby.displayname}}
                    </a>
                  </div>
                  <div>
                    <div class="bullet pull-left"> in </div>
                    <div class="post-grouplink pull-left">
                      <a class="" [routerLink]="['ViewGroup', {super_group_name: post.group.supergroup.name, group_name: post.group.name}]">
                        {{post.group.supergroup.name}}/{{post.group.name}}
                      </a>
                    </div>
                  </div>
                  <div class="clearfix"></div>
                  <div class="post-createdat pull-left">
                    {{ post.createdAt | timeAgo }} &bull;
                  </div>
                  <div class="post-commentstotal pull-left">
                    {{post.comments.length}} Comments &bull; &nbsp;
                  </div>
                  <div class="post-delete pull-left">
                    <span *ngIf="currentUser && currentUser.id == post.postedby.id">
                      <a class="" [routerLink]="['ConfirmPostDelete', {postid: post.id}]">Delete</a>
                    </span>
                  </div>
                  <div class="post-reply"> &nbsp;&bull;
                    <a [routerLink]="['NewComment1', {postid: post.id}]" class="">
                      Reply
                    </a>
                  </div>
                </div>

              </div>      <!-- ! post-info -->
            </div>
          </div>     <!-- ! row -->

          <div class="row">
            <div class="col-xs-12">
              <div class="vote-container">
                <my-vote [_votee]='post' (upVote)='upVotePost($event)' (downVote)='downVotePost($event)'></my-vote>
              </div>
            </div>
          </div>

        </div>      <!-- !post-container -->
      </div>

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
    padding-bottom: 20px;
    padding-top: 20px;
  }
  .my-post .post-container h5 {
    margin-bottom: 5px;
  }
  .my-post .post-container .post-title {
    color: rgba(0,0,0,.8);
    font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 28px;
    margin-left: -1.75px;
    line-height: 1.12;
    letter-spacing: -.022em;
    word-wrap: break-word;
  }
  .my-post .post-container .post-text {
    color: rgba(0, 0, 0, 0.8);
    display: block;
    font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: normal;
    letter-spacing: -0.072px;
    line-height: 27px;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 8px;
    word-wrap: break-word;
    -webkit-font-smoothing: antialiased;
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
  }
  .my-post .post-info {
    font-size: 12px;
    margin-top: 15px;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  .my-post .post-container .profile-image {
    height: 32px;
    width: 32px;
    /* border: 1px solid lightgrey; */
    margin-top: 3px;
    overflow: hidden;
  }
  .my-post .post-container .profileimage {
    width: 32px;
  }
  .my-post .post-container .post-info .post-info-text {
    padding-left: 10px;
    width: 88%;
  }
  .my-post .post-container .profile-name {
    cursor: pointer;
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    height: auto;
    letter-spacing: normal;
    line-height: 19.6px;
    text-decoration: none;
    unicode-bidi: isolate;
    visibility: visible;
    white-space: nowrap;
    width: auto;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .my-post .post-container .post-grouplink {
    cursor: pointer;
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    line-height: 19.6px;
    text-decoration: none;
    /*
    width: 80%;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    */
  }
  .my-post .post-container .post-createdat {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    /* padding-left: 10px; */
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
  }
  .my-post .post-container .post-commentstotal {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    padding-left: 5px;
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
  }
  .my-post .post-container .post-reply {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    padding-left: 0px;
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
  }
  .my-post .post-container .bullet {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    line-height: 1.8;
    color: rgba(0, 0, 0, 0.439216);
    padding: 0 5px;
  }
  .my-post .post-container .vote-container {
    margin-top: 15px;
  }
  `],
  inputs: ['post', 'type', 'currentUser'],
  directives: [RouterLink, VoteComponent],
  pipes: [DateFormatPipe]
})
export class PostComponent implements OnInit {

  private post                    : Post             = null;
  private type                    : string           = null;
  private templateTypeList        : PostTemplateType = null;
  private templateTypeGroupList   : PostTemplateType = null;
  private templateTypeMain        : PostTemplateType = null;
  private _processingVote         : Boolean          = false;
  private _readmore               : Boolean          = false;
  private _textTrimmed            : string           = null;

  constructor(
    private _postService: PostService,
    private _router: Router) { }

  ngOnInit() {
    // TODO: Improve this
    this.templateTypeList = PostTemplateType.List;
    this.templateTypeGroupList = PostTemplateType.Grouplist;
    this.templateTypeMain = PostTemplateType.Main;

    let MAXCHARS = 250;
    if(this.post) this._readmore = false;
    if(this.post && this.post.text.length > MAXCHARS) {
      this._textTrimmed = this.post.text.substring(0, MAXCHARS) + ' ...';
      this._readmore = true;
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
    console.log("Inside post comp upvoting ", id)
    if(this._processingVote) return;
    this._processingVote = true;

    this._postService.upVotePost(id).subscribe(
      post => {
        this._processingVote = false;
        //this.post = post;
        this.post.upvotes = post.upvotes;
        this.post.downvotes = post.downvotes;
        this.post.currentUserHasUpVoted = post.currentUserHasUpVoted;
        this.post.currentUserHasDownVoted = post.currentUserHasDownVoted;
        console.log("UpVote susccess");
      },
      error => {
        console.log("Upvote unsuccess")
      });
  }

  downVotePost(id:number) {
    console.log("Inside post comp Down Voting ", id)
    if(this._processingVote) return;
    this._processingVote = true;

    this._postService.downVotePost(id).subscribe(
      post => {
        this._processingVote = false;
        //this.post = post;
        this.post.upvotes = post.upvotes;
        this.post.downvotes = post.downvotes;
        this.post.currentUserHasUpVoted = post.currentUserHasUpVoted;
        this.post.currentUserHasDownVoted = post.currentUserHasDownVoted;
        console.log("Down Vote susccess");
      },
      error => {
        console.log("Upvote unsuccess")
      });
  }
}
