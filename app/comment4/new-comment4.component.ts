import {Component, OnInit} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {User} from '../user/user';
import {Post} from '../post/post';
//import {Group} from '../group/group';
import {Comment4Service} from './comment4.service';
import {AuthenticationService} from '../authentication/authentication.service';
//import {GroupService} from '../group/group.service';
//import {Observable} from 'rxjs/Observable';
//import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'my-new-comment4',
  template: `
  <div class="my-new-comment4">

  <div *ngIf="!_errorMsg">

    <h4>Write a New Comment:</h4>
    <form #comment4Form="ngForm" class="form-horizontal">

      <div class="post-textarea form-group">
        <label for="text" class="col-md-1">Comment Text</label>
        <div class="col-md-11">
          <textarea class="form-control" rows="5" required
            [(ngModel)] = "_model.text"
            ngControl = "text" #text="ngForm"
          ></textarea>
          <div [hidden]="text.valid || text.pristine" class="alert alert-danger">
            Text is required
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-md-offset-1 col-md-11">
          <button (click)="onSubmit($event)" class="btn btn-default" [disabled]="!comment4Form.form.valid">Submit</button>
          <button (click)="goBack()" class="btn btn-default">Cancel</button>
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
    .my-new-comment4 .ng-valid[required] {
      border-left: 5px solid #42A948; /* green */
    }
    .my-new-comment4 .ng-invalid {
      border-left: 5px solid #a94442; /* red */
    }
    .my-new-comment4 form {
      min-width: 250px;
    }
    .my-new-comment4 .post-textarea textarea{
      width: 100%;
    }
    .my-new-comment4 .post-text input{
      width: 100%;
    }
    .my-new-comment4 .post-select select{
      width: 100%;
    }
  `],
  inputs: ['comment3', 'post']
})
export class NewComment4Component {

  private post: Post = null;
  private comment3 = null;
  private _model: any = null;
  private _errorMsg: string = null;

  constructor(
    private _comment4Service: Comment4Service,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService,
    private _router: Router) {
  }

  ngOnInit() {

    this._model =  {
      text: 'New Comment',
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
        console.log("State change ", currentUser)
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

    event.preventDefault();
    this._model.commentedon = this.comment3

    console.log(this._model)

    let newPost = this._comment4Service.createNewComment4(this._model)
      .subscribe(
        comment => {
          this._router.navigate(['ViewPost', {postid: this.post.id}]);
        },
        error => console.log(error)
      );

  }

  goBack() {
    window.history.back();
  }

}
