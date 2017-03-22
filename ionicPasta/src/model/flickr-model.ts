import {Injectable} from "@angular/core";
import {FlickrPhoto} from "./flickr-photo";

export interface FlickrModel {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: FlickrPhoto[];
}
