
"use strict";
let ImageMagick = require('imagemagick');

class ImageResizeHandler {

  constructor() {
  }

  exec(params) {
      return new Promise((resolve, reject) => {
             ImageMagick.resize(params,(err, stdout, stderr) => {
                  if ( err || stderr ) {
                      console.log((err || stderr));
                      reject("ImageMagick err" + (err || stderr));
                  } else {
                      resolve(stdout);
                  }
              });
            }).catch((err) => {
              console.log(err);
              reject(err);
            });
  }
}

module.exports = ImageResizeHandler;
