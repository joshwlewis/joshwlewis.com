---
title: ActiveSupport try
tags: rails, ruby
---

ActiveSupport has a few great Ruby extensions that I just love... one of my favorites is

### .try()

Try is a sneaky method for handling NoMethodErrors on NilClass. If you ever get stuck writing code like this:

```ruby
name = user.name unless user.nil?
```

Consider using try instead:

```ruby
name = foo.try :name
```

It's basically like using send, but it will return nil if the reciever is nil.

```ruby
user = User.new name: "Josh"    #=> #<User>
user.try :name                  #=> "Josh"

user = nil                      #=> nil
user.try :name                  #=> nil
```
