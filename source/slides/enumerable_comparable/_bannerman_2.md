```ruby
class Bannerman < Liner.new(:name, :health)
  def <=>(other)
    self.health <=> other.health
  end
end

lannister.max # => #<Bannerman name="Jaime Lannister" health=95>
lannister.min # => #<Bannerman name="Tyrion Lannister" health=20>
```
