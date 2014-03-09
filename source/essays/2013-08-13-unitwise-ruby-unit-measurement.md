---
title: 'Unitwise: Ruby Unit Measurement Math and Conversion'
description: 'Unitwise is a RubyGem for unit measurement math and conversion, based on The Unified Code for Units of Measure.'
tags: ruby, gem, math, science
---

So, way back in Mechanical Engineering school, I learned that a very effective way to check my answers was to make sure the units worked out. For an example, consider a basic physics problem:

> The average mass of an adult American male is 86 kilograms. Determine weight of an average man on the moon where the gravitational field is one-sixth that of the Earth (9.8 m/s<sup>2</sup>).

If you paid attention in physics, you would work it out like this:

```ruby
  mass = 86 # 86 kg
  acceleration = 9.8 / 6 # 1.633334 m/s2
  force = mass * acceleration 
  # => 140.4666666666667
```

Ok, so 140 -- but 140 what? Since we effectively performed 'kg * m/s<sup>2</sup>' it's plain to see that our unit is 'kg&sdot;m/s<sup>2</sup>'. Ok, great, so our unit result is in the form of a mass times an acceleration, just as we would expect to see when calculating a force. When you are using a pen and paper, this is a great way to make sure your result is what you expect (your force is a measurement force, your energy is a unit of energy).

But using straight up Numerics for calculation through Ruby means that we lose track of units. As the calculation gets more complicated, manual unit checking becomes monotonous and error-prone. On [emergentcoils.com](https://www.emergentcoils.com/) I've had to do a fair amount of these types of calculations (namely heat transfer capacities), and I was getting tired of trying to remember what unit a Numeric value was in.

So, like any good Rubyist, I searched for a RubyGem that could track units as I performed math on them. There are a couple already out there (most notably [ruby-units](https://github.com/olbrich/ruby-units)), and they certainly work for many (or probably most) situations. However, they either didn't have a few of the units I needed or they only did conversion (not Math). 

During my search, I ended up stumbling across [The Unified Code for Units of Measurement (UCUM)](http://www.unitsofmeasure.org/) -- which had all the units I needed ready to go in XML format. From that [Unitwise](https://github.com/joshwlewis/unitwise) was born.

Now, it's really easy to track units for our example problem:

```ruby
mass = 86.kg
# => <Unitwise::Measurement 86 kg>
acceleration = 9.8.convert_to('m/s2') / 6
# => <Unitwise::Measurement 1.6333333333333335 m/s2>
force = mass * acceleration
# => <Unitwise::Measurement 140.4666666666667 kg.m/s2>
```

And of course it does conversion:

```
mass.to_pound
=> <Unitwise::Measurement 189.5975454789947 pound>

force.to_newton
=> <Unitwise::Measurement 140.4666666666667 newton>
```

Obviously, this is a very simple example, but the possibilities are certainly endless. UCUM (and by extension Unitwise) features 95 metric units, 199 non-metric units, and 24 unit prefixes. That's approximately 2,500 basic units to start you with, but these can be combined with multiplication and division for infinite combinations.

You can find Unitwise at [github.com/joshwlewis/unitwise](https://github.com/joshwlewis/unitwise). Check out the README there for installation and additional usage instructions.
