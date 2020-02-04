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

[store] redux-thunk remote-redux-devtools
[pages] recompose prop-types

yarn add @sentry/browser

[ui/app/components] classnames
[ui.js] obj-multiplex pump
[background.js] extensionizer extension-port-stream pify clone
[app\scripts\ui.js] dnode web3-stream-provider eth-query
[inpage.js] metamask-inpage-provider post-message-stream web3
[metamask-controller.js]
- preferences.js  obs-store eth-sig-util ethereumjs-util



## manifest.json

background.js  
app\scripts\lib\local-store.js  

```js
  "permissions": [
    "storage"
  ],
```

## router

first-time-flow.component.js 控制初始設定的 router

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

### ui

ui\index.js

yarn add react react-dom

### pages

ui\app\pages\index.js

yarn add redux react-redux react-router-dom

### store

ui\app\store\store.js

yarn add redux-thunk remote-redux-devtools 

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

@pages/index.js

> Uncaught Error: Index(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.

router output 應包裹在 return

## React Docs

[Function Component 與 Class Component](https://zh-hant.reactjs.org/docs/components-and-props.html)

在適當的時機下，透過 `PureComponent` 可以提升效能，這是由於繼承 React.PureComponent 在shouldComponentUpdate預設實作 shadow compare 新的 props & state 與舊的 props & state，如果兩者相同就會回傳 false，不 re-render component。
  