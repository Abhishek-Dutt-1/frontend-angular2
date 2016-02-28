/** 
 * Displays a single comment
 */
import {Component} from 'angular2/core';
import {Comment} from './comment';
//import {Router} from 'angular2/router';
//import {PostService} from './post.service';

@Component({
  selector: 'my-comment',
  template: `
    <div class="comment">
      <i class="material-icons mdl-list__item-icon">person</i> {{comment.postedby.username}}
      <div class="">
        {{comment.text}}
      </div>
    </div>
  `,
  styleUrls: ['app/comment/comment.component.css'],
  inputs: ['comment', 'type']
})
export class CommentComponent {
  
  comment: Comment;
  type: string;
  
  constructor(
    /*
    private _postService: PostService,
    private _router: Router
    */
  ) { }

}
