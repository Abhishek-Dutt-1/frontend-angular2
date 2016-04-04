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
    <div class="my-comment2">
      <div class="row">
        <div class="col-xs-12">
          <div class="">
            {{comment2.text}}
          </div>
          <i class="fa fa-user"></i> {{comment2.postedby.displayname}}
          | <span>Reply</span>
        </div>
      </div>
    </div>
  `,
  //styleUrls: ['app/comment2/comment2.component.css'],
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
