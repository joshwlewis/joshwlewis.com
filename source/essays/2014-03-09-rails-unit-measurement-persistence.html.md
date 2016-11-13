---
title: Rails Unit Measurement Persistence
description: Use Unitwise to persist your Rails ActiveRecord model data as a convertible scientific measurement.
tags: ruby, rails, gem, math, science
---

I've worked on a few apps in the past that had some cumbersome constraints in
regards to the units of measurement. Models needed to store heat transfer or
fluid dynamics properties in either english or SI units. This is can be a bit
of a pain, so I thought I'd share my methods and save someone else the trouble.

My problem scenario was in an engineering realm, but there are plenty of other
mainstream domains that exhibit the problem. Consider foot races -- they are
commonly defined in either mileage (like 26.1 miles for a marathon) or kilometers
(like a 5K). Or consider a mechanic's wrenches -- they have a metric set with
sizes like 10 mm, but also have an english set with sizes like 5/8 inch.

To demonstrate the problem and solution, say you are creating an app for cooks.
Maybe it would let cooks share recipes, perhaps it might be used to help
them decide what to offer on tonight's menu, or perhaps it just tracks ingredient
inventory. In any of those cases, you probably need a model for a recipe and
its ingredients.

```ruby
# create_table :recipes do |t|
#   t.string  :name, null: false
# end
class Recipe < ActiveRecord::Base
  has_many :ingredients
end
```

```ruby
# create_table :ingredients do |t|
#   t.string  :substance,     null: false
#   t.decimal :quantity,      null: false,  default: 0
#   t.integer :recipe_id
# end
class Ingredient < ActiveRecord::Base
  belongs_to :recipe
end
```

So, these are some pretty typical models. Sure, they are overly simplified. In
any case, we can setup a new ingredient pretty easily.

```ruby
Ingredient.create(substance: 'Olive Oil', quantity: 1)
```

Now we can see the problem. The obvious question here is how much olive oil is
'1'? Is that one teaspoon, tablespoon, ounce, or maybe even pint or gallon?

In a lot of apps, you might just have some tribal knowledge where everyone
understands that we store quantities in tablespoons. That might be fine in a
lot of cases. But, say we need to know how much olive oil to buy for next week.
Can we buy olive oil by the tablespoon? My olive oil usually comes in 750 ml
bottles. How many tablespoons is that?

It just so happens that I've built a tool for that. [Unitwise](//github.com/joshwlewis/unitwise)
is a Ruby library for converting and performing math on all kinds of units,
volumes included.

Say our grand total of estimated olive oil usage for the week was 1000 tablespoons.
With Unitwise, we could calculate how many bottles of olive oil is required.

```ruby
(1000.tablespoon / 750.ml).to_f # => 19.715686375000004
```

Helpful, but there is a little more we can do here. Instead of relying on
tribal knowledge about storing the quantity in tablespoons, we could make it
explicit.

```ruby
class Ingredient < ActiveRecord::Base
  def quantity
    read_attribute(:quantity).to_tablespoon
  end
end
```

With this modification, each time we retrieve the quantity, we'll get a
measurement back with a value and a unit.

```ruby
Ingredient.last.quantity # => #<Unitwise::Measurement value=1 unit=tablespoon>
```

Unitwise comes with a handy `to_s` method that should get invoked by your views,
which means you can display this value to your users as `'1 tablespoon'`.

Cool, but we can make this a little better yet.

```ruby
class Ingredient < ActiveRecord::Base
  def quantity
    # unchanged from above
  end

  def quantity=(value)
    write_attribute(:quantity, value.to_tablespoon)
  end
end
```

Now we have the advantage of setting the quantity with any unit compatible
with tablespoons -- that is, any volumetric unit.

```ruby
tomatoes = Ingredient.create(name: 'Crushed tomatoes', quantity: 8.fluid_ounce)
tomatoes.quantity # => #<Unitwise::Measurement value=16 unit=tablespoon>
```

With this change, we can now set the quantity with any compatible unit. When
we retrieve the value, it comes back in tablespoons.

We are definitely making progress here. All the values stored and retrieved are
based on tablespoons, no matter what unit you set it with. But, who buys tomatoes
by the tablespoon? When the amount of tomatoes is displayed to the user, they
probably just want to know how many cans (8 fluid ounces) or cups to use.

Lets make one more enhancement. This time, we are going to add a string column
to the ingredients table so we can display an appropriate unit for any
ingredient.

```ruby
# create_table :ingredients do |t|
#   t.string  :substance,     null: false
#   t.decimal :quantity,      null: false,  default: 0
#   t.string  :quantity_unit, null: false,  default: 'tablespoon'
#   t.integer :recipe_id,     null: false
# end

class Ingredient < ActiveRecord::Base

  def quantity
    read_attribute(:quantity).convert_to(self.quantity_unit)
  end

  def quantity=(value)
    write_attribute :quantity, value.to_tablespoon
    if value.respond_to?(:unit)
      self.quantity_unit = value.unit.to_s
    end
  end

end
```

Now we've got something solid. Now all database entries are stored in the same
unit (tablespoon), which is nice, in case some other program or query wants to do
something with that data. And now whatever unit we set the quantity with is what
gets read into the model. For example:

```ruby
water = Ingredient.create(substance: 'Water', quantity: 1.cup)
water.quantity # => #<Unitwise::Measurement value=1 unit=cup>

beer = Ingredient.create(wine: 'Beer', quantity: 1.pint)
beer.quantity # => #<Unitwise::Measurmeent value=1 unit=pint>
```

This example is fairly simple, but it should give you an idea of how to do
something similar in your own domain.
[Unitwise](//github.com/joshwlewis/unitwise/) supports a ton of units, and has
some other really nice features -- Check it out.
