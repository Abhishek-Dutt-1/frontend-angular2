import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {User} from '../user/user';
import {Post} from '../post/post';
//import {Group} from '../group/group';
import {Comment2Service} from './comment2.service';
import {AuthenticationService} from '../authentication/authentication.service';
//import {GroupService} from '../group/group.service';
//import {Observable} from 'rxjs/Observable';
//import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'my-new-comment2',
  template: `
  <div class="my-new-comment2">
  
  <div *ngIf="!_errorMsg">
  
    <h4>Write a New Comment:</h4>
    <form #comment1Form="ngForm" class="form-horizontal">
      
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
          <button (click)="onSubmit($event)" class="btn btn-default" [disabled]="!comment1Form.form.valid">Submit</button>
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
  inputs: ['comment1', 'post']
})
export class NewComment2Component {
  
  private post: Post = null;
  private comment1 = null;
  
  private _model: any = null;
    
  private _errorMsg: string = null;
  
  constructor(
    private _comment2Service: Comment2Service,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService,
    private _router: Router) {
  }
  
  ngOnInit() {

    this._model =  {
      text: 'New Comment', 
    }
    
    // Only logged in uses can comment1
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._model.postedby = currentUser;
    } else {
      this._errorMsg = "User must be logged in to create new posts.";      
    }
    
  }
  
  /**
   * Submit the new post form
   */
  onSubmit(event) {

    event.preventDefault();
  
    let newPost = this._comment2Service.createNewComment2(this._model, this.comment1).then(comment1 => {
      this._router.navigate(['ViewPost', {postid: this.post.id}]);
    });

  } 
  
  goBack() {
    window.history.back();
  }

}