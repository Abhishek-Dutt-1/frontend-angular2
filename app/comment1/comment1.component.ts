/**
 * Displays a single comment
 */
import {Component} from '@angular/core';
import {Comment1} from './comment1';
import {RouterLink} from '@angular/router-deprecated';
import {DateFormatPipe} from '../misc/date-format.pipe';
import {Comment1Service} from '../comment1/comment1.service';
import {CommentvoteComponent} from '../misc/commentvote.component';
import {CommentMetaPanelComponent} from '../misc/comment-meta-panel.component';

@Component({
  selector: 'my-comment1',
  template: `
  <div *ngIf="comment1 && post">
    <div class="my-comment1">
      <div class="row">

        <div class="1col-xs-2 1col-sm-1">
          <div class="commentvote-container">
            <my-commentvote [_votee]='comment1' (upVote)='upVoteComment1($event)' (downVote)='downVoteComment1($event)' [disabled]="comment1.sd"></my-commentvote>
          </div>
        </div>

        <div class="col-xs-9 col-sm-11 comment-main">

          <div class="row">

            <div *ngIf="comment1.meme_image_url" class="col-xs-4 col-sm-3 col-md-2 meme-image-col">
              <div class="meme-image-container">
                <img src="{{comment1.meme_image_url}}" class="meme-image img-responsive img-rounded  center-block">
              </div>
            </div>

            <div *ngIf="comment1.meme_image_url" class="col-xs-8 col-sm-9 col-md-10">
              <div>
                {{comment1.text}}
              </div>
            </div>
            <div *ngIf="!comment1.meme_image_url" class="col-xs-12">
              <div>
                {{comment1.text}}
              </div>
            </div>
          </div>    <!-- ! row -->

          <my-comment-meta-panel [post]="post" [commentLevel]="1" [comment]="comment1" [currentUser]="currentUser"></my-comment-meta-panel>
          <!--
          <div class="row" *ngIf="false">
            <div class="col-xs-12">
              <div>
                <div class="postedby-info">
                  <a class="" [routerLink]="['ViewUser', {id: comment1.postedby.id}]">
                    <div class="profile-image-container pull-left">
                      <img *ngIf="comment1.postedby.profileimage" src="{{comment1.postedby.profileimage}}" class="profileimage img-rounded">
                      <img *ngIf="!comment1.postedby.profileimage" src="images/user-default.png" class="profileimage img-rounded">
                    </div>
                  </a>

                  <div class=" pull-left">
                    <div class="profile-name">
                      <a class="" [routerLink]="['ViewUser', {id: comment1.postedby.id}]">
                        {{comment1.postedby.displayname}}
                      </a>
                    </div>
                    &bull;
                    <a [routerLink] = "['NewComment2', {postid: post.id, comment1id: comment1.id}]">Reply</a>
                    <div class="clearfix"></div>
                    <div class="comment-createdat pull-left">
                      {{ comment1.createdAt | timeAgo }}
                    </div>
                    <div class="comment-delete pull-left" *ngIf="currentUser && currentUser.id == comment1.postedby.id">
                      <span>&bull;
                        <a class="" [routerLink]="['ConfirmCommentDelete', { postid: post.id, commentlevel: 1, commentid: comment1.id } ]">[Delete Comment]</a>
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>  -->    <!-- ! row -->
        </div>

      </div>    <!-- ! row -->
    </div>  <!-- ! my-comment1 -->
  </div>    <!-- ! ngIf -->
  `,
  styles: [`
  .my-comment1 .meme-image-col {
    padding-right: 0;
  }
  .my-comment1 .comment-main {
    padding-left: 0;
    padding-right: 0;
  }
  /*
  .my-comment1 .profile-image-container {
    height: 32px;
    width: 32px;
    margin-top: 3px;
    overflow: hidden;
    margin-right: 10px;
  }
  .my-comment1 .profileimage {
    width: 32px;
    opacity:0.5;
    filter:alpha(opacity=50);
  }
  .my-comment1 .postedby-info {
    margin-top: 10px;
  }
  .my-comment1 .profile-name {
    cursor: pointer;
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
  .my-comment1 .comment-createdat {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
  }
  .my-comment1 .comment-delete {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
  }
  */
  .my-comment1 .commentvote-container {
    float: left;
    margin-left: 15px;
    margin-right: 15px;
  }
  `],
  inputs: ['currentUser', 'comment1', 'post'],
  directives: [RouterLink, CommentvoteComponent, CommentMetaPanelComponent],
  pipes: [DateFormatPipe]
})
export class Comment1Component {

  private post;
  private comment1;
  private _processingVote: Boolean = false;
  private _errorMsg: string = null;

  constructor(
    private _comment1Service: Comment1Service
  ) {}

  /**
   * User clicked upvote
   */
  upVoteComment1(id:number) {
    //console.log("Inside post comp upvoting ", id)
    if(this._processingVote) return;
    this._processingVote = true;

    this._comment1Service.upVoteComment1(id).subscribe(
      comment1 => {
        this._processingVote = false;
        //this.post = post;
        this.comment1.upvotes = comment1.upvotes;
        this.comment1.downvotes = comment1.downvotes;
        this.comment1.currentUserHasUpVoted = comment1.currentUserHasUpVoted;
        this.comment1.currentUserHasDownVoted = comment1.currentUserHasDownVoted;
        //console.log("UpVote susccess");
        this._errorMsg = null;
      },
      error => {
        this._processingVote = false;
        //console.log("Upvote unsuccess")
        this._errorMsg = error;
      });
  }

  downVoteComment1(id:number) {
    //console.log("Inside post comp Down Voting ", id)
    if(this._processingVote) return;
    this._processingVote = true;

    this._comment1Service.downVoteComment1(id).subscribe(
      comment1 => {
        this._processingVote = false;
        //this.post = post;
        this.comment1.upvotes = comment1.upvotes;
        this.comment1.downvotes = comment1.downvotes;
        this.comment1.currentUserHasUpVoted = comment1.currentUserHasUpVoted;
        this.comment1.currentUserHasDownVoted = comment1.currentUserHasDownVoted;
        //console.log("Down Vote susccess");
        this._errorMsg = null;
      },
      error => {
        //console.log("Upvote unsuccess")
        this._processingVote = false;
        this._errorMsg = error;
      });
  }

}
