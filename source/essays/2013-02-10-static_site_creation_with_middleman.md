---
title: Static Site Creation with Middleman
tags: ruby, html, middleman
---

I've put off building my personal website for a while. I'm a Rails developer,
so it would be fairly straight forward to build a blogging application and host
it somewhere. But, that seemed like a lot of overhead -- content management 
system, database, and a VPS to host it on. It just didn't seem worth the
expense and effort for a hobby site. Sure, I could hand build a simple html
site, but I'm used to the conveniences of helpers and templating languages that
make building html easy.

#### Enter Static Site Generators

Turns out there are tools out there to bridge the gap. They let you use all the
great tools for making development easier, but compile to static HTML files. Some
examples of these:

* Jekyll
* Octopress
* Middleman
* Nanoc

I won't go into the virtues of each of these, but my eventual choice was 
Middleman.

### Middleman

It's built on Ruby, and it's got a bunch of Rails already baked in. For example...

I can use link_to, just like Rails:

```ruby
link_to "Home", "/"
```

Or render a partial, just like Rails:

```ruby
partial :article_preview, :locals => {:article => article}
```

I can use Haml for layouts, just like Rails:

```haml
#page
  .container
    %section.content= yield
    - if blog.articles.present?
      %footer.explore.center
```

And I can even write some Ruby to keep things DRY:

```ruby
def sentence_tag_list(article)
  if tags = article.tags
    "This article was filed under " +
    content_tag(:div, class: :tags) do
      article.tags.map{|t| link_to t, "/essays/categories/#{t}"}.to_sentence
    end
  end
end
```

#### Best of Both Worlds

So in development, I can use Ruby, Sass, Coffeescript, Markdown, and Haml.
So it's a pleasure to build sites, and I'm a happy developer. 

When it's all ready to go, I build the static files and push to any static file
web server. The advantage here is that I can deploy it basically anywhere,
and because it's just static files, the web server can be highly optimized for
caching...

### So its BLAZING FAST.

VY8FZ2Z9FUU2