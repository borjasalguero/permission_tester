/* -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';


window.addEventListener('load', function localized() {
  console.log('1) Asking for sdcard');
  // 1) We ask for SDCard storage
  var file = new Blob(["This is a text file."], {type: "text/plain"});

  var sdcardStorages = navigator.getDeviceStorages('sdcard');
  var req = sdcardStorages[0].add(
    file
  );
  req.onerror = function() {
    console.log('File not stored :( :(')
  };
  req.onsuccess = function(e) {
    document.body.style.backgroundImage = 'url(' + URL.createObjectURL(blob) + ')';
    console.log('File stored!!!! :)');
  };

  // 2) We ask for geolocation
  console.log('2) Asking for geolocation Permission');
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log('Current position is ' + position);
  });




  // 3) We ask for camera permission
  console.log('3) Asking for Camera Permission');
  var camera = navigator.mozCameras.getListOfCameras()[0];
  navigator.mozCameras.getCamera(
    camera, {
      mode: 'picture'
    }).then(
      function(params) {
        var config = {
          dateTime: Date.now() / 1000,
          fileFormat: 'jpeg'
        };

        // Front camera is inverted, so flip rotation
        params.camera.takePicture(config).then(function(blob) {
          console.log('4) Asking for storage:pictures Permission');
          var pictureStorages = navigator.getDeviceStorages('pictures');
          var req = pictureStorages[0].addNamed(
            blob,
            (new Date()).getTime() + '.jpg'
          );
          req.onerror = function() {
            console.log('Image not stored :( :(')
          };
          req.onsuccess = function(e) {
            document.body.style.backgroundImage = 'url(' + URL.createObjectURL(blob) + ')';
            console.log('Image stored!!!! :)');
          };
        }, function() {
          console.log('We can not take a photo :( :(');
        })
      },
      function() {
        console.log('We have no access to camera :( :(');
      }
    );
});
