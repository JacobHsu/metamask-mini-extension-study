# flow

ui/app/pages/index import Routes

routers

```js
<Switch>
    <Route path='/initialize' component={Main} />
    <Authenticated path='/' component={Home} exact />
</Switch>
```

higher-order-components/authenticated  Redirect to '/initialize'