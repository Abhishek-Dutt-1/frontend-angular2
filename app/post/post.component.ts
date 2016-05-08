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
                <span>{{post.title}} </span> 
              </a>
              <span *ngIf="post.type === 'link'"> 
                <a target="_blank" [href]="post.link">[view link]</a>
              </span>
            </div>
          </div>
          
          <div class="row">
            <div class="col-xs-12">
              {{post.text}}
            </div>  
          </div>
          
          <div class="row">
            <div class="col-xs-12">
              <div class="text-muted post-info">
                <div>
                  <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                    <i class="fa fa-user"></i> {{post.postedby.displayname}}
                  </a> &bull; {{ post.createdAt | timeAgo }} &bull;
                  <a class="" [routerLink]="['ViewGroup', {super_group_name: post.group.supergroup.name, group_name: post.group.name}]">
                    go/{{post.group.supergroup.name}}/{{post.group.name}}
                  </a>
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
              {{post.text}}
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
                {{post.text}}
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
    margin-bottom: 5px;
    font-weight: bold;
    color: black;
  }
  .my-post .post-info {
    font-size: 12px;
    overflow-wrap: break-word;
    word-wrap: break-word;
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