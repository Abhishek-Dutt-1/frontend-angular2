/**
 * Confirms comment delete
 */
import {Component, OnInit} from '@angular/core';
import {Post} from '../post/post';
import {User} from '../user/user';
import {Router, RouterLink, RouteParams} from '@angular/router-deprecated';
import {PostService} from '../post/post.service';
//import {PostTemplateType} from './post-template-types';
//import {PostComponent} from './post.component';
import {ErrorComponent} from '../misc/error.component';
//import {DateFormatPipe} from '../misc/date-format.pipe';
import {Comment1Service} from '../comment1/comment1.service';
import {Comment2Service} from '../comment2/comment2.service';
import {Comment3Service} from '../comment3/comment3.service';
import {Comment4Service} from '../comment4/comment4.service';
import {Comment1Component} from '../comment1/comment1.component';
import {Comment2Component} from '../comment2/comment2.component';
import {Comment3Component} from '../comment3/comment3.component';
import {Comment4Component} from '../comment4/comment4.component';

@Component({
  selector: 'my-confirm-comment-delete',
  template: `
  <my-error [_error]="_error"></my-error>
  <div *ngIf="_readyToGo">
    <div class="my-confirm-comment-delete">

      <div class="panel panel-default">
        <div class="panel-heading">Confirm?</div>
        <div class="panel-body">
          <div class="row"><div class="col-xs-12">
            Are you sure you want to delete this Comment?
          </div></div>
        </div>
        <div class="panel-footer">
          <div class="row">
            <div class="col-xs-12">
              <button class="btn btn-default" (click)="deleteThisComment()">Delete</button>
              <button class="btn btn-default" (click)="goBack()">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <my-comment1 *ngIf="_commentLevel == 1" [comment1]="_comment" [post]="_post" [currentUser]="_currentUser"></my-comment1>
      <my-comment2 *ngIf="_commentLevel == 2" [comment2]="_comment" [post]="_post" [currentUser]="_currentUser"></my-comment2>
      <my-comment3 *ngIf="_commentLevel == 3" [comment3]="_comment" [post]="_post" [currentUser]="_currentUser"></my-comment3>
      <my-comment4 *ngIf="_commentLevel == 4" [comment4]="_comment" [post]="_post" [currentUser]="_currentUser"></my-comment4>

    </div>
  </div>
  `,
  styles: [`
  .my-confirm-comment-delete {
    padding-top: 10px;
  }
  `],
  //inputs: ['post', 'type'],
  directives: [ErrorComponent, Comment1Component, Comment2Component, Comment3Component, Comment4Component],
  //pipes: [DateFormatPipe]
})
export class ConfirmCommentDeleteComponent implements OnInit {

  private _error = { msg: null, type: null };
  private _post: Post = null;
  private _currentUser: User = null;
  private _comment: any = null;
  private _commentService: any = null;
  private _commentLevel = null;
  private _commentId = null;
  private _postId = null;
  private _readyToGo: boolean = false;
  private _commentServiceSubcription = null;
  private _postServiceSubcription = null;

  constructor(
    private _postService: PostService,
    private _comment1Service: Comment1Service,
    private _comment2Service: Comment2Service,
    private _comment3Service: Comment3Service,
    private _comment4Service: Comment4Service,
    private _router: Router,
    private _routeParams: RouteParams
  ) { }

  ngOnInit() {

    // path: '/confirmcommentdelete/:postid/:commentlevel/:commentid',
    this._postId = this._routeParams.get('postid');
    this._commentLevel = this._routeParams.get('commentlevel');
    this._commentId = this._routeParams.get('commentid');
    if( !this._postId || !this._commentLevel || !this._commentId ) {
      this._router.navigate(['HyperGroupPostListDefault']);
    }

    this._commentLevel = parseInt( this._commentLevel, 10 )

    switch( this._commentLevel ) {
      case 1: this._commentService = this._comment1Service; break;
      case 2: this._commentService = this._comment2Service; break;
      case 3: this._commentService = this._comment3Service; break;
      case 4: this._commentService = this._comment4Service; break;
    }


    this._postServiceSubcription = this._postService.getPost(this._postId).subscribe(
      res => {
        // console.log(post)
        let post = res.post;
        post.comments = res.comments;
        this._post = post;
        if ( this._comment ) this._readyToGo = true
      },
      error => {
        this._error.msg = error;
        // console.log(error);
      })

    this._commentServiceSubcription = this._commentService.getComment(this._commentId).subscribe(
      comment => {
        // console.log( comment )
        this._comment = comment;
        if ( this._post ) this._readyToGo = true
      },
      error => {
        this._error.msg = error;
        console.log(error);
      })
  }

  deleteThisComment() {
    this._commentService.deleteCommentById( this._comment.id, this._post.id ).subscribe(
      deletedComment => {
        // console.log("DELETE SUCCESS");
        // console.log(deletedComment);
        this._error.msg = null;
        this._router.navigate( [ 'ViewPost', { postid: this._post.id } ] );
        // this._router.navigate( [ 'ViewGroup', { super_group_name: this._post.group.supergroup.name, group_name: this._post.group.name } ] );
      },
      error => {
       this._error.msg = error;
      })
  }

  gotoPost(id: number) {
    this._router.navigate(['ViewPost', { id : id }]);
  }

  ngOnDestroy() {
    // console.log("ngdest")
    this._commentServiceSubcription.unsubscribe();
    this._postServiceSubcription.unsubscribe()
  }

  goBack() {
    window.history.back();
  }

}
