import {Component, OnInit} from '@angular/core';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
import {SuperGroup} from './super_group';
import {SuperGroupService} from './super_group.service';
import {GroupService} from '../group/group.service';
import {Post} from '../post/post';
import {Group} from '../group/group';
import {PostListComponent} from '../post/post-list.component';
import {PostTemplateType} from '../post/post-template-types';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-super-group-post-list-loader',
  template: `
  <div *ngIf="_super_group && _groups">

    <my-error [_errorMsg]="_errorMsg"></my-error>

    <div class="my-super-group-post-list-loader">

      <div class="row">
        <div class="col-xs-12">

          <div class="group-details">

            <div class="group-details-panel">

              <div class="row border-row">
                <div class="col-xs-12">
                  <div class="supergroup-name">
                    <div class="">{{_super_group.name | uppercase}} /</div>
                  </div>
                </div>
              </div>

              <div class="row border-row">
                <div class="col-xs-12">
                  <div class="group-list">
                    <div *ngFor="let group of _groups">
                      <a [routerLink]="['ViewGroup', {super_group_name: _super_group.name, group_name: group.name}]">&bull; {{group.name}}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row border-row">
                <div class="col-xs-12">
                  <div class="supergroup-ops">
                    <a [routerLink]="['NewGroup', {super_group_name: _super_group.name}]">
                      Create a new group within {{_super_group.name | uppercase}}
                    </a>
                    <a (click)="gotoNewPostForm()" class="hidden">
                       &bull; Create New Post
                    </a>
                  </div>
                </div>
              </div>

            <div>

          </div>

        </div> <!-- !col -->
      </div> <!-- !row -->

      <my-post-list [posts]="groupPosts" [postTemplateType]="postTemplateType"></my-post-list>

    </div>
  </div>  <!-- end top div -->
  `,
  styles: [`
  .my-super-group-post-list-loader .supergroup-name {
    padding-top: 15px;
    padding-bottom: 15px;
    transition: 0.05s ease-in-out;
    display: block;
    vertical-align: baseline;
    letter-spacing: 1px;
    font-size: 18px;
    font-family: WorkSans,sans-serif;
    overflow-wrap: break-word;
    word-wrap: break-word;
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }
  .my-super-group-post-list-loader .border-row {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .my-super-group-post-list-loader .group-list {
    padding-top: 15px;
    padding-bottom: 15px;
    transition: 0.05s ease-in-out;
    display: block;
    vertical-align: baseline;
    letter-spacing: 1px;
    font-size: 16px;
    font-family: WorkSans,sans-serif;
    overflow-wrap: break-word;
    word-wrap: break-word;
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }
  .my-super-group-post-list-loader .group-list a {
    color: rgba(0, 0, 0, 0.6);
  }
  .my-super-group-post-list-loader .supergroup-ops {
    padding: 15px 0;
  }
  .my-super-group-post-list-loader .supergroup-ops a {
    color: rgba(0, 0, 0, 0.6);
  }
  `],
  directives: [PostListComponent, RouterLink, ErrorComponent]
})
/**
 * This compnenet was supposed to show a list of posts (hence the name)
 * But that idea was abandaoned later as it would make it similar to hyper groups
 */
export class SuperGroupPostListLoaderComponent {

  private _groups: Group[];
  private _super_group_name: string;
  private _super_group: SuperGroup;
  private _errorMsg: String = null;

  constructor(
    private _groupService: GroupService,
    private _superGroupService: SuperGroupService,
    private _router: Router,
    private _routeParams: RouteParams) {}

  ngOnInit() {

    this._super_group_name = this._routeParams.get('super_group_name');

    this._superGroupService.getSuperGroupByName(this._super_group_name)
      .subscribe(
        superGroup => {
          this._super_group = superGroup;
          this._groups = superGroup.groups;
        },
        error => {
          console.log(error);
          this._errorMsg = error;
        });
  }

  goBack() {
    window.history.back();
  }

  gotoNewPostForm() {
    //this._router.navigate(['NewPost', {gog_name: this.group.parent_group.name, group_name: this.group.name}]);
  }

}
