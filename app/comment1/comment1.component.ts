/**
 * Displays a single comment
 */
import {Component} from '@angular/core';
import {Comment1} from './comment1';
import {RouterLink} from '@angular/router-deprecated';

@Component({
  selector: 'my-comment1',
  template: `
  <div *ngIf="comment1 && post">
    <div class="my-comment1">
      <div class="row">
        <div class="col-xs-12">
          <div class="">
            {{comment1.text}}
          </div>
          <a [routerLink]="['ViewUser', {id: comment1.postedby.id}]">
            <i class="fa fa-user"></i> {{comment1.postedby.displayname}}
          </a>
          &bull;
          <a [routerLink] = "['NewComment2', {postid: post.id, comment1id: comment1.id}]">Reply</a>
        </div>
      </div>
    </div>
  </div>
  `,
  inputs: ['comment1', 'post'],
  directives: [RouterLink]
})
export class Comment1Component {
  private post;
  constructor() {}
}
