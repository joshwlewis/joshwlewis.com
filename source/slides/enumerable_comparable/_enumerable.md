```ruby
{foo: bar}.is_a?(Enumerable)              # => true
['foo', 'bar'].is_a?(Enumerable)          # => true
Set.new(['foo', 'bar']).is_a?(Enumerable) # => true
```
