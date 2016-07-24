require 'yelp'

class BobasController < ApplicationController
  def search
    parameters = { category_filter: 'bubbletea', limit: 5 }
    render json: Yelp.client.search('cll', parameters)
  end

  # def search_location
  #   parameters = { term: 'bubbletea', limit: 16 }
  #   render json: Yelp.client.search('cll', parameters)
  # end

end
