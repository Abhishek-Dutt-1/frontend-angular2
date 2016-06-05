/**
 * Displays a single comment3
 */
import {Component} from '@angular/core';
import {Comment4} from './comment4';
import {RouterLink} from '@angular/router-deprecated';
//import {Router} from '@angular/router';
//import {PostService} from './post.service';
import {DateFormatPipe} from '../misc/date-format.pipe';

@Component({
  selector: 'my-comment4',
  template: `
  <div *ngIf="comment4 && post">
    <div class="my-comment4">
      <div class="row">

        <div class="col-xs-12">
          <div class="row">

            <div *ngIf="comment4.meme_image_url" class="col-xs-6 col-sm-3 meme-image-col">
              <div class="meme-image-container ">
                <img src="{{comment4.meme_image_url}}" class="meme-image img-responsive img-rounded  center-block">
              </div>
            </div>

            <div class="col-xs-6 col-sm-9">
              <div>
                {{comment4.text}}
              </div>
            </div>

          </div>    <!-- ! row -->

          <div class="row">
            <div class="col-xs-12">
              <div>
                <div class="postedby-info">
                  <a class="" [routerLink]="['ViewUser', {id: comment4.postedby.id}]">
                    <div class="profile-image-container pull-left">
                      <img *ngIf="comment4.postedby.profileimage" src="{{comment4.postedby.profileimage}}" class="profileimage img-circle">
                    </div>
                  </a>
                  <div class=" pull-left">
                    <div class="profile-name">
                      <a class="" [routerLink]="['ViewUser', {id: comment4.postedby.id}]">
                        {{comment4.postedby.displayname}}
                      </a>
                    </div>
                    <div class="clearfix"></div>
                    <div class="comment-createdat">
                      {{ comment4.createdAt | timeAgo }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>    <!-- ! row -->

          <!--
          <div class="">
            {{comment4.text}}
          </div>
          <i class="fa fa-user"></i> {{comment4.postedby.displayname}}
          <span class="hidden">| Reply</span>
          -->
        </div>

      </div>
    </div>
  </div>
  `,
  styles: [`
  .my-comment4 .meme-image-col {
    padding-right: 0;
  }
  .my-comment4 .profile-image-container {
    height: 32px;
    width: 32px;
    margin-top: 3px;
    overflow: hidden;
    margin-right: 10px;
  }
  .my-comment4 .profileimage {
    width: 32px;
    opacity:0.5;
    filter:alpha(opacity=50);
  }
  .my-comment4 .postedby-info {
    margin-top: 10px;
  }
  .my-comment4 .profile-name {
    cursor: pointer;
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
  .my-comment4 .comment-createdat {
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    /* padding-left: 10px; */
    line-height: 14.4px;
    color: rgba(0, 0, 0, 0.439216);
  }
  `],
  inputs: ['comment4', 'post'],
  directives: [RouterLink],
  pipes: [DateFormatPipe]
})
export class Comment4Component {
  constructor() { }
}
