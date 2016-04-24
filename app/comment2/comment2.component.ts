/** 
 * Displays a single comment2
 */
import {Component} from 'angular2/core';
import {Comment2} from './comment2';
import {RouterLink} from 'angular2/router';

@Component({
  selector: 'my-comment2',
  template: `
  <div *ngIf="comment2 && post">
    <div class="my-comment2">
      <div class="row">
        <div class="col-xs-12">
          <div class="">
            {{comment2.text}}
          </div>
          <i class="fa fa-user"></i> {{comment2.postedby.displayname}}
          | <a [routerLink] = "['NewComment3', {postid: post.id, comment2id: comment2.id}]">Reply</a>
        </div>
      </div>
    </div>
  </div>
  `,
  inputs: ['comment2', 'post'],
  directives: [RouterLink]
})
export class Comment2Component {
  constructor() { }
}
