import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from './group';
import {GroupService} from './group.service';
import {Post} from '../post/post';
import {PostListComponent} from '../post/post-list.component'
import {PostTemplateType} from '../post/post-template-types';

@Component({
  selector: 'my-view-group',
  templateUrl: 'app/group/view-group.component.html',
  styleUrls: ['app/group/view-group.component.css'],
  //inputs: ['group'],
  directives: [PostListComponent]
})
export class ViewGroupComponent {
  
  group: Group;
  groupPosts: Post[];
  postTemplateType: PostTemplateType;
  
  constructor(
    private _groupService: GroupService,
    private _router: Router,
    private _routeParams: RouteParams) {}
  
  ngOnInit() {
    
    this.postTemplateType = PostTemplateType.Grouplist;
        
    let group_of_groups_name = this._routeParams.get('group_of_groups_name');
    //console.log(group_of_groups_name);
    
    let group_name = this._routeParams.get('group_name');
    //console.log(group_name)
    
    this._groupService.getGroup(group_of_groups_name, group_name)
      .then(group => this.group = group);
      
    this._groupService.getPostsInGroup(group_of_groups_name, group_name)
      .then(posts => this.groupPosts = posts);

  }
  
  goBack() {
    window.history.back();
  }
  
  gotoNewPostForm() {
    this._router.navigate(['NewPost', {gog_name: this.group.parent_group.name, group_name: this.group.name}]);
  }
  
}