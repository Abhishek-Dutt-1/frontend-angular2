import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from 'angular2/http';

import { HeroService }     from './hero/hero.service';
import { HeroesComponent } from './hero/heroes.component';
import { HeroDetailComponent } from './hero/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PostService }     from './post/post.service';
import { PostListLoaderComponent } from './post/post-list-loader.component';
import { PostDetailComponent } from './post/post-detail.component';
import { ViewPostComponent } from './post/view-post.component';
import { NewPostComponent } from './post/new-post.component';
import { GroupOfGroupsPostListLoaderComponent } from './post/group-of-groups-post-list-loader.component';

import { GroupService }     from './group/group.service';
import { ViewGroupComponent } from './group/view-group.component';

import { NewUserComponent } from './user/new-user.component';
import { ViewUserComponent } from './user/view-user.component';
import { UserService } from './user/user.service';
import { UserAuthenticationPanelComponent } from './user/user-authentication-panel.component';

import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'my-app-component',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES, UserAuthenticationPanelComponent],
  providers: [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    JSONP_PROVIDERS,
    HeroService,
    PostService,
    GroupService,
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
  */
  {
    path: '/go/',
    name: 'GroupOfGroupsPostList',
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
  },
  {
    // User Profile
    path: '/user/:id',
    name: 'ViewUser',
    component: ViewUserComponent
  }
])
export class AppComponent {
  
  //title = 'Tour of Heroes';
}
