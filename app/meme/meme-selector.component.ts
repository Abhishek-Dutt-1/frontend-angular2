import {Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
import {AppService} from '../app.service';
import {ErrorComponent} from '../misc/error.component';
import {Meme} from './meme';
import {MemeService} from './meme.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'my-meme-selector',
  template: `
  <div *ngIf="_memeList">

    <div class="my-meme-selector">

      <div class="row visible-xs-block meme-names-horiz">

        <div class="col-xs-12">
          <div *ngFor="let memecat of _memeList.memecategories">
            <div class="btn btn-xs pull-left" [ngClass]="{'btn-danger': _selectedMemeCatId == memecat.id }" (click)="memeCatNameClicked(memecat.id)">{{memecat.name}}</div>
          </div>
        </div>

        <div class="col-xs-12">
          <div class="text-center text-muted"><b><i>- OR -</i></b></div>
          <input id="meme-search" type="text" class="form-control" placeholder="Search meme by tag"
            [(ngModel)]="_memeSearchStringTmp" (click)="_memesBySearch = true; _selectedMemeCatId = null;" (keyup)="searchMemesByTags( _memeSearchStringTmp )">
        </div>

      </div>

      <div class="row">
        <div class="col-xs-2 hidden-xs">

          <div *ngFor="let memecat of _memeList.memecategories">
            <div class="btn btn-xs btn-block" [ngClass]="{'btn-danger': _selectedMemeCatId == memecat.id }" (click)="memeCatNameClicked(memecat.id)">{{memecat.name}}</div>
          </div>
          <div class="text-center text-muted"><b><i>- OR -</i></b></div>
          <input id="meme-search" type="text" class="form-control" placeholder="Search meme by tag"
            [(ngModel)]="_memeSearchStringTmp" (click)="_memesBySearch = true; _selectedMemeCatId = null;" (keyup)="searchMemesByTags( _memeSearchStringTmp )">

        </div> <!-- !col -->

        <div class="col-xs-12 col-sm-10 meme-pane">
          <div class="row">

            <div class="col-sm-12" [ngClass]="{ 'hidden' : _memesBySearch  == false }">

              <div *ngIf=" _memeSearchStringTmp == '' " class="text-muted"><i>Go ahead. Type Something.</i></div>
              <div *ngIf=" _searchTermLoading == true">Loading...</div>
              <!--
              <div *ngIf=" _searchTermLoading == false && _memeSearchStringTmp != '' "> Done loading '{{_memeSearchStringTmp}}' </div>
              -->
              <div *ngFor="let item of items | async" [ngClass]="{'hidden': _memeSearchStringTmp == '' }">
                <div class="meme-image-container pull-left" (click)="selectMeme(item)">
                  <img src="{{item.imageurl}}" class="meme-image img-rounded">
                </div>
              </div>

            </div>

            <div class="col-xs-12" [ngClass]="{ 'hidden' : _memesBySearch  == true }">
              <div *ngFor="let meme of _displayedMemeList">
                <div class="meme-image-container pull-left" (click)="selectMeme(meme)">
                  <img src="{{meme.imageurl}}" class="meme-image img-rounded">
                </div>
              </div>
            </div>

          </div>  <!-- !row -->
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
  private _memeSearchStringTmp = '';
  private _memesBySearch = false;   // weather meme search by tag is in progress or not
  private _searchTermLoading = false;
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
    this._memesBySearch = false;
    this._displayedMemeList = this._memeList.memeList.filter( meme => meme.categories.some( cat => cat.id === memeCatId ));
  }

  // User clicked on a meme
  selectMeme(selectedMeme) {
    this.memeSelected.next(selectedMeme.imageurl);
  }

  /**
   * Search memes by thier tags
   * input could be csv and/or space sperated list of tags
   */
  private _searchTermStream = new Subject<string>();
  items:Observable<any[]> = this._searchTermStream
    .debounceTime( 500 )
    .distinctUntilChanged( )
    .do( obs => {
      this._searchTermLoading = true;
      return obs;
    })
    .switchMap( ( term:string ) => this._memeService.searchMemesByTags( term ) )
    .do( obs => {
      this._searchTermLoading = false;
      return obs;
    })
    .catch( (error) => Observable.from( [] ) );

  searchMemesByTags( term: string ) {
    if ( ! term ) {
      this._memeSearchStringTmp = ''    // a hack for a wierd bug
      console.log("returning", this._memeSearchStringTmp)
      return
    }
    this._searchTermStream.next( term.trim() );
  }


}
