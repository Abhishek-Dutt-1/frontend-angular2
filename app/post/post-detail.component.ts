import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Post} from './post';
import {PostService} from './post.service';


@Component({
  selector: 'my-post-detail',
  templateUrl: 'app/post/post-detail.component.html',
  styleUrls: ['app/post/post-detail.component.css'],
  inputs: ['post']
})
export class PostDetailComponent {
  
  constructor(
    private _postService: PostService,
    private _routeParams: RouteParams) {
  }
  
  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._postService.getPost(id)
      .then(post => this.post = post);
  }
  
  goBack() {
    window.history.back();
  }

    post: Post;
}