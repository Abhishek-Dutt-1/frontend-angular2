import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Post} from '../post/post';
import {PostService} from '../post/post.service';
import {Comment2} from '../comment2/comment2';
import {Comment2Component} from '../comment2/comment2.component';
import {Comment2Service} from '../comment2/comment2.service';
import {NewComment3Component} from './new-comment3.component';
import {PostTemplateType} from '../post/post-template-types';

@Component({
  selector: 'my-new-comment3-loader',
  template: `
    <div class="my-new-comment3-loader">
        <h4>Reply to</h4>
        <my-comment2 [comment2]="_comment2" [post]="_post"></my-comment2>
        <my-new-comment3 [comment2]="_comment2" [post]="_post"></my-new-comment3>
    </div>
  `,
  styles: [`
    .my-new-comment3-loader {
    }
  `],
  directives: [Comment2Component, NewComment3Component]
})
export class NewComment3LoaderComponent implements OnInit {

  private _post: Post;
  private _comment2: Comment2;

  constructor(
    private _postService: PostService,
    private _routeParams: RouteParams
  ) {}

  ngOnInit() {
    let postid     = this._routeParams.get('postid');
    let comment2id = this._routeParams.get('comment2id');
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
          //this._post = post;
          let post = res.post;
          post.comments = res.comments;
          this._post = post;

          var tmpComment2 = null;
          post.comments.find( function( comment1 ) {
            if( tmpComment2 ) return true;
            tmpComment2 = comment1.comments.find(function( comment2 ) {
              return comment2.id == comment2id;
            })
            return false;
          })
          //console.log(tmpComment2)
          this._comment2 = tmpComment2
        },
        error => console.log(error)
      );
  }

}
