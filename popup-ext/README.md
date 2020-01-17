# install

## devDependencies

yarn add gulp gulp-util gulp-watch gulp-livereload -D
del lodash.assign watchify browserify envify 
vinyl-source-stream vinyl-buffer
babelify brfs
@babel/core
react-devtools


## dependencies

yarn add browserify-derequire

browserify-derequire
pify end-of-stream

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

## ui.js

### dependencies

yarn add loglevel
extension-port-stream


### debug

ui 無法使用 import

```js
import log from 'loglevel'
```

> ParseError: 'import' and 'export' may appear only with 'sourceType: module'

缺 babel.config.js

`yarn add @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread -D`

`yarn add @babel/runtime`

`yarn add extensionizer`

> Failed to load resource: net::ERR_FILE_NOT_FOUND

index.css @import url("./fonts/Font_Awesome/font-awesome.min.css");

chrome-extension://jiekmineafnpenagghplmkdepommklhg/fonts/Font_Awesome/font-awesome.min.css

缺 FONT