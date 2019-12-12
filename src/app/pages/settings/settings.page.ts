// code copied from : 
// https://www.freakyjolly.com/ionic-4-add-radio-lists-in-radio-group-example-and-tutorial/

import { Component, OnInit } from '@angular/core';
import { WordsDataService } from '../../services/words-data.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})


export class SettingsPage implements OnInit {

  selectedRadio : string = 'German';
  service: WordsDataService;

  constructor(wordsData: WordsDataService) {
                   this.service = wordsData;              
     		   this.selectedRadio   = wordsData.selectedLanguage;
                   console.log('settings page - constructor');
		   console.log('this.selectedRadio  =' + this.selectedRadio)
 }



  ngOnInit() {
  }


 onChangeHandler($event) {
    this.selectedRadio = $event.target.value;
    this.service.setSelectedLanguage(this.selectedRadio);
  }



}
