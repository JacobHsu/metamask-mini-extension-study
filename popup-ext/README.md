# install

## devDependencies

yarn add gulp gulp-util gulp-watch -D
del lodash.assign watchify browserify envify 
vinyl-source-stream vinyl-buffer
babelify brfs
@babel/core
react-devtools

## dependencies

yarn add browserify-derequire

browserify-derequire

## chrome://extensions/?errors

> WebSocket connection to 'ws://localhost:8097/' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED

此錯誤由 ui.js 載入 require-react-devtools.js  `require('react-devtools')` 造成

gulpfile.js

```js
function generateBundler
    if (!opts.buildLib) {
    //   if (opts.devMode && opts.filename === 'ui.js') {
    //     browserifyOpts['entries'] = ['./development/require-react-devtools.js', opts.filepath]
    //   } else {
    //     browserifyOpts['entries'] = [opts.filepath]
    //   }
      browserifyOpts['entries'] = [opts.filepath] 
    }
````
