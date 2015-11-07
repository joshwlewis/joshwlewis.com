```javascript
// app/components/beenz-kitties.js
export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['kitties'],

  kitties: Ember.computed('beenz', function() {
    return [1,2,3,4,5].map((been) => {
      return {
        image: been <= this.get("beenz") ? been : 0,
        been:  been
      };
    });
  })
})
```

```handlebars
<!-- app/templates/components/beenz-kitties.hbs -->
{{#each kitties as |kitty|}}
  {{beenz-kitty image=kitty.image been=kitty.been}}
{{/each}}
```
