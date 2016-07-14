import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'my-error',
  template: `
    <div *ngIf="_errorMsg">
      <div class="my-error">
        <div class="alert" [ngClass]="{ 'alert-danger' : !_errorType || _errorType == 'danger', 'alert-success' : _errorType == 'success', 'alert-info' : _errorType == 'info', 'alert-warning' : _errorType == 'warning' }" role="alert" [hidden]="!_errorMsg">
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
  inputs: ['_errorMsg', '_errorType']
})
export class ErrorComponent {

  private _errorMsg = null;

  constructor( ) { }

}
