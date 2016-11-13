---
title: Rails Flash Messages with Twitter Bootstrap
tags: ruby, rails, bootstrap, haml
---

When building new Rails projects, I often use [Bootstrap](//twitter.github.com/bootstrap) because it lets me focus more on the business logic, rather than design. Almost everytime I start one of these projects, I forget how I did flash messages the last time, and have to look at a past project or refer to Bootstrap's documentation.

So, for my reference, and maybe your gain, this is the method that works for me.

```haml
- flash.each do |k,v|
  - bootstrap_class = {alert: 'alert-error', notice: 'alert-success', info: 'alert-info'}[k]
  %div{class: [:alert, bootstrap_class]}
    %button.close{data:{dismiss: :alert}} ×
    = v
```

This partial renders all flash messages (In the rare case that you have more than one), and matches the flash type to the bootstrap class. It also uses lets users close the messages (via bootstrap-transitions.js or bootstrap.js)