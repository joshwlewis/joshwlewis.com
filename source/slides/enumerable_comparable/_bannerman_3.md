```ruby
class Bannerman < Liner.new(:name, :health)
  include Comparable
end

davos = Bannerman.new('Davos Seaworth', 75)
brienne = Bannerman.new('Brienne of Tarth', 85)
jaime = Bannerman.new('Jaime Lannister', 95)

jaime < brienne                # => false
brienne >= davos               # => true
davos == jaime                 # => false
davos.between(brienne, jaime)  # => true
```
