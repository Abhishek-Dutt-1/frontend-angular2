/** 
 * Displays a single post
 */
import {Component, OnInit} from 'angular2/core';
import {Post} from './post';
import {Router, RouterLink} from 'angular2/router';
import {PostService} from './post.service';
import {PostTemplateType} from './post-template-types';


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
                  </a> &bull; 12 days ago &bull; 
                  <a class="" [routerLink]="['ViewGroup', {super_group_name: post.group.supergroup.name, group_name: post.group.name}]">
                    go/{{post.group.supergroup.name}}/{{post.group.name}}
                  </a>
                </div>
                <div>
                  {{post.upvotes}} <i class="fa fa-arrow-up"></i> &bull; <i class="fa fa-arrow-down"></i> {{post.downvotes}} &bull; {{post.comments.length}} Comments
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
              12 days ago <!-- &bull; 
              <span (click)="gotoGroup(post.group.supergroup.name, post.group.name)">
                go/{{post.group.supergroup.name}}/{{post.group.name}}
              </span>
              -->
            </div>
            <div>
              {{post.upvotes}} <i class="fa fa-arrow-up"></i> &bull; {{post.downvotes}} <i class="fa fa-arrow-down"></i> &bull; {{post.comments.length}} Comments
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
              </a> &bull; <!--
              <a class="">
                Edit 
              </a> &bull; -->
              <a (click)="upVotePost(post.id)" class="">
                {{post.upvotes}} <i class="fa fa-arrow-up"></i> 
              </a> &bull; 
              <a (click)="downVotePost(post.id)" class="">
                <i class="fa fa-arrow-down"></i> {{post.downvotes}} 
              </a> &bull;
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
  inputs: ['post', 'type'],
  directives: [RouterLink]
})
export class PostComponent implements OnInit {
  post: Post;
  type: string;
  templateTypeList: PostTemplateType;
  templateTypeGroupList: PostTemplateType;
  templateTypeMain: PostTemplateType;
  
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
  
  /*
  gotoGroup(super_group_name, groupname) {
    this._router.navigate(['ViewGroup', {super_group_name: super_group_name, group_name: name}]);
  }
  */
  
  goBack() {
    window.history.back();
  }

  upVotePost(id:number) {
    this.post.upvotes++
    this._postService.upVotePost(id)  
  }
  
  downVotePost(id:number) {
    this.post.downvotes++
    this._postService.downVotePost(id)  
  }
}