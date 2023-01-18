// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	document.getElementById('photo').src = mImages[mCurrentIndex].img;
	document.getElementByClassName('details').innerHTML = "Location: " + mImages[mCurrentIndex].location;
	document.getElementByClassName('details').innerHTML = "Description: " + mImages[mCurrentIndex].description;
	document.getElementByClassName('details').innerHTML = "Date: " + mImages[mCurrentIndex].date;
	console.log('swap photo');
	mLastFrameTime = 0;
	mCurrentIndex += 1;
}


var mImages = [];

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Holds the retrived JSON information
var mJson;

var mUrl = 'images.json';

mRequest.onreadystatechange = function (){
	if(this.readyState == 4 && this.status == 200){
		mJson = JSON.parse(mRequest.responseText);
		console.log("before iteration");
		iterateJSON(mJson);
	}
};
mRequest.open("GET",mUrl, true);
mRequest.send();


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage() {
	let location = "";
	let description = "";
	let date = "";
	let img = "";
}

function iterateJSON(mJson)
{
  console.log("in iteration");
for( x= 0; x < mJson.images.length; x++)
{
  mImages[x]= new GalleryImage();
  mImages[x].location = mJson.images[x].imgLocation;
  mImages[x].description = mJson.images[x].description;
  mImages[x].img = mJson.images[x].imgPath;
  mImages[x].date = mJson.images[x].date;
  //   console.log("img path: " + mImages[x].img);
  console.log("img location: " + mJson.images[x].imgLocation);
  console.log("img description: " + mJson.images[x].description);
  console.log("img date: " + mJson.images[x].date);
  console.log("img path: " + mJson.images[x].imgPath);
}
}