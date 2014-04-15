```ruby
['hay','straw','needle','grass'].find { |i| i == 'needle' }
# => 'needle'

['one','two','three'].find{ |i| i.count > 3 }
# => 'three'
