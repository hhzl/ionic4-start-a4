# INSTALLATION OF TOOLS

Make sure the [Node.js and npm](https://nodejs.org/en/) are installed.

    npm install -g ionic

    npm install -g cordova

This repository was developed with the following versions:

````
ionic info

Ionic:

   Ionic CLI                     : 5.2.0 (/usr/lib/node_modules/ionic)
   Ionic Framework               : @ionic/angular 4.11.5
   @angular-devkit/build-angular : 0.801.3
   @angular-devkit/schematics    : 8.1.3
   @angular/cli                  : 8.1.3
   @ionic/angular-toolkit        : 2.1.1

Utility:

   cordova-res : not installed
   native-run  : 0.2.9 

System:

   NodeJS : v10.17.0 (/usr/bin/node)
   npm    : 6.11.3
   OS     : Linux 4.15
````

# SETUP 

    git clone https://github.com/hhzl/ionic4-start-a4.git

    cd ionic4-start-a4

    npm install


# SCAFFOLDING

The scaffolding of the code in the repository was done with

````
ionic start ionic4-start-a4 blank --type=angular
cd ionic4-start-a4
ionic generate service services/LWdb
ionic generate service services/wordsData

ionic generate page pages/choose-mode
ionic generate page pages/learn-mode
ionic generate page pages/practice-mode
ionic generate page pages/wordlist
ionic generate page pages/settings
ionic generate page pages/about
````

The genereated code is in the src directory and had to be configured. Such as for example changeing the header of the pages files (home page excluded) to

````
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>...</ion-title>
    <ion-buttons slot="start">
      <ion-back-button></ion-back-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
````

The header of the page home.page.html is

````
<ion-header>
    <ion-toolbar color="primary">
    <ion-buttons slot="end">
        <ion-button routerLink="/about">
            <ion-icon name="information-circle"></ion-icon>
        </ion-button>
    </ion-buttons>
    <ion-title>Ionic 4 start a4</ion-title>
    </ion-toolbar>
</ion-header>
````




# RUN THE APP IN THE BROWSER

    ionic serve


# RUN THE APP ON THE DEVICE

   
## Android

Android environment setup: https://ionicframework.com/docs/installation/android, available for Windows, macOS and Linux.

Build apk file with

    ionic cordova run android

 


