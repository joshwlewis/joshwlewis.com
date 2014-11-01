```javascript
// src/scripts/collections/rating_collection.js
RatingCollection = Backbone.Collection.extend({
  url: config.apiHost + '/ratings',
  model: Rating
});
```
