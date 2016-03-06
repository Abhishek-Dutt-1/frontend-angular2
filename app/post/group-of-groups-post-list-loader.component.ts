import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Post} from './post';
//import {PostDetailComponent} from './post-detail.component';
import {PostService} from './post.service';
import {PostListComponent} from './post-list.component';
import {PostTemplateType} from './post-template-types';
import {Group_Of_Groups} from '../group_of_groups/group_of_groups';

@Component({
  selector: 'my-group-of-group-post-list-loader',
  //template: `<my-post-list [posts]="posts" type="postTemplateType"></my-post-list>`,
  //template: "<div>{{posts}} hello</div>",
  template: `
    <div class="my-post-list-loader">
      <div class="geo-filter">
        <button class="mdl-button mdl-js-button mdl-button--accent"
          (click)="gotoInternational()"
          >
          International
        </button>
        <button class="mdl-button mdl-js-button mdl-button--accent"
          (click)="gotoNational()"
          >
          National
        </button>
        <button class="mdl-button mdl-js-button mdl-button--accent"
          (click)="gotoState()"
          >
          State
        </button>
        <button class="mdl-button mdl-js-button mdl-button--accent"
          (click)="gotoCity()"
          >
          City
        </button>
        <button class="mdl-button mdl-js-button mdl-button--accent"
          (click)="gotoSubCity()"
          >
          Sub-City
        </button>
      <my-post-list [posts]="posts" [postTemplateType]="postTemplateType"></my-post-list>
      <!-- Colored FAB button with ripple -->
      <button (click)="gotoNewPostForm()"
        class="fab-button mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
        <i class="material-icons">add</i>
      </button>
    </div>
  `,
  styles: [`
    .my-post-list-loader .fab-button {
      position: fixed;
      right: 20px;
      bottom: 20px;
    }
  `],
  //template: `<my-post-list>{{postTemplateType}}{{posts}} hello</my-post-list>`,
  //templateUrl: 'app/post/post-list.component.html',
  //styleUrls: ['app/post/post-list.component.css'],
  //directives: [PostDetailComponent],
  directives: [PostListComponent]
  //providers: []
})
export class GroupOfGroupsPostListLoaderComponent implements OnInit {

  posts: Post[];
  postTemplateType: PostTemplateType;
  parent_gorup: Group_Of_Groups;

  constructor(
    private _postService: PostService,
    private _router: Router,
    private _routeParams: RouteParams
  ) { }
  
  ngOnInit() {
    this.postTemplateType = PostTemplateType.List;
    // Very strage behavious of gog_names
    // If entered directly in url its a string
    // if redirected (by gotoNational for eg) by angular its an array
    let gog_names = this._routeParams.get('gog');
    let gog_names_array = null
    gog_names = gog_names || 'india'
    if(Array.isArray(gog_names)) {
      gog_names_array = gog_names;
    } else {
      gog_names_array = gog_names.split(',')
    }
    this._postService.getPostsByGroupOfGroups(gog_names_array).then(posts => this.posts = posts);
  }
  
  gotoNewPostForm() {
    this._router.navigate(['NewPost']);
  }
  
  gotoInternational() {
    this._router.navigate(['GroupOfGroupsPostList', {gog: ['india', 'bangalore']}]);
  }
  
  gotoNational() {
    this._router.navigate(['GroupOfGroupsPostList', {gog: ['india']}]);
  }
  
  gotoState() {
    this._router.navigate(['GroupOfGroupsPostList', {gog: ['bangalore']}]);
  }
  
  gotoCity() {
    this._router.navigate(['GroupOfGroupsPostList', {gog: ['india', 'bangalore']}]);
  }
  
  gotoSubCity() {
    this._router.navigate(['GroupOfGroupsPostList', {gog: ['india', 'bangalore']}]);
  }
}