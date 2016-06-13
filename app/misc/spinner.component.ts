import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'my-spinner',
  template: `
  <div *ngIf="_showHideSpinner">
    <div class="my-spinner">
      <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  `,
  styles: [`
  .my-spinner {
    position: fixed;
    bottom: 0;
    left: 0;
    animation: fadein 2s;
  }
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  `],
  //inputs: ['']
})
export class SpinnerComponent implements OnInit {

  //private _errorMsg = null;
  private _showHideSpinner: boolean = false;
  private _showSpinnerSubcription = null;
  private _setTimeout = null;

  constructor(
    private _appService: AppService
  ) { }

  ngOnInit() {
    this._showSpinnerSubcription = this._appService.showSpinner$.subscribe(
      spinnerState => {
        //this._showHideSpinner = spinnerState;
        if ( spinnerState ) {
          this._setTimeout = setTimeout( () => {
            this._showHideSpinner = spinnerState;
          }, 1000)
        } else {
          clearTimeout(this._setTimeout);
          this._showHideSpinner = spinnerState;
        }
      },
      error => {
        console.log("Error", error);
      });
  }

  ngOnDestroy() {
    this._showSpinnerSubcription.unsubscribe();
  }


}
