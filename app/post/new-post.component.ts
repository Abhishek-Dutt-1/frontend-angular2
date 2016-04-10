import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {Post} from './post';
import {Group} from '../group/group';
import {PostService} from './post.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {GroupService} from '../group/group.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'my-new-post',
  templateUrl: 'app/post/new-post.component.html',
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
  //styleUrls: ['app/post/new-post.component.css'],
  inputs: ['post']
})
export class NewPostComponent {
  
  private _postTypes = ['text', 'link'];
  
  private model = null;
  
  private _errorMsg: string = null;
  
  constructor(
    private _postService: PostService,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService,
    private _groupService: GroupService,
    private _router: Router) {
  }
  
  ngOnInit() {
    
    let super_group_name = this._routeParams.get('super_group_name');
    let group_name = this._routeParams.get('group_name');
    
    let superGroupSlashGroup = '';
    if(super_group_name && group_name) superGroupSlashGroup = super_group_name + '/' + group_name;
    if(super_group_name && !group_name) superGroupSlashGroup = super_group_name;
    if(!super_group_name && group_name) superGroupSlashGroup = group_name;
    
    
    this.model =  {
      title: 'New Title',
      link: '', 
      text: 'New Text', 
      type: this._postTypes[0],
      superGroupSlashGroup: superGroupSlashGroup
      //superGroupSlashGroup: super_group_name + '/' + group_name
    }
    
    // Only logged in uses can post
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {    
      this.model.postedby = currentUser;
    } else {
      this._errorMsg = "User must be logged in to create new posts.";      
    }
    
  }
  
  /**
   * Auto complete super_group/group  
   */
  /*  
  // Final version
  private _searchTermStream = new Subject<string>();
  search(term: string) {
    this._searchTermStream.next(term);
  }
  items:Observable<string[]> = this._searchTermStream
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap((term:string) => this._groupService.searchGroups(term));
  */
  
  // Temporary local version
  private items: Group[];
  search(term: string) {
    // get a 1 or 2 element array, correponding to trerm before and after a '/'
    // filter empty "" strings
    let termArray = term.split('/').slice(0, 2).filter(Boolean);
    this._groupService.searchGroups(termArray).then(
      searchResult => this.items = searchResult
    ).catch(
      err => console.log(err)
    )
  }
  
   
  /**
   * User clicked on a gog/group from the autocomplete dropdown list
   */
  selectSuperGroupSlashGroup(item) {
    this.model.superGroupSlashGroup = item
  }
  
  /**
   * Submit the new post form
   */
  onSubmit(event) {

    event.preventDefault();
  
    let newPost = this._postService.createNewPost(this.model)
    newPost.then(post => {
      this._router.navigate(['ViewPost', {postid: post.id}]);
    });

  } 
  
  goBack() {
    window.history.back();
  }

}