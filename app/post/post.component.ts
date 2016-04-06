/** 
 * Displays a single post
 */
import {Component, OnInit} from 'angular2/core';
import {Post} from './post';
import {Router} from 'angular2/router';
import {PostService} from './post.service';
import {PostTemplateType} from './post-template-types';


@Component({
  selector: 'my-post',
  template: `
  <div class="my-post">
  
    <div *ngIf="type === templateTypeList" class="row">
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
              <i class="fa fa-user"></i>
              {{post.postedby.displayname}} | 12 days ago | 
              <span (click)="gotoGroup(post.group.parent_group.name, post.group.name)">
                go/{{post.group.parent_group.name}}/{{post.group.name}}
              </span>
            </div>
            <div>
              {{post.upvotes}} Upvote | {{post.downvotes}} Downvote | {{post.comments.length}} Comments
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
              <i class="fa fa-user"></i>
              {{post.postedby.displayname}} | 12 days ago <!-- | 
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
              <a class="">
                <i class="fa fa-user"></i> {{post.postedby.displayname}} 
              </a> | 
              <a class="">
                Edit 
              </a> | 
              <a (click)="upVotePost(post.id)" class="">
                {{post.upvotes}} Vote up
              </a> | 
              <a (click)="downVotePost(post.id)" class="">
                {{post.downvotes}} Vote down
              </a> | 
              <a (click)="gotoGroup(post.group.parent_group.name, post.group.name)" 
                class="">
                go/{{post.group.parent_group.name}}/{{post.group.name}} 
              </a> | 
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
  inputs: ['post', 'type']
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
  
  gotoGroup(parent_group_name, groupname) {
    this._router.navigate(['ViewGroup', {group_of_groups_name: parent_group_name, group_name: name}]);
  }
  
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