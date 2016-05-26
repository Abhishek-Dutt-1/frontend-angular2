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
          <div class="">
            {{comment3.text}}
          </div>
          <i class="fa fa-user"></i> {{comment3.postedby.displayname}}
          | <a [routerLink] = "['NewComment4', {postid: post.id, comment3id: comment3.id}]">Reply</a>
        </div>
      </div>
    </div>
  </div>
  `,
  inputs: ['comment3', 'post'],
  directives: [RouterLink]
})
export class Comment3Component {

  private comment3
  private post

  constructor(
  ) { }

}
