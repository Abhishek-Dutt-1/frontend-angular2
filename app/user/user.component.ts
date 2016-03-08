/** 
 * Displays a single post
 */
import {Component, OnInit} from 'angular2/core';
import {User} from './user';
import {Router} from 'angular2/router';
import {UserService} from './user.service';

@Component({
  selector: 'my-user',
  template: `
    <div *ngIf="user">
      <div class="my-user">
        <div>Display Name: {{user.displayname}}</div>
        <div>Email: {{user.email}}</div>
        <div>International: {{user.international}}</div>
        <div>Natioanl: {{user.national}}</div>
        <div>State: {{user.state}}</div>
        <div>City: {{user.city}}</div>
        <div>Sub-City: {{user.sub_city}}</div>
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          Edit 
        </a>
        <a (click)="goBack()" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          Back 
        </a>
      </div>
    </div>
  `,
  styleUrls: ['app/post/post.component.css'],
  inputs: ['user']
})
export class UserComponent {
  
  user: User;
  /*
  type: string;
  templateTypeList: PostTemplateType;
  templateTypeGroupList: PostTemplateType;
  templateTypeMain: PostTemplateType;
  */
  
  constructor(
    //private _postService: PostService,
    //private _router: Router
    ) { }
  
  ngOnInit() {
  }  
  /*
  gotoPost(id: number) {
    this._router.navigate(['ViewPost', {id: id}]);
  }
  
  gotoGroup(parent_group_name, groupname) {
    this._router.navigate(['ViewGroup', {group_of_groups_name: parent_group_name, group_name: name}]);
  }
  */
  goBack() {
    window.history.back();
  }

}