import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LWdbService {


    public dbName : string = 'start-a3';

    // private variables

    _keysOfAllWords = [];

    _numberOfWords = 0;

    recalculateIndex = true;

    _defaultInitialStepValue = -1;


  constructor() { }


private _wdKeyFor(anInteger) {
        return this.dbName+"-wd-"+anInteger;
    };

private _setNumberOfWords(n) {
        var key = this.dbName+"-numberOfWords";
        localStorage.setItem(key,n);
        this._numberOfWords = n;
        this.recalculateIndex = true;
    };



private _incNumberOfWords() {
        this._setNumberOfWords(this._numberOfWords + 1);
        this.recalculateIndex = true;
    };


private _invalidateIndex() {
        this.recalculateIndex = true;
    };



private _indexNeedsRecalculation() {
        return this.recalculateIndex;
    };



private _indexHasBeenUpdated() {
        this.recalculateIndex = false;
    };



private _removeObjects(aKeyPrefix){
        if (!!localStorage) {   // this.isOK()
            var key;
            var st;
            var keysToDelete = [];

            // find all keys starting with aKeyPrefix
            for (var i = 0; i < localStorage.length; i++){
                key = localStorage.key(i);
                st = localStorage.getItem(key);

                if (key.lastIndexOf(aKeyPrefix,0) === 0) {
                    keysToDelete.push(key);
                }
            }

            keysToDelete.forEach(function(aKey){
                localStorage.removeItem(aKey);
            });

        }
        };




putSettings(anObject) {
        
        var key = this.dbName + "-settings";
        return localStorage.setItem(key,JSON.stringify(anObject));  
    }



removeWords() {
        var keys = this._keysOfAllWords; 
        for (var i = 0; i < keys.length; i++){
            localStorage.removeItem(keys[i]);
        }
        this._setNumberOfWords(0);
        this._invalidateIndex();
    }






    destroy() {

         var aKeyPrefix = this.dbName;  
         this._removeObjects(aKeyPrefix);
    }



    persistentStorageOK() {
        return !!localStorage;
      }



    isOK() {
         return this.persistentStorageOK();
      }


    // changes for Typescript as the return value for a number from localstorage is a string

    numberOfWords() {
     
       var key = this.dbName+"-numberOfWords";
        var rst = '';

        if (this.isOK()) {
            rst = localStorage.getItem(key);
            if (rst === null) {
                localStorage.setItem(key,'0'); 
                rst = '0';
            }
          var r = parseInt(rst);
        }
        this._numberOfWords = r;
        return r;
    }








    putWord(aWord) {

        if(!aWord._id){
            throw "_id is required in a word";
        }

        if(!aWord.hasOwnProperty("step")){
            aWord.step = this._defaultInitialStepValue;
        }
        if(!aWord.date){
            aWord.date = 0;
        }

        // get storage key 
        var storageKey = this._wdKeyFor(aWord._id);
        // try to get the word to check if it already exists
        var value = localStorage.getItem(storageKey); 
     
        // save the word

        localStorage.setItem(storageKey, JSON.stringify(aWord));

        // if the word has not existed before increment the number of words
        if (value === null) {
            this._incNumberOfWords();
        }
        // console.log('storageKey is=', storageKey, 'word is=', copy.word);
        return storageKey;
    }



    getWord(anInteger) {
        var storageKey = this._wdKeyFor(anInteger);
        try{
            var aWord = JSON.parse(localStorage.getItem(storageKey));
            if(!aWord.hasOwnProperty("step")){
                aWord.step = this._defaultInitialStepValue;
            }
            if(!aWord.date){
                aWord.date = 0;
            }
            return aWord;
        }catch(e){
            return null;
        }
    }


    importFrom(obj) {
      
      var key;
      var theWords;

      if (typeof obj === "object") {

        
        if (obj instanceof Array) {
           theWords = obj;
        } else {
           theWords = obj.words;
           // TODO 
           // add import of settings
        }


        // import array of words
        var n = theWords.length;
        var aWord;
      
        for(var i = 0; i < n; i++){
          aWord = theWords[i];
	  key = this.putWord(aWord);
        }

        this._invalidateIndex();

      }

    }




    loadWords(theWords) {
        this.importFrom(theWords);
    }



    keysOfAllWords() {
        if (this._indexNeedsRecalculation()) {
            this._keysOfAllWords = [];
            var keyRegex = new RegExp("^"+this.dbName+"\\-wd\\-\\d+$");
            for (var i = 0; i < localStorage.length; i++){
                var key = localStorage.key(i);
                // check it starts with <name>-wd-
                if(keyRegex.test(key)){
                    this._keysOfAllWords.push(key);
                }
            }
            // _setNumberOfWords(_keysOfAllWords.length);
            // as putWord() updates n
            this._indexHasBeenUpdated();

        }
        return this._keysOfAllWords;
    }



    allWords() {
        var keys = this.keysOfAllWords();
        var words = [];
        for(var i = 0; i < keys.length; i++){
            var str = localStorage.getItem(keys[i]);
            words.push(JSON.parse(str));
        }
        return words;
    }


    getSettings() {
        
        var key = this.dbName + "-settings";

        var value = localStorage.getItem(key);

        // lazy initialisation
        if (value===null) {
            // define default value for settings
            var newvalue = { "delay": 8640000,
                      "numberOfOptions": 4,
                      "factorForDelayValue": [1,1,3,7,45,90,360,1000],
                      "defaultInitialStepValue" : this._defaultInitialStepValue,
                      "sessionExpiryTimeInSeconds" : 1800,
                      "suggestedNumberOfWordsInASession" : 20,
                      "lowestStepValue" : -10000
                      };
            // One day = 24h * 60m * 60s * 1000 ms = 86'400'000 ms (milliseconds)
            // the delay has been shortened to 1 day/10 for test purposes.
            // this is 2h 24 min.
            // the value is used to calculate the new date after a
            // word has been answered correctly.

            // "defaultInitialStepValue : -1 means that words means
            // that words are available to be picked and sent to
            // learn/repeat mode.

            this.putSettings(newvalue);
            return newvalue;
        } else {
            return JSON.parse(value);
        }
    }


}
