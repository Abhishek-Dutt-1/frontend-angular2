import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {RouteParams} from '@angular/router-deprecated';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-verify-extra-email',
  template: `
    <div class="my-verify-extra-email">
      <div *ngIf="_errorMsg">
        <my-error [_errorMsg]="_errorMsg"></my-error>
      </div>
      <div *ngIf="!_errorMsg">
        <div>
          {{_message}}
        </div>
      </div>
    </div>
  `,
  styles: [],
  directives: [ErrorComponent]
})
export class VerifyExtraEmailComponent implements OnInit {

  private _errorMsg = null;
  private _userid = null;
  private _message = null;

  constructor(
    private _routeParams: RouteParams,
    private _userService: UserService
  ) { }

  ngOnInit() {
    let token = this._routeParams.get('token');
    console.log("TOken", token)
    this._userService.verifyExtraEmailToken(token).subscribe(
      data => {
        //this._userid = data.userid;
        this._message = data.msg;
        this._errorMsg = null;
      },
      error => {
        this._errorMsg = error;
      }
    )
  }

}
