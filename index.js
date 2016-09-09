 /*
 * Image resizer
 *
 * @author Sheeban
 * @created 01/09/2016
 */
"use strict";

let ImageResizeProcessor = require('./processor/ImageResizeProcessor');
let resizeProcessor = new ImageResizeProcessor();

exports.handler = (event, context, callback) => {
    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key
    };

    resizeProcessor.exec(params)
    .then((response) => {
      console.log("Successfully resized images.");
      context.succeed();
    }).catch((error) => {
      console.log("Error : ", error);
      context.fail();
    });
};
