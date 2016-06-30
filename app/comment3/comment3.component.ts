/**
 * Displays a single comment2
 */
import {Component} from '@angular/core';
import {Comment3} from './comment3';
import {RouterLink} from '@angular/router-deprecated';
import {DateFormatPipe} from '../misc/date-format.pipe';
import {Comment3Service} from '../comment3/comment3.service';
import {CommentvoteComponent} from '../misc/commentvote.component';

@Component({
  selector: 'my-comment3',
  template: `
  <div *ngIf="comment3 && post">
    <div class="my-comment3">
      <div class="row">

        <div class="col-xs-2 col-sm-1">
          <div class="commentvote-container">
            <my-commentvote [_votee]='comment3' (upVote)='upVoteComment3($event)' (downVote)='downVoteComment3($event)'></my-commentvote>
          </div>
        </div>

        <div class="col-xs-10 col-sm-11 comment-main">
          <div class="row">

            <div *ngIf="comment3.meme_image_url" class="col-xs-4 col-sm-3 col-md-2 meme-image-col">
              <div class="meme-image-container ">
                <img src="{{comment3.meme_image_url}}" class="meme-image img-responsive img-rounded  center-block">
              </div>
            </div>

            <div class="col-xs-6 col-sm-9">
              <div>
                {{comment3.text}}
              </div>
            </div>

          </div>      <!-- ! row -->

          <div class="row">
            <div class="col-xs-12">
              <div>
                <div class="postedby-info">
                  <a class="" [routerLink]="['ViewUser', {id: comment3.postedby.id}]">
                    <div class="profile-image-container pull-left">
                      <img *ngIf="comment3.postedby.profileimage" src="{{comment3.postedby.profileimage}}" class="profileimage  img-circle">
                      <img *ngIf="!comment3.postedby.profileimage" src="images/user-default.png" class="profileimage  img-circle">
                    </div>
                  </a>

                  <div class=" pull-left">
                    <div class="profile-name">
                      <a class="" [routerLink]="['ViewUser', {id: comment3.postedby.id}]">
                        {{comment3.postedby.displayname}}
                      </a>
                    </div>
                    &bull;
                    <a [routerLink] = "['NewComment4', {postid: post.id, comment3id: comment3.id}]">Reply</a>
                    <div class="clearfix"></div>
                    <div class="comment-createdat">
                      {{ comment3.createdAt | timeAgo }}
                    </div>
                  </div>

                </div>    <!-- ! postedby-info -->
              </div>
            </div>
          </div>    <!-- ! row -->

        </div>

      </div>      <!-- ! row -->
    </div>
  </div>
  `,
  styles: [`
  .my-comment3 .meme-image-col {
    padding-right: 0;
  }
  .my-comment3 .comment-main {
    padding-left: 0;
  }
  .my-comment3 .profile-image-container {
    height: 32px;
    width: 32px;
    margin-top: 3px;
    overflow: hidden;
    margin-right: 10px;
  }
  .my-comment3 .profileimage {
    width: 32px;
    opacity:0.5;
    filter:alpha(opacity=50);
  }
  .my-comment3 .postedby-info {
    margin-top: 10px;
  }
  .my-comment3 .profile-name {
    cursor: pointer;
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
  .my-comment3 .comment-createdat {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    /* padding-left: 10px; */
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
  }
  `],
  inputs: ['comment3', 'post'],
  directives: [RouterLink, CommentvoteComponent],
  pipes: [DateFormatPipe]
})
export class Comment3Component {

  private post;
  private comment3;
  private _processingVote: Boolean = false;
  private _errorMsg: string = null;

  constructor(
    private _comment3Service: Comment3Service
  ) { }

  /**
   * User clicked upvote
   */
  upVoteComment3(id:number) {
    //console.log("Inside post comp upvoting ", id)
    if(this._processingVote) return;
    this._processingVote = true;

    this._comment3Service.upVoteComment3(id).subscribe(
      comment3 => {
        this._processingVote = false;
        //this.post = post;
        this.comment3.upvotes = comment3.upvotes;
        this.comment3.downvotes = comment3.downvotes;
        this.comment3.currentUserHasUpVoted = comment3.currentUserHasUpVoted;
        this.comment3.currentUserHasDownVoted = comment3.currentUserHasDownVoted;
        //console.log("UpVote susccess");
        this._errorMsg = null;
      },
      error => {
        this._processingVote = false;
        //console.log("Upvote unsuccess")
        this._errorMsg = error;
      });
  }

  downVoteComment3(id:number) {
    //console.log("Inside post comp Down Voting ", id)
    if(this._processingVote) return;
    this._processingVote = true;

    this._comment3Service.downVoteComment3(id).subscribe(
      comment3 => {
        this._processingVote = false;
        //this.post = post;
        this.comment3.upvotes = comment3.upvotes;
        this.comment3.downvotes = comment3.downvotes;
        this.comment3.currentUserHasUpVoted = comment3.currentUserHasUpVoted;
        this.comment3.currentUserHasDownVoted = comment3.currentUserHasDownVoted;
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
