```bash
$ curl beenz.joshwlewis.com/users
```
```json
[{"id":10,"name":"Mr. Meow","beenz":4,"gravatar_url":"..."}]
```
```javascript
// app/models/user.js
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  beenz: DS.attr('number', { defaultValue: 3 }),
  gravatar_url: DS.attr('string'),
});
```
