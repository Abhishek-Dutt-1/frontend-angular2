import {Component, OnInit, EventEmitter} from 'angular2/core';

@Component({
  selector: 'my-vote',
  template: `
    <div *ngIf="_votee">
      <div class="my-vote">
        
        <div class="row">
          <div class="col-xs-6 vote-col-up">
            <div (click)="upVotePost(_votee.id)">
              <div [ngClass]="{userHasVoted: _votee.currentUserHasUpVoted}"  class="vote up-vote">
              {{_votee.upvotes}} <i class="fa fa-arrow-up"></i>
              </div> 
            </div>
          </div>
          <div class="col-xs-6 vote-col-down">
            <div (click)="downVotePost(_votee.id)">
              <div [ngClass]="{userHasVoted: _votee.currentUserHasDownVoted}" class="vote down-vote">
                <i class="fa fa-arrow-down"></i> {{_votee.downvotes}}
              </div> 
            </div>
          </div>
        </div>
              
      </div>
    </div>
  `,
  styles: [`
    .my-vote {
      margin-top: 10px;
      font-size: 14px;
      border-radius: 10px;
      background-color: ghostwhite;
      color: rgba(0, 0, 0, 0.3);
    }
    .my-vote .vote-col-up {
      padding-right: 0;
    }
    .my-vote .vote-col-down {
      padding-left: 0;
    }
    .my-vote .userHasVoted {
      background-color: floralwhite;
      color: rgba(0, 0, 0, 0.8);  
    }
    .my-vote .vote {
      height: 40px;
      text-align: center;
      padding-top: 9px;
    }
    .my-vote .up-vote {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .my-vote .down-vote {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  `],
  inputs: ['_votee'],
  outputs: ['upVote', 'downVote']
})
export class VoteComponent implements OnInit{
  
  private _votee = null;
  public upVote: EventEmitter = new EventEmitter();
  public downVote: EventEmitter = new EventEmitter();
  
  constructor( ) { }
  
  ngOnInit() {}
  
  upVotePost(id) {
    console.log("Up voting post with ", id);
    this.upVote.next(id);
  }
  downVotePost(id) {
    console.log("Down voting post with ", id);
    this.downVote.next(id);
  }
}