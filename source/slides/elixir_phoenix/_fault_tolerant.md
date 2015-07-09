```elixir
# mix.exs
defmodule HexWeb.Mixfile do
  use Mix.Project

  def project do
    [app: :hex_web,
     version: "0.0.1",
     elixir: "~> 1.0",
     ...
     deps: deps]
  end

  def application do
    [applications: [:logger, :plug, :cowboy, :ecto, :postgrex],
     mod: {HexWeb, []},
     env: []]
  end

  defp deps do
    [{:plug,      "~> 0.11"},
     {:cowboy,    "~> 1.0"},
     {:ecto,      github: "elixir-lang/ecto"},
     {:postgrex,  ">= 0.0.0"},
     ...
   ]
  end
end
```
