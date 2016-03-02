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
  templateUrl: 'app/post/view-post.component.html',
  styleUrls: ['app/post/view-post.component.css'],
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
    this._postService.getPost(id).then(post => this.post = post);
     this.postTemplateType = PostTemplateType.Main;
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