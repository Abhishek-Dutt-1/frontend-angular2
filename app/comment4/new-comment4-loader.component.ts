import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {Post} from '../post/post';
import {PostService} from '../post/post.service';
import {Comment3} from '../comment3/comment3';
import {Comment3Component} from '../comment3/comment3.component';
//import {Comment3Service} from '../comment3/comment3.service';
import {NewComment4Component} from './new-comment4.component';
import {PostTemplateType} from '../post/post-template-types';

@Component({
  selector: 'my-new-comment4-loader',
  template: `
    <div class="my-new-comment4-loader">
        <h4>Reply to</h4>
        <my-comment3 [comment3]="_comment3" [post]="_post"></my-comment3>
        <my-new-comment4 [comment3]="_comment3" [post]="_post"></my-new-comment4>
    </div>
  `,
  styles: [`
    .my-new-comment4-loader {
    }
  `],
  directives: [Comment3Component, NewComment4Component]
})
export class NewComment4LoaderComponent implements OnInit {

  private _post: Post;
  private _comment3: Comment3;
  //private _comment1id: number = null;

  constructor(
    private _postService: PostService,
    //private _comment2Service: Comment2Service,
    private _routeParams: RouteParams
  ) {}

  ngOnInit() {
    let postid     = this._routeParams.get('postid');
    let comment3id = this._routeParams.get('comment3id');
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
        post => {
          console.log(post);
          this._post = post;
          var tmpComment3 = null;
          post.comments.find(function(comment1) {
            if(tmpComment3) return true;
            comment1.comments.find(function(comment2) {
              if(tmpComment3) return true;
              tmpComment3 = comment2.comments.find(function(comment3) {
                return comment3.id == comment3id;
              })
              return false;
            })
            return false;
          })
          this._comment3 = tmpComment3
          console.log(this._comment3)
        },
        error => console.log(error)
      );
  }

}
