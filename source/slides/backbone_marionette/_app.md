```javascript
// src/scripts/app.js
app = new Marionette.Application();

app.addInitializer(function() {
  app.addRegions({
    header_container: '#header-container',
    main_container:   '#main-container'
  });
  app.controller = new AppController();
  app.router = new AppRouter({
    controller: app.controller
  });
  app.controller.showProfile();
  Backbone.history.start();
});
