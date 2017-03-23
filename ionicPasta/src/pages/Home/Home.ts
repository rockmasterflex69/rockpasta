import {Component, HostListener, ChangeDetectorRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomeCards} from '../../providers/home-cards';
import {ShipList} from '../../model/ship-list';
import {FlickrPhoto} from "../../model/flickr-photo";

@Component({
  selector: 'page-home',
  templateUrl: 'Home.html',
  providers: [HomeCards]
})
export class Home {

  private numCols: number = 3;
  private nav;
  private ref;
  private homeCards;
  private cards = [];
  private rawReturn: ShipList;
  //private cards1 = [];
  //private cards2 = [];
  //private cards3 = [];
  private cardsArray = [];
  private innerWidth: number;

  constructor(public navCtrl: NavController, homeCards: HomeCards, public cdRef: ChangeDetectorRef) {
    this.nav = navCtrl;
    this.ref = cdRef;
    this.homeCards = homeCards;
    console.log("in home constructor");
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
  }

  ngOnInit() {
    this.homeCards.getAll().subscribe(
      data => this.rawReturn = data,
      (err) => console.error(err),
      () => {
        this.cards = this.rawReturn.results;
        //this.getMoreCards();
        this.splitCards();
      }
    );

    //start with 2 pages of cards
    //split the cards into columns 3 for brick layout
  }

  splitCards() {
    //start with a temp var for cards
    //console.log("Total Cards: " + this.cards.length);
    var tempCards = [];
    //determine how many columns we should show
    if (this.innerWidth > 1200) {
      this.numCols = 4;
    } else if (this.innerWidth > 992) {
      this.numCols = 3
    } else if (this.innerWidth > 768) {
      this.numCols = 2;
    } else {
      this.numCols = 1;
    }

    //Initialize the card sub-arrays for the correct num cols
    for (var i = 0; i < this.numCols; i++) {
      tempCards[i] = [];
    }

    //stick the card in the right column subarray
    for (var i = 0; i < this.cards.length; i++) {
      //this is where we will grab the photos!
      //https://stackoverflow.com/questions/12710905/how-do-i-dynamically-assign-properties-to-an-object-in-typescript
      this.importImage(i, this.cards[i].name);
      var mod_cols: number = i % this.numCols;
      tempCards[mod_cols].push(this.cards[i]);
    }

    //mow that tempCards is filled, set it to cardsArray
    this.cardsArray = tempCards;
  }

  importImage(index: number, searchText: string) {
    var rawResults;
    var singleImage: FlickrPhoto;
    var photoUrl: string;
    this.homeCards.getImage(searchText).subscribe(
      data => rawResults = data,
      (err) => console.error(err),
      () => {
        singleImage = rawResults.photos.photo[0];
        if (singleImage == null) {
          photoUrl = "https://www.placecage.com/c/200/100";
        } else {
          photoUrl = "https://farm" + singleImage.farm + ".staticflickr.com/" + singleImage.server + "/" + singleImage.id + "_" + singleImage.secret + "_m.jpg";
        }
        console.log("Image for: " + index + ", " + searchText + ", " + photoUrl);
        this.cards[index].jpeg = photoUrl;
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {

    this.innerWidth = event.target.innerWidth;
    this.splitCards();
    //force changes to rerender
    this.ref.markForCheck();
    //console.log("window resized: " + this.innerWidth);
    //console.log("numcols" + this.numCols);
  }

  doInfinite(infiniteScroll) {
    var tempCards = [];
    //console.log('Begin async operation');
    this.homeCards.getNext(this.rawReturn.next).subscribe(
      data => this.rawReturn = data,
      (err) => console.error(err),
      () => {
        tempCards = this.rawReturn.results;
        //console.log("Pushing # of cards: " + tempCards.length);
        //console.log("Cards before: " + this.cards.length);
        this.cards = this.cards.concat(tempCards);
        //console.log("Cards after: " + this.cards.length);
        //somehow the instant push takes.. time? idk, but splut only sees one new card each time and this sees more
        this.splitCards();
        this.ref.markForCheck();
        infiniteScroll.complete();
      }
    );
  }

  getMoreCards() {
    var tempCards = [];
    //console.log('Begin async operation');
    this.homeCards.getNext(this.rawReturn.next).subscribe(
      data => this.rawReturn = data,
      (err) => console.error(err),
      () => {
        tempCards = this.rawReturn.results;
        //console.log("Pushing # of cards: " + tempCards.length);
        //console.log("Cards before: " + this.cards.length);
        this.cards = this.cards.concat(tempCards);
        //console.log("Cards after: " + this.cards.length);
        //somehow the instant push takes.. time? idk, but splut only sees one new card each time and this sees more
        this.splitCards();
        this.ref.markForCheck();
      }
    );
  }

}
