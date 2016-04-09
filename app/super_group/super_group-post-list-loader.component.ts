import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {SuperGroup} from './super_group';
import {SuperGroupService} from './super_group.service';
import {GroupService} from '../group/group.service';
import {Post} from '../post/post';
import {Group} from '../group/group';
import {PostListComponent} from '../post/post-list.component'
import {PostTemplateType} from '../post/post-template-types';

@Component({
  selector: 'my-super-group-post-list-loader',
  template: `
  <div *ngIf="_super_group && _groups">
  
    <div class="my-super-group-post-list-loader">
      
      <div class="row">
        <div class="col-xs-12">
          <div class="group-details">
          
            <div class="panel panel-default group-details-panel">
            
              <div class="panel-heading">
                <h4 class="panel-title">{{_super_group.name}}</h4>
              </div>
              
              <div class="panel-body">
                <div *ngFor="#group of _groups">
                <a [routerLink]="['ViewGroup', {super_group_name: _super_group.name, group_name: group.name}]">{{group.name}}</a>
                </div>
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
  .my-super-group-post-list-loader .group-details-panel {
    margin-bottom: 0px;
    margin-top: 10px;
  }
  `],
  directives: [PostListComponent, RouterLink]
})
export class SuperGroupPostListLoaderComponent {
  
  private _groups: Group[];
  private _super_group_name: string;
  private _super_group: SuperGroup;
  
  constructor(
    private _groupService: GroupService,
    private _superGroupService: SuperGroupService,
    private _router: Router,
    private _routeParams: RouteParams) {}
  
  ngOnInit() {
        
    this._super_group_name = this._routeParams.get('super_group_name');

    this._groupService.getGroupsBySuperGroupName(this._super_group_name)
      .then(groups => {
        this._groups = groups
      });
    
    this._superGroupService.getSuperGroupsByName(this._super_group_name)
      .then(sg => this._super_group = sg);
      
  }
  
  goBack() {
    window.history.back();
  }
  
  gotoNewPostForm() {
    //this._router.navigate(['NewPost', {gog_name: this.group.parent_group.name, group_name: this.group.name}]);
  }
  
}