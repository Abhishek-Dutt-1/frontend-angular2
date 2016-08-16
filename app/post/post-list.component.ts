import {Component, OnInit, EventEmitter} from '@angular/core';
import {PostComponent} from './post.component';

@Component({
  selector: 'my-post-list',
  template: `
    <div class="my-post-list">
      <div *ngFor="let post of posts">
        <my-post [post]="post" [type]="postTemplateType" [currentUser]="currentUser" [view]="view" [contextGroups]="contextGroups" (updateUserScores)="updateUserScores($event)"></my-post>
      </div>
      <div class="load-more" *ngIf="loadButtonState.show && !loadButtonState.postListHasNoPosts">
        <div class="alert alert-danger" role="alert" *ngIf="loadButtonState.buzyLoadingPosts">
          &nbsp;&nbsp;&nbsp;Loading posts ...
        </div>
        <div  class="alert alert-danger" role="alert" *ngIf="false && !loadButtonState.buzyLoadingPosts && !loadButtonState.reachedLastPost" (click)="loadMore()">
          <button class="btn btn-danger btn-sm">Load more posts</button>
        </div>
        <div  class="alert alert-danger" role="alert" *ngIf="loadButtonState.reachedLastPost">
          &nbsp;&nbsp;&nbsp;Reached the end, no more posts here.
        </div>
      </div>
    </div>
  `,
  styles: [`
    .my-post-list {
    }
    .my-post-list .load-more {
      padding-top: 20px;
    }
  `],
  directives: [PostComponent],
  inputs: ["posts", "postTemplateType", "currentUser", "view", "loadButtonState", "contextGroups"],
  outputs: ['loadMoreClicked']
})
export class PostListComponent implements OnInit {

  private posts = null;
  public loadMoreClicked: EventEmitter<any> = new EventEmitter();
  private loadButtonState = { show: false, buzyLoadingPosts: false, reachedLastPost: false, postListHasNoPosts: false }

  constructor() {}

  ngOnInit() {
    window.addEventListener("scroll", this.checkIfUserScrolledToEnd.bind(this) );
  }

  checkIfUserScrolledToEnd() {
    // ref:: http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    // document.body.scrollTop alone should do the job but that actually works only in case of Chrome.
    // With IE and Firefox it also works sometimes (seemingly with very simple pages where you have
    // only a <pre> or something like that) but I don't know when. This hack seems to work always.
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    // Grodriguez's fix for scrollHeight:
    // accounting for cases where html/body are set to height:100%
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;

    // >= is needed because if the horizontal scrollbar is visible then window.innerHeight includes
    // it and in that case the left side of the equation is somewhat greater.
    var scrolledToBottom = (scrollTop + window.innerHeight) >= scrollHeight - 500;

    if ( scrolledToBottom ) this.loadMore()
    //console.log("scroll left", scrollTop, scrollHeight, scrolledToBottom)

  }

  loadMore() {
    // console.log("Load More")
    this.loadMoreClicked.next( 'noop' );
  }

  /**
   * Event comming from individual post
   * Typically update User's scores
   */
  updateUserScores( userScoreObj ) {
    //console.log( "Post List", userScoreObj, this.posts )
    Object.keys( userScoreObj ).forEach( ( userId ) => {
      this.posts.filter( post => post.postedby.id == userId )
      .forEach( post => {
        post.postedby.score = userScoreObj[ userId ].score
        post.postedby.totalScore = userScoreObj[ userId ].totalScore
      });
    })
  }

  ngOnDestroy() {
    //console.log("REMOVING LIStener")
    window.removeEventListener("scroll", this.checkIfUserScrolledToEnd);
  }
}
