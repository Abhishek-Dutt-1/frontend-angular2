/**
 * Displays a single comment2
 */
import {Component} from '@angular/core';
import {Comment2} from './comment2';
import {RouterLink} from '@angular/router-deprecated';
import {DateFormatPipe} from '../misc/date-format.pipe';
import {Comment2Service} from '../comment2/comment2.service';
import {CommentvoteComponent} from '../misc/commentvote.component';
import {CommentMetaPanelComponent} from '../misc/comment-meta-panel.component';

@Component({
  selector: 'my-comment2',
  template: `
  <div *ngIf="comment2 && post">
    <div class="my-comment2">
      <div class="row">

        <div class="1col-xs-2 1col-sm-1">
          <div class="commentvote-container">
            <my-commentvote [_votee]='comment2' (upVote)='upVoteComment2($event)' (downVote)='downVoteComment2($event)' [disabled]="comment2.sd"></my-commentvote>
          </div>
        </div>

        <div class="col-xs-9 col-sm-11 comment-main">
          <div class="row">

            <div *ngIf="comment2.meme_image_url" class="col-xs-4 col-sm-3 col-md-2 meme-image-col">
              <div class="meme-image-container">
                <img src="{{comment2.meme_image_url}}" class="meme-image img-responsive img-rounded  center-block">
              </div>
            </div>
            <div *ngIf="comment2.meme_image_url" class="col-xs-8 col-sm-9 col-md-10">
              <div class="comment-text">
                {{comment2.text}}
              </div>
            </div>
            <div *ngIf="!comment2.meme_image_url" class="col-xs-12">
              <div class="comment-text">
                {{comment2.text}}
              </div>
            </div>
          </div>      <!-- ! row -->

          <my-comment-meta-panel [post]="post" [commentLevel]="2" [comment]="comment2" [currentUser]="currentUser"></my-comment-meta-panel>
          <!--
          <div class="row" *ngIf="false">
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
          </div> -->   <!-- ! row -->

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
    padding-right: 0;
  }
  .my-comment2 .comment-text {
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
  .my-comment2 .commentvote-container {
    float: left;
    margin-left: 15px;
    margin-right: 15px;
  }
  `],
  inputs: ['comment2', 'post', 'currentUser'],
  directives: [RouterLink, CommentvoteComponent, CommentMetaPanelComponent],
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
