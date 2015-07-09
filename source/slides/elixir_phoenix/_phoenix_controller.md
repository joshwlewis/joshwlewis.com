```elixir
defmodule MyCoolApp.LoginController do
  use MyCoolApp.Web, :controller
  alias MyCoolApp.Login

  def new(conn, _params) do
    render(conn, :new, login: %Login{})
  end

  def create(conn, %{"login" => %{"email" => email, "password" => password}}) do
    login = %Login{email: email, password: password}

    if user = Login.authorized_user(login) do
      put_session(conn, :user_id, user.id)
      |> redirect(to: users_path(conn, :index))
    else
      put_flash(conn, :error, "Invalid credentials provided.")
      |> render(:new, login: login)
    end
  end
```
