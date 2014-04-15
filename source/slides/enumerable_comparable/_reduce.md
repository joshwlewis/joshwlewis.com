```ruby
[0,1,1,2,3,5].reduce { |sum, num| sum + num }
# => 12

['w','o','w',' ','h','c','u','s'].reduce do |string, letter|
  letter + string
end
# => 'such wow'
```
