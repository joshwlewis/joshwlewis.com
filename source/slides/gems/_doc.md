```ruby
    # Searches for and returns an element if found.
    #
    # @param term [string, symbol, integer] the name, 
    # symbol, or atomic number to search for
    # @return [Elementy::Element]
    def search(term)
      Elementy::Element.search term
    end
```