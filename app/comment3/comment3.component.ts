/**
 * Displays a single comment2
 */
import {Component} from '@angular/core';
import {Comment3} from './comment3';
import {RouterLink} from '@angular/router-deprecated';

@Component({
  selector: 'my-comment3',
  template: `
  <div *ngIf="comment3 && post">
    <div class="my-comment3">
      <div class="row">

        <div class="col-xs-12">
          <div class="row">

            <div *ngIf="comment3.meme_image_url" class="col-xs-6 col-sm-3 meme-image-col">
              <div class="meme-image-container ">
                <img src="{{comment3.meme_image_url}}" class="meme-image img-responsive img-rounded  center-block">
              </div>
            </div>

            <div class="col-xs-6 col-sm-9">
              <div>
                {{comment3.text}}
              </div>
            </div>

          </div>      <!-- ! row -->
          <!--
          <div class="">
            {{comment3.text}}
          </div>
          <i class="fa fa-user"></i> {{comment3.postedby.displayname}}
          | <a [routerLink] = "['NewComment4', {postid: post.id, comment3id: comment3.id}]">Reply</a>
          -->
          <div class="row">
            <div class="col-xs-12">
              <div>
                <div class="postedby-info">
                  <a class="" [routerLink]="['ViewUser', {id: comment3.postedby.id}]">
                    <div class="profile-image-container pull-left">
                      <img *ngIf="comment3.postedby.profileimage" src="{{comment3.postedby.profileimage}}" class="profileimage  img-circle">
                    </div>
                  </a>
                  <div class="profile-name pull-left">
                    <a class="" [routerLink]="['ViewUser', {id: comment3.postedby.id}]">
                      {{comment3.postedby.displayname}}
                    </a>
                  </div>
                  &nbsp;&bull;
                  <a [routerLink] = "['NewComment4', {postid: post.id, comment3id: comment3.id}]">Reply</a>
                </div>

              </div>
            </div>
          </div>    <!-- ! row -->

        </div>

      </div>      <!-- ! row -->
    </div>
  </div>
  `,
  styles: [`
  .my-comment3 .meme-image-col {
    padding-right: 0;
  }
  .my-comment3 .profile-image-container {
    height: 32px;
    width: 32px;
    margin-top: 3px;
    overflow: hidden;
    margin-right: 10px;
  }
  .my-comment3 .profileimage {
    width: 32px;
    opacity:0.5;
    filter:alpha(opacity=50);
  }
  .my-comment3 .postedby-info {
    margin-top: 10px;
  }
  .my-comment3 .profile-name {
    cursor: pointer;
    display: inline;
    font-family: BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
  `],
  inputs: ['comment3', 'post'],
  directives: [RouterLink]
})
export class Comment3Component {

  private comment3
  private post

  constructor(
  ) { }

}
