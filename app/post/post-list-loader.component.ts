import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {Post} from './post';
//import {PostDetailComponent} from './post-detail.component';
import {PostService} from './post.service';
import {PostListComponent} from './post-list.component';
import {PostTemplateType} from './post-template-types';

@Component({
  selector: 'my-post-list-loader',
  //template: `<my-post-list [posts]="posts" type="postTemplateType"></my-post-list>`,
  //template: "<div>{{posts}} hello</div>",
  template: `<my-post-list [posts]="posts" [postTemplateType]="postTemplateType"></my-post-list>`,
  //template: `<my-post-list>{{postTemplateType}}{{posts}} hello</my-post-list>`,
  //templateUrl: 'app/post/post-list.component.html',
  //styleUrls: ['app/post/post-list.component.css'],
  //directives: [PostDetailComponent],
  directives: [PostListComponent]
  //providers: []
})
export class PostListLoaderComponent implements OnInit {

  posts: Post[];
  postTemplateType: PostTemplateType;

  constructor(
    private _postService: PostService,
    private _router: Router
    ) { }
  
  getPosts() {
    this._postService.getPosts().then(posts => this.posts = posts);
  }
  
  ngOnInit() {
    this.getPosts();
    this.postTemplateType = PostTemplateType.List;
  }
  
}