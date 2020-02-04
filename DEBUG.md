# chrome://extensions/?errors

> WebSocket connection to 'ws://localhost:8000/socketcluster/' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED

ui\app\store\store.js

> Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.

> Error handling response: TypeError: (0 , _util.checkForError) is not a function

無法判定錯誤訊息 在可疑處 return 看其他拋錯

app\scripts\lib\util.js
少輸出 checkForError

```
export {
  //checkForError,
}

```

> Uncaught (in promise) TypeError: Cannot read property 'setParticipateInMetaMetrics' of undefined

app\scripts\controllers\preferences.js
 Setter for the `participateInMetaMetrics` property

> ObjectMultiplex - orphaned data for stream "controller"
