lambda:
	npm install .
	@echo "Factory package files..."
	@if [ ! -d build ] ;then mkdir build; fi
	@cp index.js build/index.js
	@cp config.json build/config.json
	@if [ -d build/node_modules ] ;then rm -rf build/node_modules; fi
	@cp -R node_modules build/node_modules
	@cp -R processor build/
	@cp -R handlers build/
	@cp -R libs build/
	@cp -R bin build/
	@rm -rf build/bin/darwin
	@echo "Create package archive..."
	@cd build && zip -rq aws-lambda-image-resizer.zip .
	@mv build/aws-lambda-image-resizer.zip ./

uploadToaws: lambda
	@if [ -z "imageResizer" ]; then (echo "Please export imageResizer" && exit 1); fi
	aws lambda update-function-code --function-name imageResizer --zip-file fileb://aws-lambda-image-resizer.zip	

clean:
	@echo "clean up package files"
	@if [ -f aws-lambda-image-resizer.zip ]; then rm aws-lambda-image-resizer.zip; fi
	@rm -rf build/*
