Gemfile

```ruby
gem 'guard-minitest'
```

Guardfile

```ruby
guard :minitest do
  watch(%r{^test/(.*)_test\.rb})
  watch(%r{^lib/(.+)\.rb})         {|m| "test/#{m[1]}_test.rb"}
  watch(%r{^test/test_helper\.rb}) {'test'}
  watch(%r{^app/(.+)\.rb})         {|m| "test/#{m[1]}_test.rb"}
  # ...
end
```
