import { Component, OnInit } from '@angular/core';
import { WordsDataService } from '../../services/words-data.service';

declare var LWutils: any;

@Component({
  selector: 'app-learn-mode',
  templateUrl: './learn-mode.page.html',
  styleUrls: ['./learn-mode.page.scss'],
})

export class LearnModePage implements OnInit {

  word: string;
  translate : string;
  itemImageFileName : string ; 
  itemImageUrlPath: string = 'assets/data/pictures/';

  itemAudioFileName : string ;
  itemAudioUrlPath: string = 'assets/data/audio/';


  service: WordsDataService;

  constructor(wordsData: WordsDataService) {
                   this.service = wordsData;
 
                   var w = this.service.currentWord();
                   this.displayWord(w);       
  }

 ngOnInit() {
  }



 displayWord(w){
       this.word = w.word;
       this.translate = '...';
       console.log('learn-mode-page displayWord selectedLanguage='+this.service.selectedLanguage);
       if (this.service.selectedLanguage=='German') {console.log('--German'); this.translate = w.translate;}
       if (this.service.selectedLanguage=='French') {this.translate = w.translateFR;}
       this.itemImageFileName = w.picture;
       this.itemAudioFileName = w.audio;
  }



 nextItem() {
       var w = this.service.nextWord();
       this.displayWord(w);
 }




listen() 
  {

    var hasPlayed = LWutils.playAudio(this.itemAudioUrlPath+this.itemAudioFileName);

    hasPlayed.addEventListener("ended", function() {
      console.log('sound played!');
    });
  }


}
