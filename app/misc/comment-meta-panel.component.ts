import {Component, OnInit, EventEmitter} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';
import {DateFormatPipe} from '../misc/date-format.pipe';
//import {PostTemplateType} from './post-template-types';

@Component({
  selector: 'my-comment-meta-panel',
  template: `
  <div *ngIf="comment" class="my-comment-meta-panel">

    <div class="row">
      <div class="col-xs-12">
        <div>
          <div class="postedby-info">
            <div *ngIf="comment.postedby">
            <a class="" [routerLink]="['ViewUser', {id: comment.postedby.id}]">
              <div class="profile-image-container pull-left">
                <img *ngIf="comment.postedby.profileimage" src="{{comment.postedby.profileimage}}" class="profileimage" [ngClass]=" { 'img-rounded': commentLevel == 1, 'img-circle': commentLevel != 1 } ">
                <img *ngIf="!comment.postedby.profileimage" src="images/user-default.png" class="profileimage" [ngClass]=" { 'img-rounded': commentLevel == 1, 'img-circle': commentLevel != 1 } ">
              </div>
            </a>
            </div>

            <div class=" pull-left">
              <div class="profile-name pull-left" *ngIf="comment.postedby">
                <a class="" [routerLink]="['ViewUser', {id: comment.postedby.id}]">
                  {{comment.postedby.displayname}}
                </a>
              </div>
              <div *ngIf="comment.postedby && commentLevel < 4" class="pull-left">&nbsp;&bull;&nbsp;</div>
              <div *ngIf="commentLevel == 1" class="pull-left"><a [routerLink] = "[ 'NewComment2', { postid: post.id, comment1id: comment.id } ]">Reply</a></div>
              <div *ngIf="commentLevel == 2" class="pull-left"><a [routerLink] = "[ 'NewComment3', { postid: post.id, comment2id: comment.id } ]">Reply</a></div>
              <div *ngIf="commentLevel == 3" class="pull-left"><a [routerLink] = "[ 'NewComment4', { postid: post.id, comment3id: comment.id } ]">Reply</a></div>
              <div *ngIf="commentLevel == 4" class="pull-left"></div>
              <div class="clearfix"></div>
              <div class="comment-createdat pull-left">
                {{ comment.createdAt | timeAgo }}
              </div>
              <div class="comment-delete pull-left" *ngIf="currentUser && comment.postedby && currentUser.id == comment.postedby.id">
                <span>&bull;
                  <a *ngIf="commentLevel == 1" [routerLink]="['ConfirmCommentDelete', { postid: post.id, commentlevel: 1, commentid: comment.id } ]">[Delete]</a>
                  <a *ngIf="commentLevel == 2" [routerLink]="['ConfirmCommentDelete', { postid: post.id, commentlevel: 2, commentid: comment.id } ]">[Delete]</a>
                  <a *ngIf="commentLevel == 3" [routerLink]="['ConfirmCommentDelete', { postid: post.id, commentlevel: 3, commentid: comment.id } ]">[Delete]</a>
                  <a *ngIf="commentLevel == 4" [routerLink]="['ConfirmCommentDelete', { postid: post.id, commentlevel: 4, commentid: comment.id } ]">[Delete]</a>
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>    <!-- ! row -->

  </div>
  `,
  styles: [`
    .my-comment-meta-panel a {
      color: #af2b2b;
    }
    .my-comment-meta-panel .profile-image-container {
      height: 32px;
      width: 32px;
      margin-top: 3px;
      overflow: hidden;
      margin-right: 10px;
    }
    .my-comment-meta-panel .profileimage {
      width: 32px;
      opacity:0.5;
      filter:alpha(opacity=50);
    }
    .my-comment-meta-panel .postedby-info {
      margin-top: 10px;
    }
    .my-comment-meta-panel .profile-name {
      cursor: pointer;
      display: inline;
      font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
    }
    .my-comment-meta-panel .reply-link {
      float: left;
    }
    .my-comment-meta-panel .comment-createdat {
      display: inline;
      font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 12px;
      /* padding-left: 10px; */
      line-height: 14.4px;
      color: rgba(0, 0, 0, 0.439216);
    }
    .my-comment-meta-panel .comment-delete {
      display: inline;
      font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 12px;
      /* padding-left: 10px; */
      line-height: 14.4px;
      color: rgba(0, 0, 0, 0.439216);
    }
  `],
  inputs: ['comment', 'currentUser', 'post', 'commentLevel'],
  directives: [RouterLink],
  pipes: [DateFormatPipe]
  //outputs: ['upVote', 'downVote']
})
export class CommentMetaPanelComponent implements OnInit{
/*
  private _votee = null;
  public upVote: EventEmitter<any> = new EventEmitter();
  public downVote: EventEmitter<any> = new EventEmitter();
*/
  // private templateTypeList        : PostTemplateType = null;
  // private templateTypeGroupList   : PostTemplateType = null;
  // private templateTypeMain        : PostTemplateType = null;
  private post = null;
  private view = null;
  private _isSticky = false;

  constructor( ) { }

  ngOnInit() {
    // TODO: Improve this   // :sync with post-meta-panel
    // this.templateTypeList = PostTemplateType.List;
    // this.templateTypeGroupList = PostTemplateType.Grouplist;
    // this.templateTypeMain = PostTemplateType.Main;
    //
    // if ( [1, 3, 5, 7].indexOf(this.post.sticky_level) > -1 && this.view == 'group'      ) this._isSticky = true;
    // if ( [2, 3, 7].indexOf(this.post.sticky_level) > -1    && this.view == 'supergroup' ) this._isSticky = true;
    // if ( [4, 5, 6, 7].indexOf(this.post.sticky_level) > -1 && this.view == 'hypergroup' ) this._isSticky = true;
  }

}
