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
import {Group_Of_Groups} from './group_of_groups';
import {GroupOfGroupsService} from './group_of_groups.service';
import {Post} from '../post/post';
import {PostListComponent} from '../post/post-list.component'
import {PostTemplateType} from '../post/post-template-types';

@Component({
  selector: 'my-real-group-of-groups-post-loader',
  template: `
  <div *ngIf="_group_of_groups">
  
    <div class="my-real-group-of-groups-post-loader">
      
      <div class="row">
        <div class="col-xs-12">
          <div class="group-details">
          
            <div class="panel panel-default group-details-panel">
            
              <div class="panel-heading">
                <h4 class="panel-title">{{_group_of_groups.name}}</h4>
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
  .my-real-group-of-groups-post-loader .group-details-panel {
    margin-bottom: 0px;
    margin-top: 10px;
  }
  `],
  directives: [PostListComponent]
})
export class RealGroupOfGroupsPostListLoaderComponent {
  
  private _group_of_groups: Group_Of_Groups;
  
  constructor(
    private _groupOfGroupsService: GroupOfGroupsService,
    private _router: Router,
    private _routeParams: RouteParams) {}
  
  ngOnInit() {
        
    let group_of_groups_name = this._routeParams.get('group_of_groups_name');
    console.log("YUP WORKS")
    console.log(group_of_groups_name);
    
    this._groupOfGroupsService.getGroupByName(group_of_groups_name)
      .then(gog => this._group_of_groups = gog);
      
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