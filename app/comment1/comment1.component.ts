/** 
 * Displays a single comment
 */
import {Component} from 'angular2/core';
import {Comment1} from './comment1';
//import {Router} from 'angular2/router';
//import {PostService} from './post.service';

@Component({
  selector: 'my-comment1',
  template: `
    <div class="comment">
      <i class="material-icons mdl-list__item-icon">person</i> {{comment1.postedby.username}}
      <div class="">
        {{comment1.text}}
      </div>
    </div>
  `,
  styleUrls: ['app/comment1/comment1.component.css'],
  inputs: ['comment1', 'type']
})
export class Comment1Component {
  
  //comment: Comment;
  //type: string;
  
  constructor(
    /*
    private _postService: PostService,
    private _router: Router
    */
  ) { }

}
