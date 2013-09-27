```ruby
# elementy.gemspec
Gem::Specification.new do |spec|
  spec.name          = "elementy"
  spec.version       = Elementy::VERSION
  spec.authors       = ["Josh Lewis"]
  spec.email         = ["josh.w.lewis@gmail.com"]
  spec.description   = "Lookup Data for Elements in the Periodic Table"
  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^test/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
end
```