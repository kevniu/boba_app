require 'yelp'

class BobasController < ApplicationController

  skip_before_action :verify_authenticity_token

  def search
    parameters = { category_filter: 'bubbletea', limit: 10 }
    coordinates = { latitude: Coordinate.get_coordinate[:latitude].to_f, longitude: Coordinate.get_coordinate[:longitude].to_f}
    render json: Yelp.client.search_by_coordinates(coordinates, parameters)
  end

  def get_location
    respond_to do |format|
      format.json { render :json => "update", :status => 200 }
      format.html { render :nothing => true, :notice => 'Update SUCCESSFUL!' }
    end
    Coordinate.set_coordinate({latitude: params["latitude"], longitude: params["longitude"]})
  end

  def get_address
    respond_to do |format|
      parameters = { category_filter: 'bubbletea', limit: 10 }
      address = params[:location]
      format.json { render :json => Yelp.client.search(address, parameters), :status => 200 }
      format.html { render :nothing => true, :notice => 'Update SUCCESSFUL!' }
    end

  end

end
