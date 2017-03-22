import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

import {ShipList} from "../model/ship-list";
import {FlickrReturn} from "../model/flickr-return";
import {FlickrPhoto} from "../model/flickr-photo";

import {AppSettings} from "../settings/app-settings";

/*
 Generated class for the HomeCards provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class HomeCards {
  //private cardsUrl = 'https://jsonplaceholder.typicode.com/posts';
  //private cardsUrl = 'https://itunes.apple.com/search?term=linkin';
  private cardsUrl = AppSettings.star_wars_api;

  private apiKey = AppSettings.FLICKR_KEY;
  private imageSearchUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + FLICKR_KEY + "&text=sentinel-class+landing+craft&media=photos&per_page=1&format=json&nojsoncallback=1&api_sig=474c163c5f864b98cf668aa5294762a8";
  constructor(public http: Http) {
    this.http = http;
    console.log('Hello HomeCards Provider');
  }

  getAll() {
    return this.http.get(this.cardsUrl)
      .map(res => <ShipList>res.json())
      .catch(this.handleError);
  }

  getNext(nextUrl: string) {
    return this.http.get(nextUrl)
      .map(res => <ShipList>res.json())
      .catch(this.handleError);
  }

  getImage(searchText: string) {
    var target: string = searchText.trim().replace(/\s/g, "+");
    //strip the spaces out of target and replace them with +
    var searchUrl: string = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + FLICKR_KEY + "&text=" + target + "&media=photos&per_page=1&format=json&nojsoncallback=1&api_sig=474c163c5f864b98cf668aa5294762a8";
    //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    var flickrObject: FlickrReturn;
    var flickPic: FlickrPhoto;
    var httpObject = this.http.get(searchUrl)
      .map(res => <FlickrReturn>res.json())
      .catch(this.handleError)
      .subscribe(
        data => flickrObject = data,
        (err) => console.error(err),
        () => {
          flickPic = flickrObject.photos.photo[0];
          return "https://" + flickPic.farm + "staticflickr.com/" + flickPic.server + "/" + flickPic.id + "_" + flickPic.secret + ".jpg";
        });
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error || 'API Error');
  }

}
