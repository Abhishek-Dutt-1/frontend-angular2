/**
 * Displays a single comment3
 */
import {Component} from '@angular/core';
import {Comment4} from './comment4';
import {RouterLink} from '@angular/router-deprecated';
import {DateFormatPipe} from '../misc/date-format.pipe';
import {Comment4Service} from '../comment4/comment4.service';
import {CommentvoteComponent} from '../misc/commentvote.component';
import {CommentMetaPanelComponent} from '../misc/comment-meta-panel.component';

@Component({
  selector: 'my-comment4',
  template: `
  <div *ngIf="comment4 && post">
    <div class="my-comment4">
      <div class="row">

        <div class="1col-xs-2 1col-sm-1">
          <div class="commentvote-container">
            <my-commentvote [_votee]='comment4' (upVote)='upVoteComment4($event)' (downVote)='downVoteComment4($event)' [disabled]="comment4.sd"></my-commentvote>
          </div>
        </div>

        <div class="col-xs-8 col-sm-10 comment-main">
          <div class="row">
            <div *ngIf="comment4.meme_image_url" class="col-xs-4 col-sm-3 col-md-2 meme-image-col">
              <div class="meme-image-container ">
                <img src="{{comment4.meme_image_url}}" class="meme-image img-responsive img-rounded  center-block">
              </div>
            </div>

            <div *ngIf="comment4.meme_image_url" class="col-xs-8 col-sm-9 col-md-10">
              <div>
                {{comment4.text}}
              </div>
            </div>
            <div *ngIf="!comment4.meme_image_url" class="col-xs-12">
              <div>
                {{comment4.text}}
              </div>
            </div>

          </div>    <!-- ! row -->

          <my-comment-meta-panel [post]="post" [commentLevel]="4" [comment]="comment4" [currentUser]="currentUser"></my-comment-meta-panel>
          <!--
          <div class="row">
            <div class="col-xs-12">
              <div>
                <div class="postedby-info">
                  <a class="" [routerLink]="['ViewUser', {id: comment4.postedby.id}]">
                    <div class="profile-image-container pull-left">
                      <img *ngIf="comment4.postedby.profileimage" src="{{comment4.postedby.profileimage}}" class="profileimage img-circle">
                      <img *ngIf="!comment4.postedby.profileimage" src="images/user-default.png" class="profileimage img-circle">
                    </div>
                  </a>
                  <div class=" pull-left">
                    <div class="profile-name">
                      <a class="" [routerLink]="['ViewUser', {id: comment4.postedby.id}]">
                        {{comment4.postedby.displayname}}
                      </a>
                    </div>
                    <div class="clearfix"></div>
                    <div class="comment-createdat">
                      {{ comment4.createdAt | timeAgo }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->    <!-- ! row -->

        </div>

      </div>
    </div>
  </div>
  `,
  styles: [`
  .my-comment4 .meme-image-col {
    padding-right: 0;
  }
  .my-comment4 .comment-main {
    padding-left: 0;
    padding-right: 0;
  }
  /*
  .my-comment4 .profile-image-container {
    height: 32px;
    width: 32px;
    margin-top: 3px;
    overflow: hidden;
    margin-right: 10px;
  }
  .my-comment4 .profileimage {
    width: 32px;
    opacity:0.5;
    filter:alpha(opacity=50);
  }
  .my-comment4 .postedby-info {
    margin-top: 10px;
  }
  .my-comment4 .profile-name {
    cursor: pointer;
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
  .my-comment4 .comment-createdat {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
  }
  */
  .my-comment4 .commentvote-container {
    float: left;
    margin-left: 15px;
    margin-right: 15px;
  }
  `],
  inputs: ['comment4', 'post', 'currentUser'],
  directives: [RouterLink, CommentvoteComponent, CommentMetaPanelComponent],
  pipes: [DateFormatPipe]
})
export class Comment4Component {

  private post;
  private comment4;
  private _processingVote: Boolean = false;
  private _errorMsg: string = null;

  constructor(
    private _comment4Service: Comment4Service
  ) { }

  /**
   * User clicked upvote
   */
  upVoteComment4(id:number) {
    if(this._processingVote) return;
    this._processingVote = true;

    this._comment4Service.upVoteComment4(id).subscribe(
      comment4 => {
        this._processingVote = false;
        this.comment4.upvotes = comment4.upvotes;
        this.comment4.downvotes = comment4.downvotes;
        this.comment4.currentUserHasUpVoted = comment4.currentUserHasUpVoted;
        this.comment4.currentUserHasDownVoted = comment4.currentUserHasDownVoted;
        this._errorMsg = null;
      },
      error => {
        this._processingVote = false;
        this._errorMsg = error;
      });
  }

  downVoteComment4(id:number) {
    if(this._processingVote) return;
    this._processingVote = true;
    this._comment4Service.downVoteComment4(id).subscribe(
      comment4 => {
        this._processingVote = false;
        this.comment4.upvotes = comment4.upvotes;
        this.comment4.downvotes = comment4.downvotes;
        this.comment4.currentUserHasUpVoted = comment4.currentUserHasUpVoted;
        this.comment4.currentUserHasDownVoted = comment4.currentUserHasDownVoted;
        this._errorMsg = null;
      },
      error => {
        this._processingVote = false;
        this._errorMsg = error;
      });
  }

}
