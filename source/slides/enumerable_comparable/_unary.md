```ruby
[1,2,3].any? { |num| num.odd? }      # => true
[1,2,3].any?(&:odd?)                 # => true

['a','b','c'].none? { |s| s.empty? } # => true
['a','b','c'].none?(&:empty?)        # => true
```
