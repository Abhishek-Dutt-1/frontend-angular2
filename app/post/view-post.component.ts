import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Post} from './post';
import {PostService} from './post.service';


@Component({
  selector: 'my-view-post',
  templateUrl: 'app/post/view-post.component.html',
  styleUrls: ['app/post/view-post.component.css'],
  inputs: ['post']
})
export class ViewPostComponent {
  
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
  
  upVotePost(id:number) {
    this.post.upvotes++
    this._postService.upVotePost(id)  
  }
  
  downVotePost(id:number) {
    this.post.downvotes++
    this._postService.downVotePost(id)  
  }
  
  post: Post;
}