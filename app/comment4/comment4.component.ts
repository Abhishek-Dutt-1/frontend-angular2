/** 
 * Displays a single comment3
 */
import {Component} from 'angular2/core';
import {Comment4} from './comment4';
import {RouterLink} from 'angular2/router';
//import {Router} from 'angular2/router';
//import {PostService} from './post.service';

@Component({
  selector: 'my-comment4',
  template: `
  <div *ngIf="comment4 && post">
    <div class="my-comment4">
      <div class="row">
        <div class="col-xs-12">
          <div class="">
            {{comment4.text}}
          </div>
          <i class="fa fa-user"></i> {{comment4.postedby.displayname}}
          | <span>Reply</span>
        </div>
      </div>
    </div>
  </div>
  `,
  inputs: ['comment4', 'post'],
  directives: [RouterLink]
})
export class Comment4Component {
  constructor() { }
}
