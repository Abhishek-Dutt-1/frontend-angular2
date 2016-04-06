/*

//  NOT USED


import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Post} from './post';
//import {PostDetailComponent} from './post-detail.component';
import {PostService} from './post.service';
import {PostListComponent} from './post-list.component';
import {PostTemplateType} from './post-template-types';
import {Group_Of_Groups} from '../group_of_groups/group_of_groups';

@Component({
  selector: 'my-post-list-loader',
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
export class PostListLoaderComponent implements OnInit {

  posts: Post[];
  postTemplateType: PostTemplateType;
  parent_gorup: Group_Of_Groups;

  constructor(
    private _postService: PostService,
    private _router: Router,
    private _routeParams: RouteParams
  ) { }
  
  ngOnInit() {
    this.getPosts();
    this.postTemplateType = PostTemplateType.List;
    
    //let id = this._routeParams.get('group_of_groups_name');
    //console.log(id)
    //this._postService.getPost(id).then(post => this.post = post);
    //this.postTemplateType = PostTemplateType.Main;
  }
  
  getPosts() {
    this._postService.getPosts().then(posts => this.posts = posts);
  }
  
  gotoNewPostForm() {
    this._router.navigate(['NewPost']);
  }

}

*/