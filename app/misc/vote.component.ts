import {Component, OnInit, EventEmitter} from 'angular2/core';

@Component({
  selector: 'my-vote',
  template: `
    <div *ngIf="_votee">
      <div class="my-vote">
        
        <div class="row">
          <div class="col-xs-6 vote-col-up">
            <div (click)="upVotePost(_votee.id)">
              <div [ngClass]="{userHasVoted: _votee.currentUserHasUpVoted}">
              {{_votee.upvotes}} <i class="fa fa-arrow-up"></i>
              </div> 
            </div>
          </div>
          <div class="col-xs-6 vote-col-down">
            <div (click)="downVotePost(_votee.id)">
              <div [ngClass]="{userHasVoted: _votee.currentUserHasDownVoted}">
                <i class="fa fa-arrow-down"></i> {{_votee.downvotes}}
              </div> 
            </div>
          </div>
        </div>
              
      </div>
    </div>
  `,
  styles: [`
    .my-vote .vote-col-up {
      padding-right: 0;
    }
    .my-vote .vote-col-down {
      padding-left: 0;
    }
    .my-vote {
      font-size: 12px;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
    .my-vote .userHasVoted {
      background-color: aqua;    
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