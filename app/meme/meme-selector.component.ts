import {Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
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

      <div class="row visible-xs-block meme-names-horiz">
        <div class="col-xs-12">
          <div *ngFor="let memecat of _memeList.memecategories">
            <div class="btn btn-default btn-xs pull-left" (click)="memeCatNameClicked(memecat.id)">{{memecat.name}}</div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-2 hidden-xs">
          <div *ngFor="let memecat of _memeList.memecategories">
            <div class="btn btn-default btn-xs btn-block" (click)="memeCatNameClicked(memecat.id)">{{memecat.name}}</div>
          </div>
        </div> <!-- !col -->
        <div class="col-xs-12 col-sm-10 meme-pane">
          <div *ngFor="let meme of _displayedMemeList">
            <div class="meme-image-container pull-left" (click)="selectMeme(meme)">
              <img src="{{meme.imageurl}}" class="meme-image img-rounded">
            </div>
          </div>
        </div>
      </div> <!-- !row -->

      <div class="row">
        <div class="col-xs-12">
          <small><i>Images courtesy Memeful (<a href="http://memeful.com/" target="_blank">memeful.com</a>)</i></small>
        </div>
      </div>

      <my-error [_error]="_error"></my-error>

    </div>    <!-- my-meme-selector -->
  </div>  <!-- ! div -->
  `,
  styles: [`
    .my-meme-selector .meme-names-horiz {
      padding: 10px 0 15px 0;
      /* padding-left: 0px; */
    }
    .my-meme-selector .meme-image {
      width: 100px;
    }
    .my-meme-selector .meme-image-container {
      padding: 3px;
    }
  `],
  directives: [RouterLink, ErrorComponent],
  outputs: ['memeSelected']

})
export class MemeSelectorComponent implements OnInit {

  private _error = { msg: null, type: null };
  private _memeList = { memeList: [], memecategories: [] };
  private _selectedMemeCatId = null;
  private _displayedMemeList = [];
  public memeSelected: EventEmitter<any> = new EventEmitter();

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
        //console.log(this._memeList)
      },
      error => {
          this._error.msg = error;
      })
  }   // !ngOnInit

  // User clicked on a meme category name
  memeCatNameClicked(memeCatId) {
    this._selectedMemeCatId = memeCatId
    this._displayedMemeList = this._memeList.memeList.filter( meme => meme.categories.some( cat => cat.id === memeCatId ));
  }

  // User clicked on a meme
  selectMeme(selectedMeme) {
    this.memeSelected.next(selectedMeme.imageurl);
  }

}
