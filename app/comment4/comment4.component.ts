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
              <div class="comment-text">
                {{comment4.text}}
              </div>
            </div>
            <div *ngIf="!comment4.meme_image_url" class="col-xs-12">
              <div class="comment-text">
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
  .my-comment4 .comment-text {
    color: rgba(0, 0, 0, 0.8);
    display: block;
    font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    letter-spacing: -0.072px;
    line-height: 27px;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
    /* margin-top: 8px; */
    word-wrap: break-word;
    -webkit-font-smoothing: antialiased;
  }
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
