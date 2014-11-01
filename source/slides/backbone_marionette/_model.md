```javascript
// src/scripts/models/rating.js
Rating = Backbone.Model.extend({
  urlRoot: config.apiHost + '/ratings',
  defaults: {
    ratee_id: null,
    beenz: null
  }
});
```
