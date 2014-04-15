#### Enumerable#select
```ruby
[1,2,3,4].select { |num| num.even? } # => [2,4]
```
#### Enumerable#map
```ruby
['a','b','c'].map { |letter| letter.upcase } # => ['A','B','C']
```
#### Enumerable#reduce
```ruby
[1,2,3,4].reduce { |sum,num| sum + num } # => 10
```
#### Many more...
```ruby
Enumerable.instance_methods 
# => [:to_a, :entries, :sort, :sort_by, :grep, :count, :find, :detect, :find_index, :find_all, :select, :reject, :collect, :map, :flat_map, :collect_concat, :inject, :reduce, :partition, :group_by, :first, :all?, :any?, :one?, :none?, :min, :max, ...]
