class CustomersController < ApplicationController
  layout :false

  def create
    @customer = Customer.new customer_params
    @customer.save
  end

  private
  def customer_params
    params.require(:customer).permit :name, :contact, :note
  end
end
