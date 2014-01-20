```ruby
describe User do
  subject { User.new first_name: 'Josh', middle_name: 'Wayne',
                     last_name: 'Lewis' }

  describe :initials do
    it 'should return first letter of all names' do
      subject.initials.must_equal 'JWL'
    end
  end
end
```
