class ExchangeRatesController < ApplicationController
  def index
    # limit to just the past day's rates, order descending
    @rates = ExchangeRate.all
  end

  def create
    @rate = ExchangeRate.new(exchange_rate_params)
    if @rate.save
      render :index
    else
      render json: @list.errors.full_messages, status: 422
    end
  end

  private
  
    def exchange_rate_params
      params.require(:exchange_rate).permit(:date, :rate, :currency)
    end
end
