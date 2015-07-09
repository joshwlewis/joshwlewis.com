```elixir
defmodule MyCoolApp.UserView do
  use MyCoolApp.Web, :view

  def render("show.json", %{user: user}) do
    %{data: render_one(user, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      type: "user",
      id:   user.id,
      attributes: %{
        email:       user.email,
        inserted_at: user.inserted_at,
        updated_at:  user.updated_at
      }
    }
  end
end
```
