```ruby
class House < Liner.new(:name, :bannermen)
  def name
    @name ||= Faker::Name.name
  end

  def bannermen
    @bannermen ||= Array.new(5) { Bannerman.new }
  end
end

lannister = House.new(name: 'Lannister')

lannister.reduce { |sum, bannerman| sum + bannerman.health }
# => 300
lannister.max # => #<Bannerman name="Tyrion Lannister", health=25>
