import {Component, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'my-commentvote',
  template: `
    <div *ngIf="_votee">

      <div class="my-commentvote">
        <div class="1row">
          <div class="1col-xs-6 vote-col-up">
            <div (click)="upVotePost(_votee.id)">
              <div [ngClass]="{userHasVoted: _votee.currentUserHasUpVoted}"  class="vote up-vote">
              <span class="hidden">{{_votee.upvotes}}</span> <i class="fa fa-arrow-up"></i>
              </div>
            </div>
          </div>
          <div class="1col-xs-6 vote-col-down">
            <div (click)="downVotePost(_votee.id)">
              <div [ngClass]="{userHasVoted: _votee.currentUserHasDownVoted}" class="vote down-vote">
                <i class="fa fa-arrow-down"></i> <span class="hidden">{{_votee.downvotes}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .my-commentvote {
      width: 30px;
      font-size: 14px;
      border-radius: 5px;
      background-color: rgba(245, 217, 217, 0.07);
      color: rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
    .my-commentvote .vote-col-up {
      padding-right: 0;
    }
    .my-commentvote .vote-col-down {
      padding-left: 0;
    }
    .my-commentvote .userHasVoted {
      /*
      background-color: ghostwhite;
      */
      background-color: #fff8f8;
      color: rgba(0, 0, 0, 0.8);
    }
    .my-commentvote .vote {
      height: 40px;
      text-align: center;
      padding-top: 9px;
    }
    .my-commentvote .up-vote {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .my-commentvote .down-vote {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  `],
  inputs: ['_votee'],
  outputs: ['upVote', 'downVote']
})
export class CommentvoteComponent implements OnInit{

  private _votee = null;
  public upVote: EventEmitter<any> = new EventEmitter();
  public downVote: EventEmitter<any> = new EventEmitter();

  constructor( ) { }

  ngOnInit() {}

  upVotePost(id) {
    //console.log("Up voting post with ", id);
    this.upVote.next(id);
  }
  downVotePost(id) {
    //console.log("Down voting post with ", id);
    this.downVote.next(id);
  }
}
