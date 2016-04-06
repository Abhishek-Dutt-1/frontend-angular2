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
  <div class="my-post">
  
    <div *ngIf="type === templateTypeList" class="row">
      <div class="col-xs-12">
        <div class="post-container">
          
          <div class="row">
            <div class="col-xs-12">
              <div (click)="gotoPost(post.id)" class="post-title">
                <h5>{{post.title}}</h5>
              </div>
            </div>
          </div>
          
          <div class="">
            {{post.text}}  
          </div>
          
          <div class="text-muted post-info">
            <div>
              <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                <i class="fa fa-user"></i> {{post.postedby.displayname}}
              </a> &bull; 12 days ago &bull; 
              <a class="" [routerLink]="['ViewGroup', {super_group_name: post.group.super_group.name, group_name: post.group.name}]">
                go/{{post.group.super_group.name}}/{{post.group.name}}
              </a>
            </div>
            <div>
              {{post.upvotes}} <i class="fa fa-arrow-up"></i> &bull; <i class="fa fa-arrow-down"></i> {{post.downvotes}} &bull; {{post.comments.length}} Comments
            </div>
          </div>
          
        </div>
      </div>  
    </div>
    
    <div *ngIf="type === templateTypeGroupList" class="row">
      <div class="col-xs-12">
        <div class="post-container">
          
          <div (click)="gotoPost(post.id)" class="post-title">
            <h5>{{post.title}}</h5>
          </div>
          
          <div class="">
            {{post.text}}  
          </div>
          
          <div class="text-muted post-info">
            <div>
              <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                <i class="fa fa-user"></i> {{post.postedby.displayname}}
              </a> | 
              12 days ago <!-- | 
              <span (click)="gotoGroup(post.group.parent_group.name, post.group.name)">
                go/{{post.group.parent_group.name}}/{{post.group.name}}
              </span>
              -->
            </div>
            <div>
              {{post.upvotes}} Upvote | {{post.downvotes}} Downvote | {{post.comments.length}} Comments
            </div>
          </div>
          
        </div>
      </div>
    </div>
    
    <div *ngIf="type === templateTypeMain">
      <div class="row">
        <div class="col-xs-12">
          <div class="post-container">
            <div class="">
              <h5 class="">{{post.title}}</h5>
            </div>
            <div class="">
              {{post.text}}
            </div>
            <div class="">
              <a class="" [routerLink]="['ViewUser', {id: post.postedby.id}]">
                <i class="fa fa-user"></i> {{post.postedby.displayname}} 
              </a> &bull; 
              <a class="">
                Edit 
              </a> &bull;
              <a (click)="upVotePost(post.id)" class="">
                {{post.upvotes}} <i class="fa fa-arrow-up"></i> 
              </a> &bull; 
              <a (click)="downVotePost(post.id)" class="">
                <i class="fa fa-arrow-down"></i> {{post.downvotes}} 
              </a> &bull;
              <a class="" [routerLink]="['ViewGroup', {super_group_name: post.group.super_group.name, group_name: post.group.name}]">
                go/{{post.group.super_group.name}}/{{post.group.name}} 
              </a> &bull;
              <a (click)="goBack()" class="">
                Back 
              </a>
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
  }
  .my-post .post-container h5 {
    margin-bottom: 5px;
  }
  .my-post .post-info {
    font-size: 12px;
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