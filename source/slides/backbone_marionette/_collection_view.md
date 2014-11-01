```javascript
// src/scripts/views/user_collection_view.js
UserCollectionView = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'list user-collection-view',
  getChildView: function() {
    return UserItemView;
  }
});
```
