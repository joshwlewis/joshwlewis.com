```ruby
{"@dhh" => 108000, "@avdi" => "11700"}.each do |key, value|
  puts "#{key} has #{value} followers."
end
# => @dhh has 10800 followers
# => @avdi has 11700 followers

[[12,4],[8,8],[11,5],[6,10]].select do |wins, losses|
  wins.to_f / (wins + losses) > 0.5
end
# => [[12,4],[11,5]]
