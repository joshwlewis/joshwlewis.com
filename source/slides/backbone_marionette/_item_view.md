```javascript
ProfileView = Marionette.ItemView.extend({
  template: 'profile',
  className: 'profile-view',
  ui: {
    'beenz_line': '.beenz-line'
  },
  onRender: function() {
    // Add color appropriate cat images based on beenz
  }
});
```

```html
<img class='avatar img-circle' src='{{ gravatar_url }}'>
<h3 class='name'>{{ name }}</h3>
<div class='beenz-line'></div>
```
