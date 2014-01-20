require 'ostruct'

class User < OpenStruct
  def initials
    first_name[0] + middle_name[0] + last_name[0]
  end
end

require 'minitest/autorun'

class TestUser < Minitest::Test
  def setup
    @user = User.new first_name: 'Josh', middle_name: 'Wayne', 
                     last_name: 'Lewis'
  end
  
  def test_initials
    assert_equal @user.initials, 'JWL'
  end
end
  
