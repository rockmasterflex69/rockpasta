import {Injectable} from "@angular/core";

export interface Ship {
  "name": string;
  "model": string;
  "manufacturer": string;
  "cost_in_credits": string;
  "length": number;
  "max_atmosphering_speed": number;
  "crew": number;
  "passengers": number;
  "cargo_capacity": number;
  "consumables": string;
  "hyperdrive_rating": string;
  "MGLT": number;
  "starship_class": string;
  "pilots": string[];
  "films": string[];
  "created": string;
  "edited": string;
  "url": string;
}
