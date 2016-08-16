import {Component, OnInit, EventEmitter} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';
import {DateFormatPipe} from '../misc/date-format.pipe';
import {PostTemplateType} from './post-template-types';

@Component({
  selector: 'my-post-meta-panel',
  template: `
    <div *ngIf="post && post.postedby">
      <div class="my-post-meta-panel">

        <div class="post-info">

          <div class="">
            <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
              <div class="profile-image pull-left">
                <img *ngIf="post.postedby.profileimage" src="{{post.postedby.profileimage}}" class="profileimage img-circle">
                <img *ngIf="!post.postedby.profileimage" src="images/user-default.png" class="profileimage img-circle">
              </div>
            </a>
          </div>
          <div class="post-info-text pull-left"><!--
         --><div class="profile-text pull-left">
              by
            </div>
            <div class="profile-link pull-left">
              <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                {{post.postedby.displayname}}
              </a>
            </div>
            <div class="pull-left">
              <div class="profile-text pull-left">({{post.postedby.score}}/{{post.postedby.totalScore}})</div>
            </div>
            <div *ngIf="type != templateTypeGroupList" class="pull-left">
              <div class="profile-text pull-left">in</div>
              <div class="profile-link pull-left">
                <a class="" [routerLink]="[ 'SuperGroupPostList', { super_group_name : post.group.supergroup.name } ]">{{post.group.supergroup.name}}</a><!--
                --><a class="" [routerLink]="[ 'ViewGroup', { super_group_name : post.group.supergroup.name, group_name : post.group.name } ]">/{{post.group.name}}</a>
              </div>
            </div>
            <div *ngIf="_isSticky" class="pull-left">
              <div class="bullet pull-left">&bull;</div>
              <div class="profile-text pull-left">[Sticky]</div>
            </div>

            <div class="clearfix"></div>

            <div class="profile-text pull-left">
              {{ post.createdAt | timeAgo }}
            </div>

            <div class="bullet pull-left">&bull;</div>

            <div class="profile-text pull-left">
              {{post.comments.length}} Comments
            </div>

            <div class="bullet pull-left">&bull;</div>

            <div class="profile-link pull-left">
              <a [routerLink]="['NewComment1', {postid: post.id}]" class="">
                Reply
              </a>
            </div>

            <div class="pull-left" *ngIf="currentUser && currentUser.id == post.postedby.id">
              <div class="bullet pull-left">&bull;</div>
              <a class="profile-link pull-left" [routerLink]="['EditPost', {postid: post.id}]">[Edit]</a>
            </div>

            <div class="pull-left" *ngIf="currentUser && currentUser.id == post.postedby.id">
              <div class="bullet pull-left">&bull;</div>
              <a class="profile-link pull-left" [routerLink]="['ConfirmPostDelete', {postid: post.id}]">[Delete]</a>
            </div>

          </div>

        </div>      <!-- ! post-info -->


      </div>
    </div>
  `,
  styles: [`
    .my-post-meta-panel {
      font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      line-height: 19.6px;
      color: rgba(0, 0, 0, 0.439216);
    }
    .my-post-meta-panel a {
      color: #af2b2b;
    }
    .my-post-meta-panel .post-info {
      margin-top: 15px;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
    .my-post-meta-panel .post-info .profileimage {
      height: 32px;
      width: 32px;
      margin-top: 3px;
      overflow: hidden;
      opacity: 0.5;
      filter: alpha(opacity=50);
    }
    .my-post-meta-panel .post-info .post-info-text {
      padding-left: 10px;
      width: 88%;
    }
    .my-post-meta-panel .profile-text,
    .my-post-meta-panel .profile-link,
    .my-post-meta-panel .bullet {
      padding-right: 5px;
    }
  `],
  inputs: ['post', 'currentUser', 'type', 'view'],
  directives: [RouterLink],
  pipes: [DateFormatPipe]
  //outputs: ['upVote', 'downVote']
})
export class PostMetaPanelComponent implements OnInit{
/*
  private _votee = null;
  public upVote: EventEmitter<any> = new EventEmitter();
  public downVote: EventEmitter<any> = new EventEmitter();
*/
  private templateTypeList        : PostTemplateType = null;
  private templateTypeGroupList   : PostTemplateType = null;
  private templateTypeMain        : PostTemplateType = null;
  private post = null;
  private view = null;
  private _isSticky = false;

  constructor( ) { }

  ngOnInit() {
    // TODO: Improve this   // :sync with post-meta-panel
    this.templateTypeList = PostTemplateType.List;
    this.templateTypeGroupList = PostTemplateType.Grouplist;
    this.templateTypeMain = PostTemplateType.Main;

    if ( this.post.sticky_level !== 0                      && this.view == 'post'       ) this._isSticky = true;
    if ( [1, 3, 5, 7].indexOf(this.post.sticky_level) > -1 && this.view == 'group'      ) this._isSticky = true;
    if ( [2, 3, 7].indexOf(this.post.sticky_level) > -1    && this.view == 'supergroup' ) this._isSticky = true;
    if ( [4, 5, 6, 7].indexOf(this.post.sticky_level) > -1 && this.view == 'hypergroup' ) this._isSticky = true;
  }

}
