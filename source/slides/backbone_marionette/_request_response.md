```javascript
// src/scripts/app.js
app.reqres.setHandler('profile', function() {
  if (!app.profile) {
    app.profile = new Profile();
    app.profile.fetch();
  }
  return app.profile;
});
app.reqres.setHandler('rating', function(user_id) {
  var rating = app.request('ratings').findWhere({ ratee_id: user_id });
  return rating || app.ratings.add({ ratee_id: user_id });
});

// src/scripts/views/user_item_view.js
UserItemView = Marionette.LayoutView.extend({
  showRating: function() {
    if (app.request('profile').id) {
      var rating = app.request('rating', this.model.id);
      view = new RatingView({ model: rating });
      this.rating_container.show(view);
    }
  }
});
```
