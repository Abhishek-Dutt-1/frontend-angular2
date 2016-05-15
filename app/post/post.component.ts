/** 
 * Displays a single post
 */
import {Component, OnInit} from 'angular2/core';
import {Post} from './post';
import {Router, RouterLink} from 'angular2/router';
import {PostService} from './post.service';
import {PostTemplateType} from './post-template-types';
import {VoteComponent} from '../misc/vote.component';
import {DateFormatPipe} from '../misc/date-format.pipe';


@Component({
  selector: 'my-post',
  template: `
  <div *ngIf="post">
  <div class="my-post">

    <div *ngIf="type === templateTypeList" class="row">
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
                      <i class="fa fa-user"></i>
                    </div>
                  </a>
                  
                  <div class="pull-left">
                    <div class="profile-name pull-left">
                      <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                        {{post.postedby.displayname}}
                      </a>
                    </div> 
                    <div class="bullet">&bull;</div>
                    <div class="post-grouplink">
                      <a class="" [routerLink]="['ViewGroup', {super_group_name: post.group.supergroup.name, group_name: post.group.name}]">
                        go/{{post.group.supergroup.name}}/{{post.group.name}}
                      </a>
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
                        <a class="" [routerLink]="['ConfirmPostDelete', {postid: post.id}]"> Delete </a>
                      </span>
                    </div>
                  </div>
                  
                </div> 
                
                <div>
                  <div class="row">
                    <div class="col-xs-12">
                      <my-vote [_votee]='post' (upVote)='upVotePost($event)' (downVote)='downVotePost($event)'></my-vote>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
        </div> <!-- !post-container -->
      </div>  
    </div>
    
    
    
    <div *ngIf="type === templateTypeGroupList" class="row">
      <div class="col-xs-12">
        <div class="post-container">
          
          <div class="row">
            <div class="col-xs-12">
              <a [routerLink]="['ViewPost', {postid: post.id}]" class="post-title">
                <span>{{post.title}} </span> 
              </a>
              <span *ngIf="post.type === 'link'"> 
                <a target="_blank" [href]="post.link">[view link]</a>
              </span>
            </div>
          </div>
          
          <div class="row">
            <div class="col-xs-12">
              <div class="post-text">
                {{post.textTrimmed}}
              </div>
            </div>  
          </div>
          
          <div class="text-muted post-info">
            <div>
              <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                <i class="fa fa-user"></i> {{post.postedby.displayname}}
              </a> &bull; 
               {{ post.createdAt | timeAgo }} &bull; <!-- &bull; 
              <span (click)="gotoGroup(post.group.supergroup.name, post.group.name)">
                go/{{post.group.supergroup.name}}/{{post.group.name}}
              </span>
              -->
            </div>
            <div>
                <div class="row">
                  <div class="col-xs-6">
                    {{post.comments.length}} Comments
                    <span *ngIf="currentUser && currentUser.id == post.postedby.id"> &bull; 
                      <a class="" [routerLink]="['ConfirmPostDelete', {postid: post.id}]"> Delete </a>
                    </span>
                  </div>
                  <div class="col-xs-6">
                    <my-vote [_votee]='post' (upVote)='upVotePost($event)' (downVote)='downVotePost($event)'></my-vote>
                  </div>
                </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
    <div *ngIf="type === templateTypeMain">
      <div class="row">
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
            
            <div class="row">
              <div class="col-xs-12">
                <div class="post-text">
                  {{post.text}}
                </div>
              </div>  
            </div>
            <div class="">
              <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                <i class="fa fa-user"></i> {{post.postedby.displayname}} 
              </a> &bull; {{ post.createdAt | timeAgo }} &bull; <!--
              <a class="">
                Edit 
              </a> &bull; -->
              
                  <div class="row">
                    <div class="col-xs-6">
                      {{post.comments.length}} Comments
                      <span *ngIf="currentUser && currentUser.id == post.postedby.id"> &bull; 
                        <a class="" [routerLink]="['ConfirmPostDelete', {postid: post.id}]"> Delete </a>
                      </span>
                    </div>
                    <div class="col-xs-6">
                      <my-vote [_votee]='post' (upVote)='upVotePost($event)' (downVote)='downVotePost($event)'></my-vote>
                    </div>
                  </div>
                                
              &bull;
              <a class="" [routerLink]="['ViewGroup', {super_group_name: post.group.supergroup.name, group_name: post.group.name}]">
                go/{{post.group.supergroup.name}}/{{post.group.name}} 
              </a> &bull;
              <a [routerLink]="['NewComment1', {postid: post.id}]" class="">
                Reply 
              </a>
            </div>
          </div>
        </div>  
      </div>
    </div>
    
  </div>
  </div>
  `,
  styles: [`
  .my-post .post-container {
    border-bottom: 1px solid lightgrey;
    padding-bottom: 10px;
    padding-top: 10px;
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
    font-size: 24px;
    margin-top: 8px;
    margin-left: -1.5px;
    line-height: 1.18;
    letter-spacing: -.022em;
    font-family: "Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif;
    font-weight: 300;
    font-style: normal;
    color: rgba(0,0,0,.44);
    word-wrap: break-word;
  }
  .my-post .post-container .read-more {
    color: rgba(0, 0, 0, 0.8);
    display: block;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 11px;
    height: 25px;
    line-height: 25.2px;
    margin-top: 4px;
    margin-bottom: 4px;
    -webkit-font-smoothing: antialiased;
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
    border: 1px solid lightgrey;
    margin-top: 3px
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
    padding-left: 10px;
  }
  .my-post .post-container .post-grouplink {
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
  .my-post .post-container .post-createdat {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    padding-left: 10px;
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
  .my-post .post-container .bullet {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    padding-left: 5px;
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
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
  
  constructor(
    private _postService: PostService,
    private _router: Router) { }
  
  ngOnInit() {
    // TODO: Improve this
    this.templateTypeList = PostTemplateType.List;
    this.templateTypeGroupList = PostTemplateType.Grouplist;
    this.templateTypeMain = PostTemplateType.Main;
    console.log("PSOT", this.post)
    // I define this MAXCHARS var value by hunch
    let MAXCHARS = 150;
    if(this.post) this.post.readmore = false;
    if(this.post && this.post.text.length > MAXCHARS) {
      this.post.textTrimmed = this.post.text.substring(0, MAXCHARS) + ' ...';
      this.post.readmore = true;
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