import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Post} from '../post/post';
import {PostService} from '../post/post.service';
import {Comment1} from '../comment1/comment1';
import {Comment1Component} from '../comment1/comment1.component';
import {Comment1Service} from '../comment1/comment1.service';
import {NewComment2Component} from './new-comment2.component';
import {PostTemplateType} from '../post/post-template-types';
import {AppService} from '../app.service';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-new-comment2-loader',
  template: `
    <div class="my-new-comment2-loader">
        <h2>Reply to</h2>
        <my-error [_errorMsg]="_errorMsg"></my-error>
        <my-comment1 [comment1]="_comment1" [post]="_post"></my-comment1>
        <my-new-comment2 [comment1]="_comment1" [post]="_post"></my-new-comment2>
    </div>
  `,
  styles: [`
    .my-new-comment2-loader {
    }
  `],
  directives: [Comment1Component, NewComment2Component, ErrorComponent]
})
export class NewComment2LoaderComponent implements OnInit {

  private _post: Post;
  private _comment1: Comment1;
  private _errorMsg = null;
  //private _comment1id: number = null;

  constructor(
    private _appService: AppService,
    private _postService: PostService,
    //private _comment1Service: Comment1Service,
    private _routeParams: RouteParams
  ) {}

  ngOnInit() {
    let postid     = this._routeParams.get('postid');
    let comment1id = this._routeParams.get('comment1id');
    /*
    this._postService.getPost(postid).then(post => {
      this._post = post;
      this._comment1Service.getComment1ById(comment1id).then(comment1 => {
        this._comment1 = comment1;
      });
    });
    */
    this._postService.getPost(postid)
      .subscribe(
        res => {
          //console.log(post);
          let post = res.post;
          post.comments = res.comments;
          this._post = post;

          //this._post = post;
          this._comment1 = post.comments.find( function( comment ) { return comment.id == comment1id; } )
        },
        error => {
          //console.log(error);
          this._errorMsg = error;
        });
  }

  ngOnDestroy() {
  }

}
