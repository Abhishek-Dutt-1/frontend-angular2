import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Post} from './post';
import {PostService} from './post.service';

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
  
  postTypes = ['text', 'link'];
  
  model = null
  
  submitted = false;
  
  onSubmit() {
    // prevent default
    // post-service-save-post
    // redirect on success
    // error on error
    this.submitted = true;
  }
   
  constructor(
    private _postService: PostService,
    private _routeParams: RouteParams) {
  }
  
  ngOnInit() {
    
    let group_of_groups_name = this._routeParams.get('gog_name');
    let group_name = this._routeParams.get('group_name');
    
    this.model =  {
      title: 'New Title', 
      text: 'New Text', 
      type: this.postTypes[0],
      group_of_groups: group_of_groups_name,
      group: group_name
    } 
    /*
    let id = +this._routeParams.get('id');
    this._postService.getPost(id)
      .then(post => this.post = post);
    */
  }
  
  goBack() {
    window.history.back();
  }

}