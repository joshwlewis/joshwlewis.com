---
title: ActiveSupport try
tags: rails, ruby
---

ActiveSupport has a few great Ruby extensions that I just love. One of my favorites is try.

### .try()

Try is a sneaky method for handling NoMethodErrors on NilClass. If you ever get stuck writing code like this:

```ruby
name = user.name unless user.nil?
```

Consider using try instead:

```ruby
name = user.try :name
```

It's basically like using send, but it will return nil if the reciever is nil.

Here it works like send:

```ruby
user = User.new name: "Josh"    #=> #<User>
user.send :name                 #=> "Josh"
user.try :name                  #=> "Josh"
```

And here it doesn't blow up with a NoMethodError:

```ruby
user = nil                      #=> nil
user.send :name                 #=> NoMethodError
user.try :name                  #=> nil
```

It comes in handy fairly often.
