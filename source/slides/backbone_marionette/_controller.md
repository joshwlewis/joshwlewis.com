```javascript
AppController = Marionette.Controller.extend({
  listUsers: function() {
    var users = app.request('users');
    var view = new UserCollectionView({ collection: users });
    app.main_container.show(view);
  }
});
```
