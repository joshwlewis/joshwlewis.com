```ruby
class Bannerman < Liner.new(:name, :health)
  def name
    @name ||= Faker::Name.name
  end

  def health
    @health ||= rand(100)
  end
end

Bannerman.new # => #<Bannerman name="Gregor Clegane", health=100>
```
