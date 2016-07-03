import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';

import { AppService } from './app.service';
//import { DashboardComponent } from './dashboard/dashboard.component';

import { PostService } from './post/post.service';
//import { PostListLoaderComponent } from './post/post-list-loader.component';
//import { PostDetailComponent } from './post/post-detail.component';
import { ViewPostComponent } from './post/view-post.component';
import { NewPostComponent } from './post/new-post.component';
import { ConfirmPostDeleteComponent } from './post/confirm-post-delete.component';

import { SuperGroupPostListLoaderComponent } from './super_group/super_group-post-list-loader.component';
import { ViewGroupListComponent } from './super_group/view-grouplist.component';
import { SuperGroupService } from './super_group/super_group.service';

import { GroupService } from './group/group.service';
import { NewGroupComponent } from './group/new-group.component';
import { ViewGroupComponent } from './group/view-group.component';
import { EditGroupComponent } from './group/edit-group.component';
import { ApproveMembershipComponent } from './group/approve-membership.component';

import { HyperGroupPostListLoaderComponent } from './hyper_group/hyper_group-post-list-loader.component';
import { HyperGroupService } from './hyper_group/hyper_group.service';

import { NewUserComponent } from './user/new-user.component';
import { ViewUserComponent } from './user/view-user.component';
import { EditUserComponent } from './user/edit-user.component';
import { VerifyEmailComponent } from './misc/verify-email.component';
import { VerifyExtraEmailComponent } from './misc/verify-extra-email.component';
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

import { MemeService } from './meme/meme.service';
import { SpinnerComponent } from './misc/spinner.component';
import { AddSupergroupsComponent } from './hyper_group/add-supergroups.component';


@Component({
  selector: 'my-app-component',
  template: `
  <div class="my-app-component">
    <div class="container-fluid">

        <div class="row">
          <div class="header">
            <div class="col-xs-7 logo-container">
              <div class="logo">
                <a [routerLink]="['/HyperGroupPostListDefault']">
                  <span class="glyphicon glyphicon-home" aria-hidden="true"></span> Angry.City
                </a> <sup class="alpha">&alpha;</sup>
              </div>
            </div>
            <div class="col-xs-5 user-panel-container">
              <my-user-authentication-panel></my-user-authentication-panel>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <router-outlet></router-outlet>
          </div>
        </div>

        <my-spinner></my-spinner>

    </div>
  </div>
  `,
  styles: [`
    .my-app-component .header {
      height: 55px;
      color: white;
      height: 60px;
      font-size: 21px;
      font-family: Roboto, UILanguageFont, Arial, sans-serif;
/*
background-color: #0054a6;
background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #0054a6), color-stop(1, #004385));
background-image: -webkit-linear-gradient(top, #0054a6 0%, #004385 100%);
background-image:    -moz-linear-gradient(top, #0054a6 0%, #004385 100%);
background-image:      -o-linear-gradient(top, #0054a6 0%, #004385 100%);
background-image:     -ms-linear-gradient(top, #0054a6 0%, #004385 100%);
*/
background-color: #e40606;
background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #e40606), color-stop(1, #980505));
background-image: -webkit-linear-gradient(top, #e40606 0%, #980505 100%);
background-image:    -moz-linear-gradient(top, #e40606 0%, #980505 100%);
background-image:      -o-linear-gradient(top, #e40606 0%, #980505 100%);
background-image:     -ms-linear-gradient(top, #e40606 0%, #980505 100%);

      border-bottom: 1px solid #003264;
    }
    .my-app-component .header .logo-container {
      padding-top: 13px;
    }
    .my-app-component .header .logo a {
      vertical-align: middle;
      color: white;
      font-weight: bold;
      text-shadow: 3px 3px 3px rgba(0,0,0,0.5)
    }
    .my-app-component .header .logo a:hover {
      text-decoration: none;
    }
    .my-app-component .header .user-panel-container {
      text-align: right;
      font-size: 14px;
      padding-top: 20px;
    }
    .my-app-component .header .alpha {
    }
  `],
  //styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES, UserAuthenticationPanelComponent, SpinnerComponent],
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
    HyperGroupService,
    UserService,
    AuthenticationService,
    MemeService
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
    // Create a new post
    path: '/confirmpostdelete/:postid',
    name: 'ConfirmPostDelete',
    component: ConfirmPostDeleteComponent
  },
  {
    path: '/newgroup/:super_group_name',
    name: 'NewGroup',
    component: NewGroupComponent
  },
  {
    path: '/go/:super_group_name/:group_name',
    name: 'ViewGroup',
    component: ViewGroupComponent
  },
  {
    path: '/groups/:supergroup',
    name: 'ViewGroupList',
    component: ViewGroupListComponent
  },
  {
    path: '/editgroup/:group_id',
    name: 'EditGroup',
    component: EditGroupComponent
  },
  {
    path: '/approve-membership/:group_id',
    name: 'ApproveMembership',
    component: ApproveMembershipComponent
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
    path: '/verifyemail/:token',
    name: 'VerifyEmail',
    component: VerifyEmailComponent
  },,
  {
    path: '/verifyemail2/:token',
    name: 'VerifyExtraEmail',
    component: VerifyExtraEmailComponent
  },
/*
  {
    // Edit User Profile (with tab)
    path: '/user/edit/:tab',
    name: 'EditUserTab',
    component: EditUserComponent
  },
*/
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
    path: '/reply4/:postid/:comment3id',
    name: 'NewComment4',
    component: NewComment4LoaderComponent
  },
  {
    path: '/sub/:hypergroup',
    name: 'AddSupergroups',
    component: AddSupergroupsComponent
  }
])
export class AppComponent { }
