require 'test_helper'

class BobasControllerTest < ActionController::TestCase
  test 'should return json objects of near by boba' do
    get :search
    return_obj = JSON.parse(response.body)
    assert return_obj['region']
  end
end
