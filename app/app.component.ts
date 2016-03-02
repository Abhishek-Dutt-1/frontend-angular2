import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { HeroService }     from './hero/hero.service';
import { HeroesComponent } from './hero/heroes.component';
import { HeroDetailComponent } from './hero/hero-detail.component';

import { PostService }     from './post/post.service';
import { PostListLoaderComponent } from './post/post-list-loader.component';
import { PostDetailComponent } from './post/post-detail.component';
import { ViewPostComponent } from './post/view-post.component';

import { GroupService }     from './group/group.service';
import { ViewGroupComponent } from './group/view-group.component';


import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'my-app',
  /*
  template: `
    <!-- <h1>{{title}}</h1> -->
    <nav>
        <a [routerLink]="['Dashboard']">Dashboard</a>
        <a [routerLink]="['Heroes']">Heroes</a>
        <a [routerLink]="['Posts']">Posts</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  */
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService,
    PostService,
    GroupService
  ]
})
@RouteConfig([
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
  {
    path: '/posts',
    name: 'PostList',
    component: PostListLoaderComponent
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
    // TODO: Seems to be a bug in BrowserSync with multiple tokens,
    // works if route is typed manually
    path: '/go/:parent_group_name/:groupname',
    name: 'ViewGroup',
    component: ViewGroupComponent
  }
])
export class AppComponent {
  //title = 'Tour of Heroes';
}
