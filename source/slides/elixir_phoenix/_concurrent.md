```elixir
defmodule Fib do
  def num(1), do: 0
  def num(2), do: 1
  def num(n) do
    two_back = Task.async(fn -> Fib.num(n-2) end)
    one_back = Task.async(fn -> Fib.num(n-1) end)
    Task.await(two_back) + Task.await(one_back)
  end
end

Fib.number(1)  # => 0
Fib.number(5)  # => 3
Fib.number(20) # => 4181
```
