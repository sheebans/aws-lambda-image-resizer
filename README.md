# AWS Lambda Image Resizer
 
Purpose of this lambda function is  to resize the images automatically and stored the resized images in target S3 bucket. Lambda function maintain the aspect ratio internal, if right aspect ratio not mentioned in configuration, then it will automatically detects the aspect ratio and resize accordingly.
 
### Configuration Setup
 
 In `config.json` file update the different image dimensions which you need resize automatically and update target s3 bucket name where you want to store the images.
 
 ```json
 {
    "resizes": [{
        "width": 200,
        "height": 100
    }, {
        "width": 300,
        "height": 150
    }, {
        "width": 400,
        "height": 200
    }],
    "target_bucket": "imagemagick-resize.bambeeq.com"
}
```

### Architecture Diagram

![image resize](https://cloud.githubusercontent.com/assets/4478382/18433895/9f0d70a2-7907-11e6-98a2-ccbc94eb56ef.png)

### How to deploy  ? 

#### Method one 
 
  - Clone and build this Lambda application and make zip package. To generate zip file command : `make lambda`
  - Deploy `aws-lambda-image-resizer.zip` from AWS Management Console.
 
#### Method two 
 
  - Clone and build this Lambda application.
  - Create lambda function with name of `imageResize` from AWS management Console. Use `make uploadToaws` it will automatically upload to  aws.
 
#### Method Three

  - Clone and build this Lambda application and make zip package. To generate zip file command : `make lambda`.
  - Create lambda function from AWS Management Console.
  - Depoly lambda zip package via command  : 
    `aws lambda update-function-code --function-name [Replace Lambda function name] --zip-file fileb://aws-lambda-image-resizer.zip` 


 ## Donation
If this project help you reduce time to develop, you can donate me :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/sheebans/5usd)
