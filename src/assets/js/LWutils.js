/**************************************************
* LWutils.js
* 
* This file is a place to put miscellaneous 
* utility functions.
* In this project there is just one.
* See other versions of this file for more functions.
*
* Placed in public domain.
**************************************************/

LWutils = {
	playAudio: function(src) {

		var my_media = null;

		console.log("play: " + src);
		my_media = new Audio(src);
		my_media.play();

		return my_media;
	}
};

