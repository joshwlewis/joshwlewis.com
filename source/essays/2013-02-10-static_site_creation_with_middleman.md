---
title: Static Site Creation with Middleman
tags: middleman, html, ruby
---

I've put off building my personal website for a while. For two reasons really:

1. I am cheap, and I didn't want to buy a VPS for a Rails/Sinatra application.
2. I am lazy, and I don't want to write a bunch of html files for a static site.

#### Enter Static Site Generators

Turns out there are tools out there to bridge the gap. They let you use all the
great tools for making development easier, but compile to static HTML files. Some
examples of these:

* Jekyll
* Octopress
* Middleman
* Nanoc

I won't go into the virtues of each of these, but my eventual choice was Middleman.

### Middleman

It's built on Ruby, and it's got a bunch of Rails already baked in. For example...

I can use link_to, just like Rails:

    link_to "Home", "/"

Or render a partial, just like Rails:

    partial :article_preview, :locals => {:article => article}

I can use Haml for layouts, just like Rails:

    #page
      .container
        %section.content= yield
        - if blog.articles.present?
          %footer.explore.center

And I can even write some Ruby to keep things DRY:

      def sentence_tag_list(article)
        if tags = article.tags
          "This article was filed under " +
          content_tag(:div, class: :tags) do
            article.tags.map{|t| link_to t, "/essays/categories/#{t}"}.to_sentence
          end
        else
          nil
        end
      end

#### Best of Both Worlds

So in development, I can use Ruby, Sass, Coffeescript, Markdown, and Haml.
So it's a pleasure to build sites, and I'm a happy developer. However, my
production machine is just basic Apache with static files. This allows me to implement
several layers of caching.

### So its BLAZING FAST.