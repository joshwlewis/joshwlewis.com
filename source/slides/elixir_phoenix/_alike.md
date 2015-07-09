Ruby

```ruby
module Food
  def eat(name)
    if name == "donut"
      puts "too fattening."
    else
      puts "nom nom."
    end
  end
end
```

Elixir

```elixir
defmodule Food do
  def eat(name) do
    if name == "donut" do
      IO.puts "too fattening."
    else
      IO.puts "nom nom."
    end
  end
end
```
