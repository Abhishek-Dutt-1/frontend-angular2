/** 
 * Confirms post delete
 */
import {Component, OnInit} from 'angular2/core';
import {Post} from './post';
import {Router, RouterLink, RouteParams} from 'angular2/router';
import {PostService} from './post.service';
import {PostTemplateType} from './post-template-types';
import {PostComponent} from './post.component';
import {ErrorComponent} from '../misc/error.component';
//import {DateFormatPipe} from '../misc/date-format.pipe';


@Component({
  selector: 'my-confirm-post-delete',
  template: `
  <div *ngIf="_post">
    <div class="my-confirm-post-delete">

      <my-error [_errorMsg]="_errorMsg"></my-error>
      <div class="panel panel-default">
        <div class="panel-heading">Confirm?</div>
        <div class="panel-body">
          <div class="row"><div class="col-xs-12">
            Are you sure you want to delete this post?
          </div></div>
        </div>
        <div class="panel-footer">
          <div class="row">
            <div class="col-xs-12">
              <button class="btn btn-default" (click)="deleteThisPost()">Delete</button>
              <button class="btn btn-default" (click)="goBack()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      
      <my-post [post]="_post" [type]="templateTypeMain"></my-post>

    </div>
  </div>
  `,
  styles: [`
  .my-confirm-post-delete { 
    padding-top: 10px;
  }
  `],
  //inputs: ['post', 'type'],
  directives: [PostComponent, ErrorComponent],
  //pipes: [DateFormatPipe]
})
export class ConfirmPostDeleteComponent implements OnInit {
  
  private templateTypeList        : PostTemplateType = null;
  private templateTypeGroupList   : PostTemplateType = null;
  private templateTypeMain        : PostTemplateType = null;
  
  private _post: Post = null;
  private _errorMsg: String = null;
  
  constructor(
    private _postService: PostService,
    private _router: Router,
    private _routeParams: RouteParams
  ) { }
  
  ngOnInit() {
    // TODO: Improve this
    this.templateTypeList = PostTemplateType.List;
    this.templateTypeGroupList = PostTemplateType.Grouplist;
    this.templateTypeMain = PostTemplateType.Main;
    
    let postId = this._routeParams.get('postid');
    if(!postId) {
      // No postId, go home
      this._router.navigate(['HyperGroupPostListDefault']);
    }
    
    this._postService.getPost(postId).subscribe(
      post => {
        console.log(post)
        this._post = post;
      },
      error => {
        this._errorMsg = error;
        console.log(error);
      })
    
  }
  
  deleteThisPost() {
    this._postService.deletePostById(this._post.id).subscribe(
      deletedPost => {
        console.log("DELETE SUCCESS");
        console.log(deletedPost);
        this._router.navigate(['ViewGroup', {super_group_name: this._post.group.supergroup.name, group_name: this._post.group.name}]);
      },
      error => {
       this._errorMsg = error; 
      })  
  }
  gotoPost(id: number) {
    this._router.navigate(['ViewPost', {id: id}]);
  }
  
  goBack() {
    window.history.back();
  }

}