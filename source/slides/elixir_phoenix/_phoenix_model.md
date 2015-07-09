```elixir
defmodule MyCoolApp.User do
  use MyCoolApp.Web, :model

  schema "users" do
    field :email,              :string
    field :password,           :string

    timestamps
  end

  @required_fields ~w(email password)

  def changeset(user, params) do
    cast(user, params, ~w(email password), [])
    |> update_change(:email, &String.downcase/1)
    |> validate_format(:email, ~r"^.+@.+\..+$")
  end
end
```
