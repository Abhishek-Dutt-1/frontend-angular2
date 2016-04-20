import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Post} from '../post/post';
import {AppService} from '../app.service';
import {PostService} from '../post/post.service';
import {PostListComponent} from '../post/post-list.component';
import {PostTemplateType} from '../post/post-template-types';
import {SuperGroup} from '../super_group/super_group';
import {GeoFilterComponent} from '../post/geo-filter.component';

@Component({
  selector: 'my-hyper_group-post-list-loader',
  template: `
    <div class="my-hyper_group-post-list-loader">
        <my-geo-filter [geoSelection]="_geoSelection" [superGroupList]="_superGroupList"></my-geo-filter>
        <div class="alert alert-danger" role="alert" [hidden]="!_errorMsg">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span class="sr-only">Error:</span>
          {{_errorMsg}}
        </div>
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
  directives: [PostListComponent, GeoFilterComponent]
})
export class HyperGroupPostListLoaderComponent implements OnInit {

  private posts: Post[];
  private postTemplateType: PostTemplateType;
  //private parent_gorup: Group_Of_Groups;
  private _geoSelection: string = 'national';
  private _superGroupList: SuperGroup[];
  private _errorMsg = null;
  
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
    
    if(this._appService.getSiteParams().servicesMode === 'local') {
      this._postService.getPostsByGeoSelection(this._geoSelection).then(resp => {
        this.posts = resp.posts;
        this._superGroupList = resp.superGroupList;
      })
      .catch(error => console.log(error));
    }
    if(this._appService.getSiteParams().servicesMode === 'server') {
      this._postService.getPostsByGeoSelection(this._geoSelection).subscribe(
        resp => {
          this.posts = resp.posts;
          this._superGroupList = resp.superGroupList;
        },
        error => {
          console.log(error);
          this._errorMsg = error;
        }
      );
    }
  }
  
  gotoNewPostForm() {
    this._router.navigate(['NewPost']);
  }
}