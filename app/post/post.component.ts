/** 
 * Displays a single post
 */
import {Component} from 'angular2/core';
import {Post} from './post';
import {Router} from 'angular2/router';
import {PostService} from './post.service';

@Component({
  selector: 'my-post',
  template: `
    <li *ngIf="type === 'list'" class="post mdl-list__item mdl-list__item--three-line">
      <span class="post mdl-list__item-primary-content">
        <!-- <i class="material-icons mdl-list__item-avatar">person</i> -->
        <span (click)="gotoPost(post.id)" class="post-title">{{post.title}}</span>
        <span class="mdl-list__item-text-body">
          {{post.text}}  
        </span>
        <span class="mdl-list__item-text-body">
          <div class="toolbox">
            <div>
              <i class="material-icons mdl-list__item-icon">person</i>
              {{post.postedby.username}} | 12 days ago | <span (click)="gotoGroup(post.group.name)">go/{{post.group.name}}</span>
            </div>
            <div>
              {{post.upvotes}} Upvote | {{post.downvotes}} Downvote | {{post.comments.length}} Comments
            </div>
          </div>
         </span>
      </span>
      <!--
      <span class="mdl-list__item-secondary-content">
        <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
      </span>
      -->
    </li>
    
    
    <li *ngIf="type === 'grouplist'" class="post mdl-list__item mdl-list__item--three-line">
      <span class="post mdl-list__item-primary-content">
        <!-- <i class="material-icons mdl-list__item-avatar">person</i> -->
        <span (click)="gotoPost(post.id)" class="post-title">{{post.title}}</span>
        <span class="mdl-list__item-text-body">
          {{post.text}}  
        </span>
        <span class="mdl-list__item-text-body">
          <div class="toolbox">
            <div>
              <i class="material-icons mdl-list__item-icon">person</i>
              {{post.postedby.username}} | 12 days ago
            </div>
            <div>
              {{post.upvotes}} Upvote | {{post.downvotes}} Downvote | {{post.comments.length}} Comments
            </div>
          </div>
         </span>
      </span>
      <!--
      <span class="mdl-list__item-secondary-content">
        <a class="mdl-list__item-secondary-action" href="#"><i class="material-icons">star</i></a>
      </span>
      -->
    </li>
    
    
    <div *ngIf="type === 'main'">
      <div class="post-main demo-card-wide mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">{{post.title}}</h2>
        </div>
        <div class="mdl-card__supporting-text">
          {{post.text}}
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons mdl-list__item-icon">person</i> {{post.postedby.username}} 
          </a>
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          Edit 
          </a>
          <a (click)="upVotePost(post.id)" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          {{post.upvotes}} Vote up
          </a>
          <a (click)="downVotePost(post.id)" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          {{post.downvotes}} Vote down
          </a>
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          go/{{post.group.name}} 
          </a>
          <a (click)="goBack()" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          back 
          </a>
        </div>
        <div class="mdl-card__menu">
          <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">share</i>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['app/post/post.component.css'],
  inputs: ['post', 'type']
})
export class PostComponent {
  post: Post;
  type: string;
  
  constructor(
    private _postService: PostService,
    private _router: Router) { }
    
  gotoPost(id: number) {
    this._router.navigate(['ViewPost', {id: id}]);
  }
  
  gotoGroup(name) {
    this._router.navigate(['ViewGroup', {groupname: name}]);
  }
  
  goBack() {
    window.history.back();
  }

  upVotePost(id:number) {
    this.post.upvotes++
    this._postService.upVotePost(id)  
  }
  
  downVotePost(id:number) {
    this.post.downvotes++
    this._postService.downVotePost(id)  
  }
}