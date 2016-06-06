/**
 * Displays a single comment
 */
import {Component} from '@angular/core';
import {Comment1} from './comment1';
import {RouterLink} from '@angular/router-deprecated';
import {DateFormatPipe} from '../misc/date-format.pipe';

@Component({
  selector: 'my-comment1',
  template: `
  <div *ngIf="comment1 && post">
    <div class="my-comment1">
      <div class="row">

        <div class="col-xs-12">
          <div class="row">

            <div *ngIf="comment1.meme_image_url" class="col-xs-4 col-sm-3 col-md-2 meme-image-col">
              <div class="meme-image-container ">
                <img src="{{comment1.meme_image_url}}" class="meme-image img-responsive img-rounded  center-block">
              </div>
            </div>

            <div class="col-xs-6 col-sm-9">
              <div>
                {{comment1.text}}
              </div>
            </div>

          </div>    <!-- ! row -->

          <div class="row">
            <div class="col-xs-12">
              <div>
                <div class="postedby-info">
                  <a class="" [routerLink]="['ViewUser', {id: comment1.postedby.id}]">
                    <div class="profile-image-container pull-left">
                      <img *ngIf="comment1.postedby.profileimage" src="{{comment1.postedby.profileimage}}" class="profileimage img-rounded">
                    </div>
                  </a>

                  <div class=" pull-left">
                    <div class="profile-name">
                      <a class="" [routerLink]="['ViewUser', {id: comment1.postedby.id}]">
                        {{comment1.postedby.displayname}}
                      </a>
                    </div>
                    &bull;
                    <a [routerLink] = "['NewComment2', {postid: post.id, comment1id: comment1.id}]">Reply</a>
                    <div class="clearfix"></div>
                    <div class="comment-createdat">
                      {{ comment1.createdAt | timeAgo }}
                    </div>
                  </div>

                  <!--
                  <div class="profile-name pull-left">
                    <a class="" [routerLink]="['ViewUser', {id: comment1.postedby.id}]">
                      {{comment1.postedby.displayname}}
                    </a>
                  </div>
                  &nbsp;&bull;
                  <a [routerLink] = "['NewComment2', {postid: post.id, comment1id: comment1.id}]">Reply</a>
                  <div class="comment-createdat">
                    {{ comment1.createdAt | timeAgo }}
                  </div>
                </div>
                -->

              </div>
            </div>
          </div>    <!-- ! row -->
        </div>

      </div>    <!-- ! row -->
    </div>  <!-- ! my-comment1 -->
  </div>    <!-- ! ngIf -->
  `,
  styles: [`
  .my-comment1 .meme-image-col {
    padding-right: 0;
  }
  .my-comment1 .profile-image-container {
    height: 32px;
    width: 32px;
    margin-top: 3px;
    overflow: hidden;
    margin-right: 10px;
  }
  .my-comment1 .profileimage {
    width: 32px;
    opacity:0.5;
    filter:alpha(opacity=50);
  }
  .my-comment1 .postedby-info {
    margin-top: 10px;
  }
  .my-comment1 .profile-name {
    cursor: pointer;
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
  .my-comment1 .comment-createdat {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    /* padding-left: 10px; */
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
  }
  `],
  inputs: ['comment1', 'post'],
  directives: [RouterLink],
  pipes: [DateFormatPipe]
})
export class Comment1Component {
  private post;
  constructor() {}
}
