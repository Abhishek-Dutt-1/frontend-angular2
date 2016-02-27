import {Component, OnInit} from 'angular2/core';
import {Post} from './post';
import {PostDetailComponent} from './post-detail.component';
import {PostService} from './post.service';
import {Router} from 'angular2/router';

@Component({
  selector: 'my-posts',
  templateUrl: 'app/post/posts.component.html',
  styleUrls: ['app/post/posts.component.css'],
  directives: [PostDetailComponent],
  providers: []
})
export class PostsComponent implements OnInit {
  title = 'Tour of Posts';
  posts: Post[];
  selectedPost: Post;
  constructor(
    private _postService: PostService,
    private _router: Router) { }
  
  getPosts() {
    this._postService.getPosts().then(posts => this.posts = posts);
  }
  
  ngOnInit() {
    this.getPosts();
  }
  
  onSelect(post: Post) { this.selectedPost = post; }
  
  gotoDetail() {
    this._router.navigate(['PostDetail', { id: this.selectedPost.id }]);
  }
}
