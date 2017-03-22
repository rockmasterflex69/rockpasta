import {Injectable} from "@angular/core";

export interface FlickrPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: string;
  title: string;
  ispublic: string;
  isfriend: string;
  isfamily: string;
}
