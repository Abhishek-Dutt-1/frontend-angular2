import {Component, OnInit} from '@angular/core';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
import {ErrorComponent} from '../misc/error.component';
//import {HyperGroupService} from './hyper_group.service';

@Component({
  selector: 'my-hyper_group-sidebar',
  template: `
  <div *ngIf="hierarchy">
    <div class="my-hyper_group-sidebar">

      <div class="row1">
        <div class="row">
          <div class="col-xs-12">
            <h5>Your International Groups:</h5>
          </div>
        </div>
        <div class="row1">
          <div *ngIf="hierarchy">
            <div *ngFor="let sg of hierarchy.sg">
              <div class="row">
                <div class="col-xs-12">
                  <h4><a [routerLink]="['SuperGroupPostList', {super_group_name: sg.name}]">{{sg.name | uppercase}} /</a></h4>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12">
                  <dl>
                    <div *ngFor="let group of sg.groups">
                      <dt><a [routerLink]="['ViewGroup', {super_group_name: sg.name, group_name: group.name}]">{{group.name}}</a></dt>
                      <dd>{{group.description}}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>    <!-- row -->

    </div>
  </div>    <!-- ngIf -->
  `,
  styles: [`
    .my-hyper_group-sidebar {
      padding-top: 10px;
    }
  `],
  directives: [RouterLink, ErrorComponent],
  inputs: ["hierarchy"]

})
export class HyperGroupSidebarComponent implements OnInit {

  private hierarchy: string = null;

  constructor(
    //private _hyperGroupService: HyperGroupService
  ) { }

  ngOnInit() {
  }


}
