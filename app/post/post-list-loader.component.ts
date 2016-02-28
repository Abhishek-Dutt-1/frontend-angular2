import {Component, OnInit} from 'angular2/core';
import {Post} from './post';
//import {PostDetailComponent} from './post-detail.component';
import {PostService} from './post.service';
import {Router} from 'angular2/router';
import {PostListComponent} from './post-list.component';

@Component({
  selector: 'my-post-list-loader',
  template: `<my-post-list [posts]="posts" type="postTemplateType"></my-post-list>`,
  //templateUrl: 'app/post/post-list.component.html',
  styleUrls: ['app/post/post-list.component.css'],
  //directives: [PostDetailComponent],
  directives: [PostListComponent]
  //providers: []
})
export class PostListLoaderComponent /*implements OnInit*/ {

  posts: Post[];
  postTemplateType: string;

  constructor(
    private _postService: PostService
    //private _router: Router
    ) { }
  
  getPosts() {
    this._postService.getPosts().then(posts => this.posts = posts);
  }
  
  ngOnInit() {
    this.getPosts();
    this.postTemplateType = 'list';
  }
  
  /*
  gotoPost(id: number) {
    this._router.navigate(['ViewPost', {id: id}]);
  }
  gotoGroup(name) {
    this._router.navigate(['ViewGroup', {groupname: name}]);
  }
  */
}
