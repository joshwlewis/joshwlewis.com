```ruby
class Bannerman < Liner.new(:name, :health)
  include Comparable

  def <=>(other)
    self.health <=> other.health
  end
end

davos = Bannerman.new('Davos Seaworth', 75)
brienne = Bannerman.new('Brienne of Tarth', 85)

brienne > davos  # => true
davos >= brienne # => false
```
