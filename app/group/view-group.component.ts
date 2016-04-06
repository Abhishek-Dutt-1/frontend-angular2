import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Group} from './group';
import {GroupService} from './group.service';
import {Post} from '../post/post';
import {PostListComponent} from '../post/post-list.component'
import {PostTemplateType} from '../post/post-template-types';

@Component({
  selector: 'my-view-group',
  //templateUrl: 'app/group/view-group.component.html',
  template: `
  <div *ngIf="group">
  
    <div class="my-view-group">
      
      <div class="row">
        <div class="col-xs-12">
          <div class="group-details">
          
            <div class="panel panel-default group-details-panel">
              <div class="panel-heading">
                <h4 class="panel-title">{{group.super_group.name}}/{{group.name}}</h4>
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
  .my-view-group .group-details-panel {
    margin-bottom: 0px;
    margin-top: 10px;
    /*
    padding-bottom: 10px;
    border-bottom: 1px solid lightgrey;
    */
  }
  `],
  //styleUrls: ['app/group/view-group.component.css'],
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
        
    let super_group_name = this._routeParams.get('super_group_name');
    //console.log(super_group_name);
    
    let group_name = this._routeParams.get('group_name');
    //console.log(group_name)
    
    this._groupService.getGroup(super_group_name, group_name)
      .then(group => this.group = group);
      
    this._groupService.getPostsInGroup(super_group_name, group_name)
      .then(posts => this.groupPosts = posts);

  }
  
  goBack() {
    window.history.back();
  }
  
  gotoNewPostForm() {
    this._router.navigate(['NewPost', {super_group_name: this.group.super_group.name, group_name: this.group.name}]);
  }
  
}