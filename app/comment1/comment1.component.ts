/** 
 * Displays a single comment
 */
import {Component} from 'angular2/core';
import {Comment1} from './comment1';
import {RouterLink} from 'angular2/router';

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
  styles: [` `],
  inputs: ['post', 'comment1'],
  directives: [RouterLink]
})
export class Comment1Component {
  
  constructor() {
    
  }
  
}