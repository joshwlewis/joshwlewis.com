```elixir
defmodule MyCoolApp.Router do
  use MyCoolApp.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", MyCoolApp do
    pipe_through :browser

    get "/", PageController, :index

    get "/login", LoginController, :new
    post "/login", LoginController, :create

    resources "/users", UserController
  end
end
```
