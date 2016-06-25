class Api::ExchangeRatesController < ApplicationController
  def index
    # limit to just the past day's rates, currency in alphabetical order
    @rates = ExchangeRate.order(created_at: :desc).limit(31).sort_by {|rate| rate.currency}
  end

  def create
    @rate = ExchangeRate.new(exchange_rate_params)
    if @rate.save
      render json: @rate
    else
      render json: @rate.errors.full_messages, status: 422
    end
  end

  private

    def exchange_rate_params
      params.require(:exchange_rate).permit(:date, :rate, :currency)
    end
end
