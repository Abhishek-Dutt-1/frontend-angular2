import {Component, OnInit, EventEmitter} from '@angular/core';
import {RouterLink} from '@angular/router-deprecated';
import {DateFormatPipe} from '../misc/date-format.pipe';
import {PostTemplateType} from './post-template-types';

@Component({
  selector: 'my-post-meta-panel',
  template: `
    <div *ngIf="true || _votee">
      <div class="my-post-meta-panel">

        <div class="post-info">

          <div class="">
            <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
              <div class="profile-image pull-left">
                <img *ngIf="post.postedby.profileimage" src="{{post.postedby.profileimage}}" class="profileimage img-circle">
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
                  {{post.group.supergroup.name | uppercase}}/{{post.group.name}}
                </a>
              </div>
            </div>
            <div class="clearfix"></div>
            <div class="post-createdat pull-left">
              {{ post.createdAt | timeAgo }} &bull;
            </div>
            <div class="post-commentstotal pull-left">
              {{post.comments.length}} Comments
            </div>
            <div class="post-reply pull-left"> &nbsp;&bull;
              <a [routerLink]="['NewComment1', {postid: post.id}]" class="">
                Reply
              </a>
            </div>
            <div class="post-delete p1ull-left" *ngIf="currentUser && currentUser.id == post.postedby.id">
              <span>&nbsp;
                <a class="" [routerLink]="['ConfirmPostDelete', {postid: post.id}]">[Delete Post]</a>
              </span>
            </div>

          </div>

        </div>      <!-- ! post-info -->


      </div>
    </div>
  `,
  styles: [`
    .my-post-meta-panel .post-info {
      font-size: 12px;
      margin-top: 15px;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
    .my-post-meta-panel .post-info .profile-image {
      height: 32px;
      width: 32px;
      /* border: 1px solid lightgrey; */
      margin-top: 3px;
      overflow: hidden;
    }
    .my-post-meta-panel .post-info .profileimage {
      width: 32px;
      opacity:0.5;
      filter:alpha(opacity=50);
    }
    .my-post-meta-panel .post-info .post-info-text {
      padding-left: 10px;
      width: 88%;
    }
    .my-post-meta-panel .post-info .profile-name {
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
    .my-post-meta-panel .post-info .post-grouplink {
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
    .my-post-meta-panel .post-info .post-createdat {
      display: inline;
      font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 12px;
      /* padding-left: 10px; */
      line-height: 14.4px;
      color: rgba(0, 0, 0, 0.439216);
    }
    .my-post-meta-panel .post-info .post-commentstotal {
      display: inline;
      font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 12px;
      padding-left: 5px;
      line-height: 14.4px;
      color: rgba(0, 0, 0, 0.439216);
    }
    .my-post-meta-panel .post-info .post-reply {
      display: inline;
      font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 12px;
      padding-left: 0px;
      line-height: 14.4px;
      color: rgba(0, 0, 0, 0.439216);
    }
    .my-post-meta-panel .post-info .bullet {
      display: inline;
      font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 12px;
      line-height: 1.8;
      color: rgba(0, 0, 0, 0.439216);
      padding: 0 5px;
    }
    .my-post-meta-panel .post-info .post-reply {
      display: inline;
      font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 12px;
      padding-left: 0px;
      line-height: 14.4px;
      color: rgba(0, 0, 0, 0.439216);
    }
  `],
  inputs: ['post', 'currentUser', 'type'],
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

  constructor( ) { }

  ngOnInit() {
    // TODO: Improve this   // :sync with post-meta-panel
    this.templateTypeList = PostTemplateType.List;
    this.templateTypeGroupList = PostTemplateType.Grouplist;
    this.templateTypeMain = PostTemplateType.Main;
  }

/*
  upVotePost(id) {
    console.log("Up voting post with ", id);
    this.upVote.next(id);
  }
  downVotePost(id) {
    console.log("Down voting post with ", id);
    this.downVote.next(id);
  }
*/
}
