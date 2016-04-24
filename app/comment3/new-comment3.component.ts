import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {User} from '../user/user';
import {Post} from '../post/post';
//import {Group} from '../group/group';
import {Comment3Service} from './comment3.service';
import {AuthenticationService} from '../authentication/authentication.service';
//import {GroupService} from '../group/group.service';
//import {Observable} from 'rxjs/Observable';
//import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'my-new-comment3',
  template: `
  <div class="my-new-comment3">
  
  <div *ngIf="!_errorMsg">
  
    <h4>Write a New Comment:</h4>
    <form #comment3Form="ngForm" class="form-horizontal">
      
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
          <button (click)="onSubmit($event)" class="btn btn-default" [disabled]="!comment3Form.form.valid">Submit</button>
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
  //templateUrl: 'app/post/new-post.component.html',
  styles: [`
    .my-new-comment3 .ng-valid[required] {
      border-left: 5px solid #42A948; /* green */
    }
    .my-new-comment3 .ng-invalid {
      border-left: 5px solid #a94442; /* red */
    }
    .my-new-comment3 form {
      min-width: 250px;
    }
    .my-new-comment3 .post-textarea textarea{
      width: 100%;
    }
    .my-new-comment3 .post-text input{
      width: 100%;
    }
    .my-new-comment3 .post-select select{
      width: 100%;
    }
  `],
  inputs: ['comment2', 'post']
})
export class NewComment3Component {
  
  private post: Post = null;
  private comment2 = null;
  private _model: any = null;
  private _errorMsg: string = null;
  
  constructor(
    private _comment3Service: Comment3Service,
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
    this._model.commentedon = this.comment2
  
    this._comment3Service.createNewComment3(this._model)
      .subscribe(
        comment3 => {
          this._router.navigate(['ViewPost', {postid: this.post.id}]);
        },
        error => console.log(error)
      );
  }
  
  goBack() {
    window.history.back();
  }

}