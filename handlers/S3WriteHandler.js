"use strict";

let  AWS = require('aws-sdk');
let s3 = new AWS.S3();

class S3WriteHandler {

  constructor() {
  }

  exec(params) {
    return new Promise((resolve, reject) => {
      s3.putObject(params).promise().then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = S3WriteHandler;
