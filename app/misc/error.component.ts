import {Component, OnInit} from 'angular2/core';

@Component({
  selector: 'my-error',
  template: `
    <div *ngIf="_errorMsg">
      <div class="my-error">
        <div class="alert alert-danger" role="alert" [hidden]="!_errorMsg">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span class="sr-only">Error:</span>
          {{_errorMsg}}
        </div>      
      </div>
    </div>
  `,
  styles: [`
    .my-error {
      margin-top: 20px;
    }
  `],
  inputs: ['_errorMsg']
})
export class ErrorComponent {
  
  private _errorMsg = null;
  
  constructor( ) { }

}