import {Component, OnInit} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {User} from '../user/user';
//import {Group} from '../group/group';
import {Comment1Service} from './comment1.service';
import {AuthenticationService} from '../authentication/authentication.service';
//import {GroupService} from '../group/group.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {MemeSelectorComponent} from '../meme/meme-selector.component';

@Component({
  selector: 'my-new-comment1',
  template: `
  <div class="my-new-comment1">

  <div *ngIf="!_errorMsg">

    <h4>Write a New Comment:</h4>
    <form #comment1Form="ngForm" class="form-horizontal" novalidate>

      <div class="post-textarea form-group">
        <label for="text" class="col-md-1">Comment Text</label>
        <div class="col-md-11">
          <div class="row">

            <div *ngIf="_model.meme_image_url" class="col-xs-2 meme-image-col">
              <div class="meme-image-container ">
                <img src="{{_model.meme_image_url}}" class="meme-image img-responsive img-rounded  center-block">
              </div>
            </div>

            <div [ngClass]="{'col-xs-10': _model.meme_image_url, 'col-xs-12': !_model.meme_image_url}">
              <textarea class="form-control" rows="5"
                [(ngModel)] = "_model.text" placeholder="New Comment"
                ngControl = "text" #text="ngForm"
              ></textarea>
              <div [hidden]="text.valid || text.pristine" class="alert alert-danger">
                Text is required
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="form-group" *ngIf="_showMemeList">
        <label for="meme-selector" class="col-md-1">Meme Selector</label>
        <div class="col-md-11">
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

      <div class="form-group">
        <div class="col-md-offset-1 col-md-11">
          <button (click)="onSubmit($event)" class="btn btn-default" [disabled]="!comment1Form.form.valid">Submit</button>
          <button (click)="goBack()" class="btn btn-default">Cancel</button>
          <button (click)="_showMemeList = !_showMemeList" class="btn btn-default btn-sm pull-right">Meme</button>
        </div>
      </div>
    </form>

  </div>

  <div *ngIf="_errorMsg">
    {{_errorMsg}}
    <button (click)="goBack()" class="btn btn-default">Back</button>
  </div>

</div>
  `,
  styles: [`
    .my-new-comment1 .meme-image-col {
      padding-right: 0;
    }
    .my-new-comment1 .meme-image-container {
      /* padding: 5px;
      width: 150px; */
    }
    .my-new-comment1 .meme-image {
    }
  `],
  inputs: ['post'],
  directives: [MemeSelectorComponent]
})
export class NewComment1Component {

  private post = null;
  private _model: any = null;
  private _errorMsg: string = null;
  private _showMemeList: boolean = false;

  constructor(
    private _comment1Service: Comment1Service,
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

    // Only logged in uses can comment1
    /*
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._model.postedby = currentUser;
    } else {
      this._errorMsg = "User must be logged in to create new posts.";
    }
    */

    // Only logged in uses can comment1
    this._authenticationService.loggedInUser$.subscribe(currentUser => {
      if(currentUser) {
        console.log("State change ", currentUser)
        this._model.postedby = currentUser;
        this._errorMsg = null;
      } else {
        this._errorMsg = "User must be logged in to reply.";
      }
    });
    // Only logged in uses can comment1 (init version)
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

    event.preventDefault();
    this._model.commentedon = this.post

    let properModel = {
      text         : this._model.text || null,
      meme_image_url : this._model.meme_image_url,
      postedby     : this._model.postedby.id,
      commentedon  : this._model.commentedon.id,
      post_as_anon : this._model.post_as_anon ? true : false
    }

    //let newPost = this._comment1Service.createNewComment1( this._model )
    let newPost = this._comment1Service.createNewComment1( properModel )
      .subscribe(
        comment1 => {
          this._router.navigate(['ViewPost', {postid: this.post.id}]);
        },
        error => console.log(error)
      );
  }

  memeClicked(memeImageUrl: string) {
    this._model.meme_image_url = memeImageUrl;
  }

  goBack() {
    window.history.back();
  }

}
