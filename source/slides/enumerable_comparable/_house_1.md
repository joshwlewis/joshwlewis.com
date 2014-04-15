```ruby
class House
  include Enumerable
  def bannermen
    ['Rickard Karstark', 'Greatjon Umber', 'Howland Reed']
  end

  def each
    bannermen.each { |bannerman| yield bannerman }
  end
end

stark = House.new
stark.member? "Greatjon Umber" # => true
stark.first                    # => 'Rickard Karstark'
stark.count                    # => 3
```
