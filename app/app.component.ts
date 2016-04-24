import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from 'angular2/http';

import { AppService }     from './app.service';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PostService }     from './post/post.service';
//import { PostListLoaderComponent } from './post/post-list-loader.component';
//import { PostDetailComponent } from './post/post-detail.component';
import { ViewPostComponent } from './post/view-post.component';
import { NewPostComponent } from './post/new-post.component';

import { SuperGroupPostListLoaderComponent }     from './super_group/super_group-post-list-loader.component';
import { SuperGroupService }     from './super_group/super_group.service';

import { GroupService } from './group/group.service';
import { ViewGroupComponent } from './group/view-group.component';
import { NewGroupComponent } from './group/new-group.component';

import { HyperGroupPostListLoaderComponent } from './hyper_group/hyper_group-post-list-loader.component';

import { NewUserComponent } from './user/new-user.component';
import { ViewUserComponent } from './user/view-user.component';
import { EditUserComponent } from './user/edit-user.component';
import { UserService } from './user/user.service';
import { UserAuthenticationPanelComponent } from './user/user-authentication-panel.component';

import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';

import { NewComment1LoaderComponent } from './comment1/new-comment1-loader.component';
import { NewComment2LoaderComponent } from './comment2/new-comment2-loader.component';
import { NewComment3LoaderComponent } from './comment3/new-comment3-loader.component';
import { NewComment4LoaderComponent } from './comment4/new-comment4-loader.component';
import { Comment1Service } from './comment1/comment1.service';
import { Comment2Service } from './comment2/comment2.service';
import { Comment3Service } from './comment3/comment3.service';
import { Comment4Service } from './comment4/comment4.service';

@Component({
  selector: 'my-app-component',
  templateUrl: 'app/app.component.html',
  template: `
  <div class="my-app-component">
    <div class="container">
      
        <div class="row">
          <div class="header">
            <div class="col-xs-5">
              <div class="logo"><b>
                <a [routerLink]="['/HyperGroupPostListDefault']">
                  <span class="glyphicon glyphicon-home" aria-hidden="true"></span> YOLO!
                </a></b>
              </div>
            </div>
            <div class="col-xs-7 user-panel-container">
              <my-user-authentication-panel></my-user-authentication-panel>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col-xs-12">
            <router-outlet></router-outlet>
          </div>
        </div>
        

    </div>
  </div>
  `,
  styles: [`
    .my-app-component .user-panel-container {
      text-align: right;
    }
    .my-app-component .header {
      height: 40px;
      background-color: #0277bd;
      color: white;
      padding-top: 9px;
    }
    .my-app-component .header .logo a {
      vertical-align: middle;
      color: white;
    }
    .my-app-component .header .logo a:hover {
      text-decoration: none;
    }
  `],
  //styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES, UserAuthenticationPanelComponent],
  providers: [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    JSONP_PROVIDERS,
    AppService,
    Comment1Service,
    Comment2Service,
    Comment3Service,
    Comment4Service,
    PostService,
    GroupService,
    SuperGroupService,
    UserService,
    AuthenticationService
  ]
})
@RouteConfig([
  {
    path: '/go/:geo',
    name: 'HyperGroupPostList',
    component: HyperGroupPostListLoaderComponent,
  },  
  {
    path: '/go',
    name: 'HyperGroupPostListDefault',
    component: HyperGroupPostListLoaderComponent,
    useAsDefault: true
  },
  {
    path: '/sg/:super_group_name',
    name: 'SuperGroupPostList',
    component: SuperGroupPostListLoaderComponent
  },/*
  {
    // would be changed to edit post
    path: '/postdetail/:id',
    name: 'PostDetail',
    component: PostDetailComponent
  },*/
  {
    path: '/post/:postid',
    name: 'ViewPost',
    component: ViewPostComponent
  },
  {
    // Create a new post
    path: '/newpost',
    name: 'NewPost',
    component: NewPostComponent
  },
  {
    path: '/go/:super_group_name/:group_name',
    name: 'ViewGroup',
    component: ViewGroupComponent
  },
  {
    path: '/newgroup/:super_group_name',
    name: 'NewGroup',
    component: NewGroupComponent
  },
  {
    path: '/login',
    name: 'Login',
    component: AuthenticationComponent
  },
  {
    path: '/register',
    name: 'NewUser',
    component: NewUserComponent
  },/*
  {
    // Edit User Profile (with tab)
    path: '/user/edit/:tab',
    name: 'EditUserTab',
    component: EditUserComponent
  },*/
  {
    // Edit User Profile (no tab)
    path: '/user/edit',
    name: 'EditUser',
    component: EditUserComponent
  },/*
  {
    // User Profile (with tab)
    path: '/user/:id/:tab',
    name: 'ViewUserTab',
    component: ViewUserComponent
  },*/
  {
    // User Profile (no tab)
    path: '/user/:id',
    name: 'ViewUser',
    component: ViewUserComponent
  },
  {
    path: '/reply/:postid',
    name: 'NewComment1',
    component: NewComment1LoaderComponent
  },
  {
    path: '/reply2/:postid/:comment1id',
    name: 'NewComment2',
    component: NewComment2LoaderComponent
  },
  {
    path: '/reply3/:postid/:comment2id',
    name: 'NewComment3',
    component: NewComment3LoaderComponent
  },
  {
    path: '/reply4/:postid/:comment2id',
    name: 'NewComment4',
    component: NewComment4LoaderComponent
  }
])
export class AppComponent { }
