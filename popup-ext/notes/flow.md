# flow

ui/app/pages/index import Routes

routers

```js
<Switch>
    <Route path='/initialize' component={FirstTimeFlow} />
    <Authenticated path='/' component={Home} exact />
</Switch>
```

higher-order-components/authenticated  Redirect to '/initialize'


ui\app\pages\first-time-flow\first-time-flow.component.js

router -> '/'  -> FirstTimeFlowSwitch ->  '/initialize/welcome'

```js
<Switch>
    <Route
        exact
        path='/initialize/welcome'
        component={Welcome}
    />
    <Route
        exact
        path="*"
        component={FirstTimeFlowSwitch}
    />
</Switch>  
```

ui\app\pages\first-time-flow\first-time-flow-switch\first-time-flow-switch.component.js

```js
    if (optInMetaMetrics === null) {
      return <Redirect to={{ pathname: '/initialize/welcome' }} />
    }
```
