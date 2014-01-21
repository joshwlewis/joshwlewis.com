Gemfile

```ruby
gem 'minitest-rails', '~> 0.9.0', group: [:development, :test]
```

```bash
bundle install
rails generate mini_test:install
```

test/test_helper.rb

```ruby
ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require "rails/test_help"
require "minitest/rails"
# ...
```

```bash
bundle exec rake test
```
