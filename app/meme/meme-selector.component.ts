import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
import {AppService} from '../app.service';
import {ErrorComponent} from '../misc/error.component';
import {Meme} from './meme';
import {MemeService} from './meme.service';

@Component({
  selector: 'my-meme-selector',
  template: `
  <div *ngIf="_memeList">

    <div class="my-meme-selector">

      <div class="row">
        <div class="col-xs-2">
          <div *ngFor="let memecat of _memeList.memecategories">
            <div class="btn btn-default btn-xs" (click)="memeCatNameClicked(memecat.id)">{{memecat.name}}</div>
          </div>
        </div> <!-- !col -->
        <div class="col-xs-10">
          <div *ngFor="let meme of _displayedMemeList">
            <div class="meme-image-container">
              <img src="{{meme.imageurl}}" class="meme-image">
            </div>
          </div>
        </div>
      </div> <!-- !row -->

      <my-error [_errorMsg]="_errorMsg"></my-error>

    </div>    <!-- my-meme-selector -->
  </div>  <!-- ! div -->
  `,
  styles: [`
    .my-meme-selector .meme-image {
      width: 100px;
    }
    .my-meme-selector .meme-image-container {
      padding: 3px;
    }
  `],
  directives: [RouterLink, ErrorComponent]
})
export class MemeSelectorComponent implements OnInit {

  private _errorMsg = null;
  private _memeList = { memeList: [], memecategories: [] };
  private _selectedMemeCatId = null;
  private _displayedMemeList = [];

  constructor(
    private _appService: AppService,
    private _memeService: MemeService
  ) {}

  ngOnInit() {
    this._memeService.getMemeList().subscribe(
      memes => {
        // meme = { memeList: Array[4], memecategories: Array[2] }
        this._memeList = memes;
        if(memes && memes.memecategories && memes.memecategories.length > 0) {
          this.memeCatNameClicked(memes.memecategories[0].id);
        }
        console.log(this._memeList)
      },
      error => {
          this._errorMsg = error;
      })
  }   // !ngOnInit

  memeCatNameClicked(memeCatId) {
    this._selectedMemeCatId = memeCatId
    this._displayedMemeList = this._memeList.memeList.filter( meme => meme.categories.some( cat => cat.id === memeCatId ));
  }

}
