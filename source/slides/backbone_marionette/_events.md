```javascript
// src/scripts/models/session.js
Session = Backbone.Model.extend({
  urlRoot: config.apiHost + '/session',
  initialize: function() {
    this.on('change:token', function(model, token) {
      app.vent.trigger('change:token', token);
    });
  }
});

// src/scripts/app.js
app.vent.on("change:token", function(token) {
  localStorage.setItem('token', token);
  if (token) {
    app.request('profile').fetch();
  } else {
    app.request('profile').clear();
  }
});
```
