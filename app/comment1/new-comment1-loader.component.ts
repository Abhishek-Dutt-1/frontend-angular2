import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Post} from '../post/post';
import {PostComponent} from '../post/post.component';
import {PostService} from '../post/post.service';
import {NewComment1Component} from './new-comment1.component';
import {PostTemplateType} from '../post/post-template-types';

@Component({
  selector: 'my-comment1-loader',
  template: `
    <div class="my-comment1-loader">
        <h4>Reply to</h4>
        <my-post [post]="_post" [type]="_postTemplateType"></my-post>
        <my-new-comment1 [post]="_post"></my-new-comment1>
    </div>
  `,
  styles: [`
    .my-new-comment1-loader { }
  `],
  directives: [PostComponent, NewComment1Component]
})
export class NewComment1LoaderComponent implements OnInit {

  private _post: Post;
  private _postTemplateType: PostTemplateType;
  private _postid: number = null;
  
  constructor(
    private _postService: PostService,
    private _routeParams: RouteParams
  ) { }
  
  ngOnInit() {
    this._postTemplateType = PostTemplateType.Main;
    
    this._postid = +this._routeParams.get('postid');
    
    this._postService.getPost(this._postid).subscribe(post => {
      this._post = post;
    });
    
  }
  
  gotoNewPostForm() {
    //this._router.navigate(['NewPost']);
  }
}