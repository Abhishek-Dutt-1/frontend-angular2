import {Component, OnInit} from 'angular2/core';
import {Post} from './post';
//import {PostDetailComponent} from './post-detail.component';
import {PostService} from './post.service';
import {Router} from 'angular2/router';
import {PostComponent} from './post.component';

@Component({
  selector: 'my-post-list',
  templateUrl: 'app/post/post-list.component.html',
  styleUrls: ['app/post/post-list.component.css'],
  //directives: [PostDetailComponent],
  directives: [PostComponent],
  inputs: ["posts",  "type"]
  //providers: []
})
export class PostListComponent /*implements OnInit*/ {
  //title = 'Tour of Posts';
  posts: Post[];
  postTemplateType: string;
  //selectedPost: Post;
  constructor(
    private _postService: PostService,
    private _router: Router) { }
  
 
}
