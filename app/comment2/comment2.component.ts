/**
 * Displays a single comment2
 */
import {Component} from '@angular/core';
import {Comment2} from './comment2';
import {RouterLink} from '@angular/router-deprecated';
import {DateFormatPipe} from '../misc/date-format.pipe';

@Component({
  selector: 'my-comment2',
  template: `
  <div *ngIf="comment2 && post">
    <div class="my-comment2">
      <div class="row">
        <div class="col-xs-12">

          <div class="row">
            <div *ngIf="comment2.meme_image_url" class="col-xs-4 col-sm-3 col-md-2 meme-image-col">
              <div class="meme-image-container ">
                <img src="{{comment2.meme_image_url}}" class="meme-image img-responsive img-rounded  center-block">
              </div>
            </div>
            <div class="col-xs-6 col-sm-9">
              <div>
                {{comment2.text}}
              </div>
            </div>
          </div>      <!-- ! row -->

          <div class="row">
            <div class="col-xs-12">
              <div>
                <div class="postedby-info">
                  <a class="" [routerLink]="['ViewUser', {id: comment2.postedby.id}]">
                    <div class="profile-image-container pull-left">
                      <img *ngIf="comment2.postedby.profileimage" src="{{comment2.postedby.profileimage}}" class="profileimage img-circle">
                    </div>
                  </a>

                  <div class=" pull-left">
                    <div class="profile-name">
                      <a class="" [routerLink]="['ViewUser', {id: comment2.postedby.id}]">
                        {{comment2.postedby.displayname}}
                      </a>
                    </div>
                    &bull;
                    <a [routerLink] = "['NewComment3', {postid: post.id, comment2id: comment2.id}]">Reply</a>
                    <div class="clearfix"></div>
                    <div class="comment-createdat">
                      {{ comment2.createdAt | timeAgo }}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>    <!-- ! row -->

          <!--
          <div class="">
            {{comment2.text}}
          </div>
          <i class="fa fa-user"></i> {{comment2.postedby.displayname}}
          | <a [routerLink] = "['NewComment3', {postid: post.id, comment2id: comment2.id}]">Reply</a>
          -->

        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .my-comment2 .meme-image-col {
    padding-right: 0;
  }
  .my-comment2 .profile-image-container {
    height: 32px;
    width: 32px;
    margin-top: 3px;
    overflow: hidden;
    margin-right: 10px;
  }
  .my-comment2 .profileimage {
    width: 32px;
    opacity:0.5;
    filter:alpha(opacity=50);
  }
  .my-comment2 .postedby-info {
    margin-top: 10px;
  }
  .my-comment2 .profile-name {
    cursor: pointer;
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
  .my-comment2 .comment-createdat {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    /* padding-left: 10px; */
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
  }
  `],
  inputs: ['comment2', 'post'],
  directives: [RouterLink],
  pipes: [DateFormatPipe]
})
export class Comment2Component {

  constructor() { }

}
