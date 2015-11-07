```javascript
export default Ember.ObjectController.extend({
  actions: {
    giveBeenz(beenz) {
      const rating = this.get('model.rating')
      rating.set('beenz', beenz);
      rating.save().then(() => {
        this.flashMessages.success(`Gave ${beenz} beenz :)`);
      }, () => {
        this.flashMessages.warning("Error giving beenz :(");
      });
    }
  }
});
```
