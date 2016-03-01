import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Group} from './group';
import {GroupService} from './group.service';

import {Post} from '../post/post';
import {PostListComponent} from '../post/post-list.component'

@Component({
  selector: 'my-view-group',
  templateUrl: 'app/group/view-group.component.html',
  styleUrls: ['app/group/view-group.component.css'],
  inputs: ['group'],
  directives: [PostListComponent]
})
export class ViewGroupComponent {
  
  constructor(
    private _groupService: GroupService,
    private _routeParams: RouteParams) {}
  
  ngOnInit() {
    let groupname = this._routeParams.get('groupname');
    
    this._groupService.getGroup(groupname)
      .then(group => this.group = group);
      
    this._groupService.getPostsInGroup(groupname)
      .then(posts => this.groupPosts = posts);
      
    this.postTemplateType = 'grouplist'
  }
  
  goBack() {
    window.history.back();
  }
  
  group: Group;
  groupPosts: Post[];
  postTemplateType: string;
}