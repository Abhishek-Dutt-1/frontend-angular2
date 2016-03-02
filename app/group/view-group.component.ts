import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Group} from './group';
import {GroupService} from './group.service';
import {Post} from '../post/post';
import {PostListComponent} from '../post/post-list.component'
import {PostTemplateType} from '../post/post-template-types';

@Component({
  selector: 'my-view-group',
  templateUrl: 'app/group/view-group.component.html',
  styleUrls: ['app/group/view-group.component.css'],
  inputs: ['group'],
  directives: [PostListComponent]
})
export class ViewGroupComponent {
  
  group: Group;
  groupPosts: Post[];
  postTemplateType: PostTemplateType;
  
  constructor(
    private _groupService: GroupService,
    private _routeParams: RouteParams) {}
  
  ngOnInit() {
    
    let parent_group_name = this._routeParams.get('parent_group_name');
    let groupname = this._routeParams.get('groupname');
    
    this._groupService.getGroup(parent_group_name, groupname)
      .then(group => this.group = group);
      
    this._groupService.getPostsInGroup(parent_group_name, groupname)
      .then(posts => this.groupPosts = posts);
      
    this.postTemplateType = PostTemplateType.Grouplist;
  }
  
  goBack() {
    window.history.back();
  }
  
}