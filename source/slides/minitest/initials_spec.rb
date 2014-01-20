require 'ostruct'

class User < OpenStruct
  def initials
    first_name[0] + middle_name[0] + last_name[0]
  end
end

require 'minitest/autorun'
require 'minitest/spec'

describe User do
  subject { User.new first_name: 'Josh', middle_name: 'Wayne',
                     last_name: 'Lewis' }

  describe :initials do
    it 'should return first letter of all names' do
      subject.initials.must_equal 'JWL'
    end
  end
end
