```ruby
# bin/elementy
#!/usr/bin/env ruby
$:.unshift File.expand_path('../../lib', __FILE__)
require 'elementy'

if args.include?("--version") || args.include?("-v")
  p Elementy::VERSION
else
  if element = Elementy::Element.search(args.first)
    puts element.to_console
  else
    puts "Could not find element #{args.first}"
  end
end
```