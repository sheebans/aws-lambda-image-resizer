"use strict";
let fs             = require("fs");
let path           = require("path");
let Config         = require("../libs/Config");
let ImageResizeHandler = require('../handlers/ImageResizeHandler');
let S3ReadHandler = require('../handlers/S3ReadHandler');
let S3WriteHandler = require('../handlers/S3WriteHandler');
let configPath = path.resolve(__dirname, "../config.json");
let config     = new Config(
    JSON.parse(fs.readFileSync(configPath, { encoding: "utf8" }))
);
let imageResizer = new ImageResizeHandler();
let s3FileWriter = new S3WriteHandler();
let s3FileReader = new  S3ReadHandler();

class ImageResizerProcessor {

  constructor() {

  }

  exec(params) {
      return new Promise((resolve, reject) => {
             s3FileReader.exec(params)
             .then((response) => {
               if (response != null) {
                 let resizes = config.get("resizes", []);
                 resizes.forEach((resize) => {
                    let imageParams =   {
                          "srcData" : response.Body.toString("binary"),
                          "width"   : resize.width,
                          "height"  : resize.height,
                          "format"  : "png"
                        };
                      imageResizer.exec(imageParams)
                      .then((data) => {
                        if (data != null) {
                              let key = params.Key + "-" + resize.width + "x" +  resize.height + ".png";
                              let s3WriteParams = {
                                                    "Body" : new Buffer(data, 'binary'),
                                                    "Bucket" : config.get("target_bucket"),
                                                    "Key" : key,
                                                    "ContentType": 'image/png',
                                                    "ACL": 'public-read'
                                                  };

                              s3FileWriter.exec(s3WriteParams)
                              .then((data) => {

                              }).catch((messages) => {
                                console.log(messages);
                                reject("Failed to write data to s3 bucket : " +  messages);
                              });
                        } else {
                              reject("Failed to resize image");
                        }
                      }).catch((messages) => {
                        reject("Failed to resize image : " +  messages);
                      });
                    });
               } else {
                 reject("Failed to read the file from s3 bucket!");
               }
             }).catch((messages) => {
               reject("Failed to read the file from s3 bucket! : " + messages);
             });
           });
         }
 }

module.exports = ImageResizerProcessor;
