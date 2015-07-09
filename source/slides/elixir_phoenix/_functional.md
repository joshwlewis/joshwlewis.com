### Ruby 

- Messages are sent to objects.
- Object data is mutated directly (mutable).
- Classes add methods to objects to implement functionality.

```ruby
user = User.find(1)
user.name = "Bob"
user.save
```

### Elixir

- Functions are passed data.
- Functions return new copies of the modified data (immutable).
- Functions are chained to compose functionality.

```elixir
user = Repo.get(User, 1)
changes = User.changeset(user, %{name: "Bob"})
Repo.insert(changes)
```
