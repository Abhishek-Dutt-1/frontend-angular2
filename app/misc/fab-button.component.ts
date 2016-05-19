import {Component, OnInit, EventEmitter} from 'angular2/core';

@Component({
  selector: 'my-fab-button',
  template: `
    <div class="my-fab-button">
      <div class="buttons" (click)="buttonClicked($event)">
        <div> <i class="fa fa-pencil" aria-hidden="true"></i>
 </div>
      </div>
    </div>
  `,
  styles: [`
    .my-fab-button {
      position: fixed;
      right: 15px;
      bottom: 15px;
    }
    .my-fab-button .buttons {
      font-size: 24px;
      padding: 11px 0 0 16px;
      box-shadow: 0px 5px 11px -2px rgba(0, 0, 0, 0.18), 
                  0px 4px 12px -7px rgba(0, 0, 0, 0.15);
      border-radius: 50%;
      display: block;
      width: 56px;
      height: 56px;
      -webkit-transition: all .1s ease-out;
              transition: all .1s ease-out;  
      background-color: rgba(0, 182, 255, 0.05);
      color: rgba(0, 0, 0, 0.35);
    }
  `],
  //inputs: ['_votee'],
  //outputs: ['upVote', 'downVote']
  outputs: ['clicked']
})
export class FabButtonComponent implements OnInit {
  
  private _votee = null;
  public clicked: EventEmitter<any> = new EventEmitter();
  
  constructor( ) { }
  
  ngOnInit() {}
  
  buttonClicked(event) {
    event.preventDefault();
    console.log("Button clicked ", event);
    this.clicked.next('noop');
  }

}