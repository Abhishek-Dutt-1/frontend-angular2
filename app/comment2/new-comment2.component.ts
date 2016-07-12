import {Component, OnInit} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {User} from '../user/user';
import {Post} from '../post/post';
//import {Group} from '../group/group';
import {Comment2Service} from './comment2.service';
import {AuthenticationService} from '../authentication/authentication.service';
//import {GroupService} from '../group/group.service';
//import {Observable} from 'rxjs/Observable';
//import {Subject} from 'rxjs/Subject';
import {MemeSelectorComponent} from '../meme/meme-selector.component';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-new-comment2',
  template: `
  <div class="my-new-comment2">

  <div>

    <h4>Write a New Comment:</h4>
    <form #comment1Form="ngForm" class="form-horizontal" novalidate>

      <div class="post-textarea form-group">
        <label for="text" class="col-sm-2 control-label">Comment Text</label>
        <div class="col-sm-10">
          <div class="row">

            <div *ngIf="_model.meme_image_url" class="col-xs-2 meme-image-col">
              <div class="meme-image-container ">
                <img src="{{_model.meme_image_url}}" class="meme-image img-responsive img-rounded  center-block">
              </div>
            </div>

            <div [ngClass]="{'col-xs-10': _model.meme_image_url, 'col-xs-12': !_model.meme_image_url}">
              <textarea class="form-control" rows="5"
                [(ngModel)] = "_model.text" placeholder="New Comment" ngControl = "text" #text="ngForm"
              ></textarea>
              <div [hidden]="text.valid || text.pristine" class="alert alert-danger">
                Text is required
              </div>
            </div>

          </div>        <!-- ! row -->
        </div>
      </div>      <!-- ! post-textarea -->

      <div class="form-group" *ngIf="_showMemeList">
        <label for="meme-selector" class="col-sm-2 control-label">Select Meme</label>
        <div class="col-sm-10">
          <my-meme-selector (memeSelected)="memeClicked($event)"></my-meme-selector>
        </div>
      </div>

      <div class="post-as-anon form-group">
        <label for="post-as-anon" class="col-sm-2 control-label">Post As Anonymous</label>
        <div class="radio-inline">
          <label  class="radio-inline">
            <input type="radio" name="post-as-anon" (click)="_model.post_as_anon = 1"  [checked]="_model.post_as_anon === 1"> Yes
          </label>
          <label  class="radio-inline">
            <input type="radio" name="post-as-anon" (click)="_model.post_as_anon = 0" [checked]="_model.post_as_anon === 0"> No
          </label>
        </div>
      </div>

      <my-error [_errorMsg]="_errorMsg"></my-error>

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button (click)="_showMemeList = !_showMemeList" class="btn btn-default hidden">Meme</button>
          <button (click)="onSubmit($event)" class="btn btn-default" [disabled]="!comment1Form.form.valid">Submit</button>
          <button (click)="goBack()" class="btn btn-default">Cancel</button>
        </div>
      </div>
    </form>

  </div>

</div>
  `,
  styles: [`
    .my-new-comment2 .meme-image-col {
      padding-right: 0;
    }
    .my-new-comment2 .ng-valid[required] {
      border-left: 5px solid #42A948; /* green */
    }
    .my-new-comment2 .ng-invalid {
      border-left: 5px solid #a94442; /* red */
    }
    .my-new-comment2 form {
      min-width: 250px;
    }
    .my-new-comment2 .post-textarea textarea{
      width: 100%;
    }
    .my-new-comment2 .post-text input{
      width: 100%;
    }
    .my-new-comment2 .post-select select{
      width: 100%;
    }
  `],
  inputs: ['comment1', 'post'],
  directives: [MemeSelectorComponent, ErrorComponent]

})
export class NewComment2Component {

  private post: Post = null;
  private comment1 = null;
  private _model: any = null;
  private _errorMsg: string = "YOLO";
  private _showMemeList: boolean = true;

  constructor(
    private _comment2Service: Comment2Service,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService,
    private _router: Router) {
  }

  ngOnInit() {

    this._model =  {
      text: '',
      meme_image_url: '',
      postedby: null,
      post_as_anon: 0
    }

    /*
    // Only logged in uses can comment1
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._model.postedby = currentUser;
    } else {
      this._errorMsg = "User must be logged in to create new posts.";
    }
    */

    // Only logged in uses can comment2
    this._authenticationService.loggedInUser$.subscribe(currentUser => {
      if(currentUser) {
        //console.log("State change ", currentUser)
        this._model.postedby = currentUser;
        this._errorMsg = null;
      } else {
        this._errorMsg = "User must be logged in to reply.";
      }
    });
    // Only logged in uses can comment2 (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._model.postedby = currentUser;
      this._errorMsg = null;
    } else {
      this._errorMsg = "User must be logged in to reply.";
    }
  }

  /**
   * Submit the new post form
   */
  onSubmit(event) {

    if( !this._model.postedby || !this._model.postedby.id ) return;

    event.preventDefault();
    this._model.commentedon = this.comment1
    let properModel = {
      text         : this._model.text || null,
      meme_image_url : this._model.meme_image_url || null,
      postedby     : this._model.postedby.id,
      commentedon  : this._model.commentedon.id,
      parent_post_id: this.post.id,
      post_as_anon : this._model.post_as_anon ? true : false
    }

    //let newPost = this._comment2Service.createNewComment2(this._model)
    let newPost = this._comment2Service.createNewComment2( properModel )
      .subscribe(
        comment1 => {
          this._router.navigate(['ViewPost', {postid: this.post.id}]);
        },
        error => {
          //console.log(error)
          this._errorMsg = error;
      });
  }

  memeClicked(memeImageUrl: string) {
    //console.log("Inside post comp upvoting ", memeImageUrl);
    this._model.meme_image_url = memeImageUrl;
  }

  goBack() {
    window.history.back();
  }

}
