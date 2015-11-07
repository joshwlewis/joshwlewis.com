```handlebars
<!-- from any template -->
{{ember-kitty image=3 size=40}}
```
```javascript
// app/components/ember-kitty.js
export default Ember.Component.extend({
  tagName: "img",
  classNames: ["kitty"],
  attributeBindings: ["src", "height", "width"],
  src: Ember.computed("image", function() {
    return `/assets/images/kitty-${this.get('image')}.png`;
  }),
  height: Ember.computed.reads("size"),
  width: Ember.computed('height', function() {
    return Math.round(this.get("height") * 1.17);
  })
});
```
