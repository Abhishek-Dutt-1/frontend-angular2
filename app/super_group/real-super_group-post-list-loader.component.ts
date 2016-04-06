/**
 * 
 * 
 * 
 * This is currently left unfinished as Super Group does not have
 * information about its child groups (in local version)
 * 
 * 
 * 
 * 
 */


import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {SuperGroup} from './super_group';
import {SuperGroupService} from './super_group.service';
import {Post} from '../post/post';
import {PostListComponent} from '../post/post-list.component'
import {PostTemplateType} from '../post/post-template-types';

@Component({
  selector: 'my-real-super-group-post-loader',
  template: `
  <div *ngIf="_super_group">
  
    <div class="my-real-super-group-post-loader">
      
      <div class="row">
        <div class="col-xs-12">
          <div class="group-details">
          
            <div class="panel panel-default group-details-panel">
            
              <div class="panel-heading">
                <h4 class="panel-title">{{_super_group.name}}</h4>
              </div>
              
              <div class="panel-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris sagittis pellentesque lacus eleifend lacinia...
              </div>
              
              <div class="panel-footer">
                <a>Group Info</a> | 
                <a (click)="gotoNewPostForm()" class="">
                  Create a New Post
                </a>
              </div>
              
            <div>
            
          </div>
        </div> <!-- !col -->
      </div> <!-- !row -->
      
      <my-post-list [posts]="groupPosts" [postTemplateType]="postTemplateType"></my-post-list>
      
    </div>  
  </div>  <!-- end top div -->
  `,
  styles: [`
  .my-real-super-group-post-loader .group-details-panel {
    margin-bottom: 0px;
    margin-top: 10px;
  }
  `],
  directives: [PostListComponent]
})
export class RealSuperGroupPostListLoaderComponent {
  
  private _super_group: SuperGroup;
  
  constructor(
    private _superGroupService: SuperGroupService,
    private _router: Router,
    private _routeParams: RouteParams) {}
  
  ngOnInit() {
        
    let super_group_name = this._routeParams.get('super_group_name');
    console.log("YUP WORKS")
    console.log(super_group_name);
    
    this._superGroupService.getSuperGroupByName(super_group_name)
      .then(gog => this._super_group = gog);
      
    /*  
    this._groupService.getPostsInGroup(group_of_groups_name, group_name)
      .then(posts => this.groupPosts = posts);
    */

  }
  
  goBack() {
    window.history.back();
  }
  
  gotoNewPostForm() {
    //this._router.navigate(['NewPost', {gog_name: this.group.parent_group.name, group_name: this.group.name}]);
  }
  
}