import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'basic-modal.html'
})

export class BasicModal {
  private cardData;

  constructor(public params: NavParams, public viewCtrl: ViewController) {
    this.cardData = params.get("cardData");
    this.cardData.jpeg = this.cardData.jpeg.replace("_m", "_b");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
