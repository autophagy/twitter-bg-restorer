TIME=$(date +%s)
cd chrome-src
zip -r ../chrome-upload-$TIME.zip .
cd ..
cd firefox-src
zip -r ../firefox-upload-$TIME.zip .
