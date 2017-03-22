import {Injectable} from "@angular/core";
import {FlickrModel} from "./flickr-model";
export interface FlickrReturn {
  photos: FlickrModel;
  stat: string;
}
