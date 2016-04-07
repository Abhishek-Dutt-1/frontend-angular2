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

import { RealSuperGroupPostListLoaderComponent }     from './super_group/real-super_group-post-list-loader.component';
import { SuperGroupService }     from './super_group/super_group.service';
import { SuperGroupPostListLoaderComponent } from './post/super_group-post-list-loader.component';

import { GroupService } from './group/group.service';
import { ViewGroupComponent } from './group/view-group.component';

import { NewUserComponent } from './user/new-user.component';
import { ViewUserComponent } from './user/view-user.component';
import { EditUserComponent } from './user/edit-user.component';
import { UserService } from './user/user.service';
import { UserAuthenticationPanelComponent } from './user/user-authentication-panel.component';

import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';

import { NewComment1LoaderComponent } from './comment1/new-comment1-loader.component';
import { Comment1Service } from './comment1/comment1.service';

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
                <a [routerLink]="['/SuperGroupPostListDefault']">
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
    name: 'SuperGroupPostList',
    component: SuperGroupPostListLoaderComponent,
  },  
  {
    path: '/go',
    name: 'SuperGroupPostListDefault',
    component: SuperGroupPostListLoaderComponent,
    useAsDefault: true
  },
  {
    path: '/sg/:super_group_name',
    name: 'RealSuperGroupPostList',
    component: RealSuperGroupPostListLoaderComponent
  },/*
  {
    // would be changed to edit post
    path: '/postdetail/:id',
    name: 'PostDetail',
    component: PostDetailComponent
  },*/
  {
    path: '/post/:id',
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
  }
])
export class AppComponent { }
