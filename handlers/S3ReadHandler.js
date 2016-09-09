"use strict";

let  AWS = require('aws-sdk');
let s3 = new AWS.S3();

class S3ReadHandler {

  constructor() {
  }

  exec(params) {
    return new Promise((resolve, reject) => {
      s3.getObject(params).promise().then((data) => {

        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = S3ReadHandler;
