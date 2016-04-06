import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Post} from './post';
//import {PostDetailComponent} from './post-detail.component';
import {AppService} from '../app.service';
import {PostService} from './post.service';
import {PostListComponent} from './post-list.component';
import {PostTemplateType} from './post-template-types';
import {SuperGroup} from '../super_group/super_group';
import {GeoFilterComponent} from '../post/geo-filter.component';

@Component({
  selector: 'my-super_group-post-list-loader',
  //template: `<my-post-list [posts]="posts" type="postTemplateType"></my-post-list>`,
  //template: "<div>{{posts}} hello</div>",
  template: `
    <div class="my-super_group-post-list-loader">
        <my-geo-filter [geoSelection]="_geoSelection" [superGroupList]="_superGroupList"></my-geo-filter>
        <my-post-list [posts]="posts" [postTemplateType]="postTemplateType"></my-post-list>
      <!-- Colored FAB button with ripple -->
      <button (click)="gotoNewPostForm()"
        class="fab-button mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
        <i class="material-icons">add</i>
      </button>
    </div>
  `,
  styles: [`
    .my-super_group-post-list-loader .fab-button {
      position: fixed;
      right: 20px;
      bottom: 20px;
    }
    .pre-post-list-outer-div {
      clear: both;
    }
  `],
  //template: `<my-post-list>{{postTemplateType}}{{posts}} hello</my-post-list>`,
  //templateUrl: 'app/post/post-list.component.html',
  //styleUrls: ['app/post/post-list.component.css'],
  //directives: [PostDetailComponent],
  directives: [PostListComponent, GeoFilterComponent]
  //providers: []
})
export class SuperGroupPostListLoaderComponent implements OnInit {

  private posts: Post[];
  private postTemplateType: PostTemplateType;
  //private parent_gorup: Group_Of_Groups;
  private _geoSelection: string = 'national';
  private _superGroupList: SuperGroup[];
  
  constructor(
    private _appService: AppService,
    private _postService: PostService,
    private _router: Router,
    private _routeParams: RouteParams
  ) { }
  
  ngOnInit() {
    this.postTemplateType = PostTemplateType.List;
    
    this._geoSelection = this._routeParams.get('geo') || this._appService.getGeoSelection() || this._geoSelection;
    this._appService.setGeoSelection(this._geoSelection);
     
    this._postService.getPostsByGeoSelection(this._geoSelection).then(resp => {
      this.posts = resp.posts;
      this._superGroupList = resp.superGroupList;
    });
    
  }
  
  gotoNewPostForm() {
    this._router.navigate(['NewPost']);
  }
}