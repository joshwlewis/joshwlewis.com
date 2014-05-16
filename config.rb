###
# Compass
###

# Susy grids in Compass
# First: gem install susy
# require 'susy'

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
page "/feed.xml", layout: false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end
with_layout :slides do
  page "/slides/*"
end

set :layout, 'layouts/blog'

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

set :haml, { :ugly => true }

set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true,
               :autolink => true,
               :smartypants => true,
               :tables => true,
               :no_intra_emphasis => true

activate :syntax

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

activate :deploy do |deploy|
  deploy.method = :git
end

activate :directory_indexes
set :trailing_slash, false


# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  #activate :cache_buster
  # OR
  # Enable asset hashes
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher

  # Or use a different image path
  # set :http_path, "/Content/images/"
end