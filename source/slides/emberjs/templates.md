```handlebars
<!-- app/templates/application.hbs -->
<div class="user-list list-group">
  {{#each model as |user|}}
    {{#link-to "user" user.name class="user-list-item rainbow list-group-item"}}
      <div class="avatar">
        {{beenz-gravatar url=user.gravatar_url}}
      </div>
      <div class="info">
        <div class="name">{{user.name}}</div>
        <div class="beenz">{{beenz-kitties beenz=user.beenz}}</div>
      </div>
    {{/link-to}}
  {{/each}}
</div>
```
