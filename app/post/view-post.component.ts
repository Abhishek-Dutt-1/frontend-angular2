import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Post} from './post';
import {PostService} from './post.service';
import {PostComponent} from './post.component';
import {Comment1Component} from '../comment1/comment1.component';
import {Comment2Component} from '../comment2/comment2.component';
import {PostTemplateType} from './post-template-types';

@Component({
  selector: 'my-view-post',
  //templateUrl: 'app/post/view-post.component.html',
  template: `
    <div class="my-view-post">
    
      <div *ngIf="post">
        <my-post [post]="post" [type]="postTemplateType"></my-post>
        
        <!-- split it into comment-list component if need to reuse -->
        <div> <!-- comments start -->
          <!-- Replies to Post -->
          <div class="comment-list level-1">
            <div *ngFor="#comment1 of post.comments" class="comment-level-1">
              <my-comment1 [comment1]="comment1"></my-comment1>
              
              <!-- Replies to comments (Level 2) -->
              <div *ngIf="comment1.comments && comment1.comments.length > 0" class="comment-list level-2">
                <div *ngFor="#comment2 of comment1.comments" class="comment-level-2">
                  <my-comment2 [comment2]="comment2"></my-comment2>

                  <!-- Replies to reply (Level 3) -->
                  <div *ngIf="comment2.comments && comment2.comments.length > 0" class="comment-list level-3">
                    <div *ngFor="#comment3 of comment2.comments" class="comment-level-3">
                      <my-comment3 [comment3]="comment3"></my-comment3>
                      
                    </div>
                  </div>
          
                </div>
              </div>
              
            </div>
          </div>
        </div>  <!-- end comments -->
        
      </div>  <!-- end ifPost -->
    </div>
  `,
  styles: [`
  .my-view-post .comment-level-1 {
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding: 10px 0;
  }
  .my-view-post .comment-list .level-2 {
    padding: 10px 10px 0px 20px;
  }
  .my-view-post .comment-list .level-3 {
    padding: 10px 10px 0px 20px;
  }
  `],
  //styleUrls: ['app/post/view-post.component.css'],
  directives: [PostComponent, Comment1Component, Comment2Component]
  //////inputs: ['post']////
})
export class ViewPostComponent {
  
  post: Post;
  postTemplateType: PostTemplateType;
    
  constructor(
    private _postService: PostService,
    private _routeParams: RouteParams) {
  }
  
  ngOnInit() {
    let id = +this._routeParams.get('id');
    this.postTemplateType = PostTemplateType.Main;
    this._postService.getPost(id).then(post => this.post = post);
  }
  
  /*
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
  */
}