import {Injectable} from 'angular2/core';

@Injectable()
export class AppService {
  
  private _geoSelection: string = null;
  
  constructor() {}
  
  /**
   * Save the geo location page (i.e. int'l, national, city etc)
   */
  setGeoSelection(geoSelection: string) {
    this._geoSelection = geoSelection;
  }
  
  /**
   * Return last saved geo location
   */
  getGeoSelection() {
    return this._geoSelection;
  }
}