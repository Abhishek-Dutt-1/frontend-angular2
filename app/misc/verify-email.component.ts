import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {RouteParams} from '@angular/router-deprecated';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-verify-email',
  template: `
    <div class="my-verify-email">
      <div *ngIf="_error.msg">
        <my-error [_error]="_error"></my-error>
      </div>
      <div *ngIf="!_error.msg">
        <div>
          {{_message}}
        </div>
      </div>
    </div>
  `,
  styles: [],
  directives: [ErrorComponent]
})
export class VerifyEmailComponent implements OnInit {

  private _error = { msg : null, type : null };
  private _userid = null;
  private _message = null;

  constructor(
    private _routeParams: RouteParams,
    private _userService: UserService
  ) { }

  ngOnInit() {
    let token = this._routeParams.get('token');
    console.log("TOken", token)
    this._userService.verifyEmailToken(token).subscribe(
      data => {
        //this._userid = data.userid;
        this._message = data.msg;
        this._error.msg = null;
      },
      error => {
        this._error.msg = error;
      }
    )
  }

}
