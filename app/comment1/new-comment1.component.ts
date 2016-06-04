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
          <textarea class="form-control" rows="5" required
            [(ngModel)] = "_model.text" placeholder="New Comment"
            ngControl = "text" #text="ngForm"
          ></textarea>
          <div [hidden]="text.valid || text.pristine" class="alert alert-danger">
            Text is required
          </div>
        </div>
      </div>

      <div class="form-group" *ngIf="_showMemeList">
        <label for="meme-selector" class="col-md-1">Meme Selector</label>
        <div class="col-md-11">
          <my-meme-selector></my-meme-selector>
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
    .my-new-post .ng-valid[required] {
      border-left: 5px solid #42A948; /* green */
    }
    .my-new-post .ng-invalid {
      border-left: 5px solid #a94442; /* red */
    }
    .my-new-post form {
      min-width: 250px;
    }
    .my-new-post .post-textarea textarea{
      width: 100%;
    }
    .my-new-post .post-text input{
      width: 100%;
    }
    .my-new-post .post-select select{
      width: 100%;
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
      postedby: null
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

    let newPost = this._comment1Service.createNewComment1(this._model)
      .subscribe(
        comment1 => {
          console.log(comment1)
          this._router.navigate(['ViewPost', {postid: this.post.id}]);
        },
        error => console.log(error)
      );
  }

  goBack() {
    window.history.back();
  }

}
