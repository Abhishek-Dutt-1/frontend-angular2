/** 
 * Displays a single comment2
 */
import {Component} from 'angular2/core';
import {Comment2} from './comment2';
//import {Router} from 'angular2/router';
//import {PostService} from './post.service';

@Component({
  selector: 'my-comment2',
  template: `
    <div class="comment">
      <i class="material-icons mdl-list__item-icon">person</i> {{comment2.postedby.username}}
      <div class="">
        {{comment2.text}}
      </div>
    </div>
  `,
  styleUrls: ['app/comment2/comment2.component.css'],
  inputs: ['comment2']
})
export class Comment2Component {
  
  //comment: Comment;
  //type: string;
  
  constructor(
    /*
    private _postService: PostService,
    private _router: Router
    */
  ) { }

}
