```ruby
class Fight < Liner.new(:bannermen)
  include Enumerable

  def attack
    defender = living.sample
    defender.health -= 1
    defender
  end

  def living
    bannermen.select{ |bannerman| bannerman.health > 0 }
  end

  def each
    yield attack until living.count <= 1
  end
end
```
