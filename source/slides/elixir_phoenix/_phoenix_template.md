```eex
<%= form_for @conn, login_path(@conn, :create), [name: :login], fn f -> %>
  <div class="form-group">
    <label>Email</label>
    <%= email_input f, :email, class: "form-control" %>
  </div>
  <div class="form-group">
    <label>Password</label>
    <%= password_input f, :password, class: "form-control" %>
  </div>
  <div class="form-group">
    <%= submit "Submit", class: "btn btn-primary" %>
  </div>
<% end %>
```
