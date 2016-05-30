---
title: Error Handling in Elixir with Plug.Exception
description: Plug's exception protocol is a hidden gem that can clean up error rendering in your Elixir webapps.
tags: elixir, phoenix, plug
---

I found a hidden gem last week: Plug's exception protocol. It gives you a
concise pattern for rendering errors to users in an informative way.

For example, consider some team dashboard that you want to limit access to
in your Phoenix application. You want to block non-admins and non-team-members
from seeing it, but you also want to provide context that they were blocked
and also why.

The most straightforward way to do this would just be a simple conditional in
your controller. Like this:

```elixir
defmodule MyApp.WidgetController do
  alias MyApp.{Repo, Team, Widget}

  def index(conn, %{"id" => team_id}) do
    user = get_current_user(conn)
    team = Repo.get(Team, team_id)
    if user.role == "admin" && team.id == user.team_id do
      # user is authorized; now we can load up the data
      widgets = Repo.all(Widget)
      render(conn, "show.json", %{widgets: widgets})
    else
      # user is not allowed access; tell them with a message and http status
      put_status(conn, 403)
      |> render(ErrorView, "403.json", %{message: "You need to be a team admin"})
    end
  end
end
```

For this to work, you'll need to define a function to handle rendering
the 403:

```elixir
defmodule MyApp.ErrorView
  def render("403.json", %{message: message}) do
    %{
      status: 403,
      message: message
    }
  end
end
```

Now this works, and is clear and explicit. But it feels a bit verbose
to me. We're mixing authorization and retrieving data into the same function,
and half the code is devoted to detecting and rendering the error. I was doing
something like this, and after adding this to several controllers, the logic
started to feel like a filibuster.

One important thing about Elixir that we should note here, is that there is
no `return` keyword. There is no way to exit a function early. So we can't
just render and abort -- the only way to end the function is to finish
execution. With that in mind, here's a way you could extract this logic.

```elixir
defmodule MyApp.WidgetController do
  def index(conn, %{"id" => team_id}) do
    user = get_current_user(conn)
    team = Repo.get(Team, team_id)
    authorize(conn, user, team, fn ->
      widgets = Repo.all(Widget)
      render(conn, "show.json", %{widgets: widgets})
    end)
  end

  defp authorize(conn, user, team, callback) do
    if user.role =="admin" && team.id == user.team_id do
      callback.()
    else
      put_status(conn, 403)
      |> render(ErrorView, "403.json", %{message: "You need to be a team admin"})
    end
  end
end
```

Here, the `index` function is a little easier to read, and the `authorize`
function encapsulates most of that logic. But this still feels long-winded for
my taste.

Luckily [plug](https://github.com/elixir-lang/plug) provides a
[handy protocol for rendering
exceptions](https://hexdocs.pm/plug/Plug.Exception.html), which Phoenix
supports.

This is actually what Phoenix uses to render a `404` when `Ecto.Repo.get!/2`
fails. Phoenix has implemented the `Plug.Exception` protocol for some of the
common Ecto errors.

```elixir
defimpl Plug.Exception, for: Ecto.NoResultsError do
  def status(_), do: 404
end
```

To use it ourselves, we'll start by defining your own Exceptions. For the
above example, a new `Forbidden` exception makes sense. But you may want to
add more. I have `Unauthorized` (401) and `UnprocessibleEntity` (422) in my
app.

```elixir
defmodule MyApp.Forbidden do
  defexception [message: "You do not have access to this resource.",
                plug_status: 403]
end
```

Now we have an exception that Plug knows how to handle. Whenever we raise
this error, Plug knows to return an HTTP status of 403. We also defined a
default message, which Phoenix will automatically pass to our `ErrorView`
above.

Now, we can clean up our controller a bit.

```elixir
defmodule MyApp.WidgetController do
  def index(conn, %{"id" => team_id}) do
    user = get_current_user(conn)
    team = Repo.get(Team, team_id)
    authorize!(user, team)
    widgets = Repo.all(Widget)
    render(conn, "show.json", %{widgets: widgets})
  end

  defp authorize!(user, team) do
    if user.role !="admin" || team.id != user.team_id do
      raise MyApp.Forbidden, "You need to be a team admin"
    end
  end
end
```

This is certainly more concise, and both functions are directly to the point.

There's another advantage here that's worth highlighting. This error can
be raised anywhere within the life-cycle of a Plug request, and Plug will
handle it. In the first examples, a function needed access to the `conn` struct
to operate on it. Now it's easy to raise an appropriate exception in any
of your functions deeper in the stack (hopefully not in your models, though!).

Documentation on this feature is a bit sparse, but one thing I like about the
Elixir ecosystem is that the code is accessible and easy to grok. I pieced this
functionality together by from data scattered in these resources:

1. [Plug Documentation](https://hexdocs.pm/plug/Plug.Exception.html)
2. [phoenix_ecto source](https://github.com/phoenixframework/phoenix_ecto/blob/master/lib/phoenix_ecto/plug.ex)
3. [Phoenix source](https://github.com/phoenixframework/phoenix/blob/master/lib/phoenix/exceptions.ex)
4. [Phoenix Guides](http://www.phoenixframework.org/docs/custom-errors)

I feel like this was a pretty good improvement, and hopefully it helped you.
I'd be eager to hear if you have any improvements.
