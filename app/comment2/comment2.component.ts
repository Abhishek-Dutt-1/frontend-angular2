/**
 * Displays a single comment2
 */
import {Component} from '@angular/core';
import {Comment2} from './comment2';
import {RouterLink} from '@angular/router-deprecated';
import {DateFormatPipe} from '../misc/date-format.pipe';
import {Comment2Service} from '../comment2/comment2.service';
import {CommentvoteComponent} from '../misc/commentvote.component';

@Component({
  selector: 'my-comment2',
  template: `
  <div *ngIf="comment2 && post">
    <div class="my-comment2">
      <div class="row">

        <div class="col-xs-2 col-sm-1">
          <div class="commentvote-container">
            <my-commentvote [_votee]='comment2' (upVote)='upVoteComment2($event)' (downVote)='downVoteComment2($event)'></my-commentvote>
          </div>
        </div>

        <div class="col-xs-10 col-sm-11 comment-main">
          <div class="row">

            <div *ngIf="comment2.meme_image_url" class="col-xs-4 col-sm-3 col-md-2 meme-image-col">
              <div class="meme-image-container ">
                <img src="{{comment2.meme_image_url}}" class="meme-image img-responsive img-rounded  center-block">
              </div>
            </div>
            <div class="col-xs-6 col-sm-9">
              <div>
                {{comment2.text}}
              </div>
            </div>
          </div>      <!-- ! row -->

          <div class="row">
            <div class="col-xs-12">
              <div>
                <div class="postedby-info">
                  <a class="" [routerLink]="['ViewUser', {id: comment2.postedby.id}]">
                    <div class="profile-image-container pull-left">
                      <img *ngIf="comment2.postedby.profileimage" src="{{comment2.postedby.profileimage}}" class="profileimage img-circle">
                      <img *ngIf="!comment2.postedby.profileimage" src="images/user-default.png" class="profileimage img-circle">
                    </div>
                  </a>

                  <div class=" pull-left">
                    <div class="profile-name">
                      <a class="" [routerLink]="['ViewUser', {id: comment2.postedby.id}]">
                        {{comment2.postedby.displayname}}
                      </a>
                    </div>
                    &bull;
                    <a [routerLink] = "['NewComment3', {postid: post.id, comment2id: comment2.id}]">Reply</a>
                    <div class="clearfix"></div>
                    <div class="comment-createdat">
                      {{ comment2.createdAt | timeAgo }}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>    <!-- ! row -->

        </div>

      </div>  <!-- ! row -->
    </div>
  </div>
  `,
  styles: [`
  .my-comment2 .meme-image-col {
    padding-right: 0;
  }
  .my-comment2 .comment-main {
    padding-left: 0;
  }
  .my-comment2 .profile-image-container {
    height: 32px;
    width: 32px;
    margin-top: 3px;
    overflow: hidden;
    margin-right: 10px;
  }
  .my-comment2 .profileimage {
    width: 32px;
    opacity:0.5;
    filter:alpha(opacity=50);
  }
  .my-comment2 .postedby-info {
    margin-top: 10px;
  }
  .my-comment2 .profile-name {
    cursor: pointer;
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
  .my-comment2 .comment-createdat {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    /* padding-left: 10px; */
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
  }
  `],
  inputs: ['comment2', 'post'],
  directives: [RouterLink, CommentvoteComponent],
  pipes: [DateFormatPipe]
})
export class Comment2Component {

  private post;
  private comment2;
  private _processingVote: Boolean = false;
  private _errorMsg: string = null;

  constructor(
    private _comment2Service: Comment2Service
  ) { }

  /**
   * User clicked upvote
   */
  upVoteComment2(id:number) {
    //console.log("Inside post comp upvoting ", id)
    if(this._processingVote) return;
    this._processingVote = true;

    this._comment2Service.upVoteComment2(id).subscribe(
      comment2 => {
        this._processingVote = false;
        //this.post = post;
        this.comment2.upvotes = comment2.upvotes;
        this.comment2.downvotes = comment2.downvotes;
        this.comment2.currentUserHasUpVoted = comment2.currentUserHasUpVoted;
        this.comment2.currentUserHasDownVoted = comment2.currentUserHasDownVoted;
        //console.log("UpVote susccess");
        this._errorMsg = null;
      },
      error => {
        this._processingVote = false;
        //console.log("Upvote unsuccess")
        this._errorMsg = error;
      });
  }

  downVoteComment2(id:number) {
    //console.log("Inside post comp Down Voting ", id)
    if(this._processingVote) return;
    this._processingVote = true;

    this._comment2Service.downVoteComment2(id).subscribe(
      comment2 => {
        this._processingVote = false;
        //this.post = post;
        this.comment2.upvotes = comment2.upvotes;
        this.comment2.downvotes = comment2.downvotes;
        this.comment2.currentUserHasUpVoted = comment2.currentUserHasUpVoted;
        this.comment2.currentUserHasDownVoted = comment2.currentUserHasDownVoted;
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
