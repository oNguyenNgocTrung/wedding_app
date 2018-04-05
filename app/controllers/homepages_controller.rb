class HomepagesController < ApplicationController
  def index
    @customer = Customer.new
  end
end
