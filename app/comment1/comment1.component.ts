/** 
 * Displays a single comment
 */
import {Component} from 'angular2/core';
import {Comment1} from './comment1';

@Component({
  selector: 'my-comment1',
  template: `
    <div class="my-comment1">
      <div class="row">
        <div class="col-xs-12">
          <div class="">
            {{comment1.text}}
          </div>
          <i class="fa fa-user"></i> {{comment1.postedby.displayname}}
          | <span>Reply</span>
        </div>
      </div>
    </div>
  `,
  styles: [` `],
  inputs: ['comment1']
})
export class Comment1Component {
  
  constructor() {}
  
}