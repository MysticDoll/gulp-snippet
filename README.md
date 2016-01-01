# GulpSnippet
Gulp+BrowserifyでCoffeeScript開発をするときのひな型です。
gulpfileをいじくっていい感じにカスタマイズしてください。
# Usage
## Installation
clone repository and run `npm install`
## Build
run `npm run build` then build index.coffee into dest/main.js and make uglified js-file on same directory.  
run `npm run watch` then create server with live-reload(distoribute `dest` directory) and watch `src` directory.(if `src/\*.coffee` or `src/\*\*/\*.coffee` is changed, rebuild js-file)

## License
MIT License
