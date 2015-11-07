```handlebars
<!-- app/templates/components/give-beenz.hbs -->
{{beenz-kitties beenz=beenz action="giveBeenz"}}
{{#if isEditing}}
  <button {{action 'save'}}>Save Beenz</button>
{{else}}
  <button {{action 'edit'}}>Change Beenz</button>
{{/if}}
```
```javascript
// app/components/give-beenz.js
export default Ember.Component.extend({
  actions: {
    edit() {
      this.set('isEditing', true);
    },
    save() {
      this.set('isEditing', false);
      this.sendAction('action', this.get('beenz'));
    },
    giveBeenz(been) {
      this.set('beenz', been);
    }
  }
});
```

