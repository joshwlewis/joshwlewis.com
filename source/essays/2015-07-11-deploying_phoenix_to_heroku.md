---
title: Deploying Phoenix Framework Apps to Heroku
description: Get your Elixir Phoenix Framework Application up and running on Heroku.
tags: elixir, phoenix, heroku
---

I've been toying around with the [Phoenix Framework](//phoenixframework.org)
lately, and I wanted to get something out in the wild. Getting it up and running
on Heroku's free tier seemed like the simplest place to start.

Heroku doesn't officially support Elixir (or Erlang for that matter) but you
can easily get it running with this [this third party
buildpack](//github.com/HashNuke/heroku-buildpack-elixir).

Assuming you already have a Phoenix project in git, and the [Heroku
Toolbelt](//toolbelt.heroku.com), you can get started like this:

First, create a Heroku app with the Toolbelt:

```bash
heroku apps:create
```

Add Heroku as one of your git remotes (replace my-new-app with your Heroku app
name).

```bash
git remote add heroku git@heroku.com/my-new-app.git
```

Set some standard configuration variables on your Heroku app.

```bash
heroku config:set PORT=4000
heroku config:set MIX_ENV=prod
```

Now you need two buildpacks. The first one installs Elixir and it's
dependencies to your Heroku app. The second installs nodejs, which is required
for building static assets via Brunch.

```bash
heroku buildpacks:add --index 1 https://github.com/HashNuke/heroku-buildpack-elixir.git
heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-nodejs
```

Now, you'll need to tell Heroku how to start your app. Create a `Procfile` in
your project's root and add this content:

```bash
web: elixir -S mix phoenix.server
```

Be sure and commit this file to your repository. And finally, push all up to
Heroku.

```bash
git push heroku master
```

That should get you up and running. However, you may want to check out
the [Elixir buildpack's source](//github.com/HashNuke/heroku-buildpack-elixir) too. You can do some extra configuration
(such as choosing the Elixir or Erlang version) with the addition of a dotfile.

Good luck! Leave a comment or find me on [Twitter](//twitter.com/joshwlewis) if you need any help.

