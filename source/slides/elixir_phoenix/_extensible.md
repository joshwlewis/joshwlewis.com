```elixir
defmodule Fib do
  Enum.with_index([0,1,1,2,3,5,8,11])
  |> Enum.each fn {num, index} ->
    def num(unquote(index + 1)), do: unquote(num)
  end

  def num(n), do: num(n-1) + num(n-2)
end

Fib.num(1)  # => 1
Fib.num(5)  # => 3
Fib.num(20) # => 4181
```
