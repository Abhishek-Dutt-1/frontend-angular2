import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from 'angular2/http';

import { AppService }     from './app.service';

import { HeroService }     from './hero/hero.service';
import { HeroesComponent } from './hero/heroes.component';
import { HeroDetailComponent } from './hero/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PostService }     from './post/post.service';
import { PostListLoaderComponent } from './post/post-list-loader.component';
import { PostDetailComponent } from './post/post-detail.component';
import { ViewPostComponent } from './post/view-post.component';
import { NewPostComponent } from './post/new-post.component';

import { GroupOfGroupsService }     from './group_of_groups/group_of_groups.service';
import { GroupOfGroupsPostListLoaderComponent } from './post/group-of-groups-post-list-loader.component';

import { GroupService }     from './group/group.service';
import { ViewGroupComponent } from './group/view-group.component';

import { NewUserComponent } from './user/new-user.component';
import { ViewUserComponent } from './user/view-user.component';
import { EditUserComponent } from './user/edit-user.component';
import { UserService } from './user/user.service';
import { UserAuthenticationPanelComponent } from './user/user-authentication-panel.component';

import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';

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
                <a [routerLink]="['/GroupOfGroupsPostListDefault']">
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
    HeroService,
    PostService,
    GroupService,
    GroupOfGroupsService,
    UserService,
    AuthenticationService
  ]
})
@RouteConfig([
  /*
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
  */
  /* DEPRICATED
  {
    path: '/go',
    name: 'PostList',
    component: PostListLoaderComponent
  },
  *//*
  {
    path: '/go',
    name: 'GroupOfGroupsPostList1',
    component: GroupOfGroupsPostListLoaderComponent,
    useAsDefault: true
  },*/
  {
    path: '/go/:geo',
    name: 'GroupOfGroupsPostList',
    component: GroupOfGroupsPostListLoaderComponent,
  },  
  {
    path: '/go',
    name: 'GroupOfGroupsPostListDefault',
    component: GroupOfGroupsPostListLoaderComponent,
    useAsDefault: true
  },
  {
    // would be changed to edit post
    path: '/postdetail/:id',
    name: 'PostDetail',
    component: PostDetailComponent
  },
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
    // TODO: Seems to be a bug in BrowserSync with multiple tokens,
    // works if route is typed manually
    path: '/go/:group_of_groups_name/:group_name',
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
  }
])
export class AppComponent { }
