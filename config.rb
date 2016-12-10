page "/feed.xml", layout: false
page "/slides/*", layout: 'slides'

set :layout, 'home'

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :haml, { ugly: true }
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true,
               :autolink => true,
               :smartypants => true,
               :tables => true,
               :no_intra_emphasis => true

activate :syntax

set :relative_links, true
set :trailing_slash, false

activate :blog do |blog|
  blog.prefix = "essays"
  blog.permalink = ":title"
  blog.layout = "essay"
  blog.default_extension = ".md"
  blog.taglink = "categories/:tag.html"
  blog.tag_template = "essays/categories/category.html"
  blog.paginate = true
  blog.page_link = "p:num"
  blog.per_page = 3
end

activate :relative_assets
activate :directory_indexes

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash
end
