```ruby
# lib/elementy/element.rb
module Elementy
  class Element
    attr_accessor :number, :symbol, :name
    def self.search(term)
      if term =~ /\A\d*\Z/
        find { |e| e.number == term.to_i }
      else
        find { |e| [e.symbol, e.name].include? term.upcase }
      end
    end
  end
end
```