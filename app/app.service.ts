import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AppService {
  
  private _geoSelection: string = null;
  private _jwt: string = null;
  
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
  
  /**
   * services = 'local' || 'server'
   * 'local' will user mock arrays, 'server' will conncect to backend
   */
  getSiteParams() {
    return {
      servicesMode: 'server',
      backendUrl: 'http://localhost:1337',
      headersObj: this.getHttpHeaders()
    }
  }
  
  /**
   * Get HTTP headers (basically auth header if needed)
   */
  getHttpHeaders() {
    let headersObj = {};
    headersObj['Content-Type'] = 'application/json';  
    if(this._jwt) {
      headersObj['Authorization'] = 'bearer ' + this._jwt;
    }
    return headersObj;
  }
  /**
   * A user just logged in, we store its jwt to be sent with every request in the header
   */
  setAuthorizationHeader(jwt: string) {
    this._jwt = jwt;
  }
  /**
   * User logged out, forget his jwt
   */
  unsetAuthorizationHeader() {
    this._jwt = null;
  }
  
  handleServerErrors(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = "";
    try {
      console.log(error);
      if(error.status === 404 ) {
        errMsg = error._body || "Page Not Found!";
      } else if(error.status === 403) {
        errMsg = error._body || "Not Authorized!";
      } else if (error.json().type === "error") { 
        // Handle XMLHttpRequestProgressEvent::ERR_CONNECTION_REFUSED i.e. Server not up
        errMsg = "Server not responding, Please try again later.";
      } else if(error.json()) {
        errMsg = error.json();
      }
    } catch(err) {
      errMsg = 'Server error';
    }
    return Observable.throw(errMsg);
  }
}