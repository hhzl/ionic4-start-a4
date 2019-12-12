import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LWdbService } from './lwdb.service';



@Injectable({
  providedIn: 'root'
})


export class WordsDataService {

  lwDB : LWdbService;

  private selectedIndex : number = 0;
  private numberOfWords: number;
  public selectedLanguage : string = 'German';

  words :  Array<any> = [
   {
      "_id":18,
      "word":"fish",
      "translate":"der Fisch",
      "translateFR":"le poisson",
      "tags":"animal",
      "picture":"fish.jpg",
      "audio":"En-uk-fish.ogg.mp3"
   },
   {
      "_id":5,
      "word":"butterfly",
      "translate":"der Schmetterling",
      "translateFR":"le papillon",
      "tags":"animal",
      "picture":"butterfly.jpg",
      "audio":"En-uk-a_butterfly.ogg.mp3"
   },
   {
      "_id":8,
      "word":"cat",
      "translate":"die Katze",
      "translateFR":"le chat",
      "tags":"animal",
      "picture":"cat.jpg",
      "audio":"En-uk-a_cat.ogg.mp3"
   },
   {
      "_id":12,
      "word":"dog",
      "translate":"der Hund",
      "translateFR":"le chien",
      "tags":"animal",
      "picture":"dog.jpg",
      "audio":"En-uk-a_dog.ogg.mp3"
   },
   {
      "_id":20,
      "word":"grasshopper",
      "translate":"die Heuschrecke",
      "translateFR":"la sauterelle",
      "tags":"animal",
      "picture":"grasshopper.jpg",
      "audio":"En-uk-grasshopper.ogg.mp3"
   },
   {
      "_id":35,
      "word":"sheep",
      "translate":"das Schaf",
      "translateFR":"le mouton",
      "tags":"animal",
      "picture":"sheep.jpg",
      "audio":"En-uk-a_sheep.ogg.mp3"
   }
];



 constructor(private http: HttpClient, lwDBservice: LWdbService) { 

     // http is made available in the service. It is not yet used.
     // The words variable is directly initialized.

     console.log('words-data.service.ts -> constructor()');

     this.lwDB = lwDBservice; 
     console.log('numberOfWords='+this.lwDB.numberOfWords());

     if (this.lwDB.numberOfWords() == 0) {
         this.lwDB.importFrom(this.words);
         console.log('words imported: '+this.lwDB.numberOfWords());
     }  

     if (localStorage.getItem('a4-selectedLanguage')==null){
        localStorage.setItem('a4-selectedLanguage',JSON.stringify(this.selectedLanguage));
     } else {
     this.selectedLanguage = JSON.parse(localStorage.getItem('a4-selectedLanguage'));
     }


 }  



  getWords() {
    return this.words;
  }

  nextWord() {
    this.selectedIndex = this.selectedIndex + 1;
    this.numberOfWords = this.words.length;
    if (this.selectedIndex == this.numberOfWords) {this.selectedIndex = 0};
    var w = this.words[this.selectedIndex]; 
    return w; 
  }


  currentWord() {
    var w = this.words[this.selectedIndex]; 
    return w; 
  }

  setSelectedLanguage(lang) {
    this.selectedLanguage = lang;
    localStorage.setItem('a4-selectedLanguage',JSON.stringify(lang));
    console.log('words-data.service language was set to: ' + this.selectedLanguage);
  }

 





}
