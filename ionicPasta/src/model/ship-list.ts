import {Injectable} from "@angular/core";
import {Ship} from "./ship";


export interface ShipList {
  count: number;
  next: string;
  previous: string;
  results: Ship[];

}
