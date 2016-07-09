import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'my-toast-notification',
  template: `
  <div *ngIf="_notificationList.length > 0" class="">
    <div class="my-toast-notification shake animated">
      <div *ngFor="let notification of _notificationList">

      <div class="row1">
        <div class="">
        <div class="notification-container">
          <div ngClass="{{notification.class}}" class="alert notification-container-inner">
            <div>
              <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)="deleteNotificationById(notification.id)"><span aria-hidden="true">&times;</span></button>
              <div><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {{notification.text}}</div>
            </div>
          </div>
        </div>
        </div>
      </div>

      </div>
    </div>
  </div>
  `,
  styles: [`
  .my-toast-notification {
    position: fixed;
    right: 15px;
    top: 65px;
    /*
    bottom: 15px;
    left: 15px;
    */
    animation: fadein 1s;
  }
  .my-toast-notification .notification-container {
    width: 300px;
  }
  .my-toast-notification .notification-container-inner {
    opacity: 0.9;
  }
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /*base code*/
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .animated.infinite {
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .animated.hinge {
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
  }
  /*the animation definition*/
  @-webkit-keyframes shake {
    0%, 100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0)
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0)
    }
  }
  @keyframes shake {
    0%, 100% {
      -webkit-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0)
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(-10px, 0, 0);
      -ms-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0)
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(10px, 0, 0);
      -ms-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0)
    }
  }
  .shake {
    -webkit-animation-name: shake;
    animation-name: shake
  }

  `],
})
export class ToastNotificationComponent implements OnInit {

  //private _errorMsg = null;
  private _showHideSpinner: boolean = false;
  private _notificationSubcription = null;
  private _setTimeout = null;
  private _spinnerHistory: number = 0;
  private _notificationList = [];

  constructor(
    private _appService: AppService
  ) { }

  ngOnInit() {
    this._notificationSubcription = this._appService.notifications$.subscribe(
      msg => {
        this.createNotification(msg);
      },
      error => {
        console.log("Error", error);
      });
  }

  createNotification(msg) {
    msg = ( typeof msg === 'object' ) ? msg : { text : msg };
    let id = Math.floor( Math.random() * 1000 );
    while ( this._notificationList.indexOf(id) > -1 ) {
      id = Math.floor( Math.random() * 1000 );
    }
    msg.id = id;
    msg.class = 'alert-' + ( msg.type || 'info' )
    let timeout = msg.timeout || 5000;
    //this._notificationList.push(msg);
    this._notificationList.unshift( msg );
    setTimeout( () => {
      this.deleteNotificationById(id);
    }, timeout)
  }

  deleteNotificationById(id: any) {
    this._notificationList = this._notificationList.filter( notification => notification.id !== id )
  }

  ngOnDestroy() {
    this._notificationSubcription.unsubscribe();
  }


}
