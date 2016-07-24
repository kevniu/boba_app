class Coordinate < ActiveRecord::Base
  @@current_location = nil

  def self.get_coordinate
    return @@current_location
  end

  def self.set_coordinate(obj)
    @@current_location = obj
  end
end
