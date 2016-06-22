class ExchangeRate < ActiveRecord::Base
  validates :date, :rate, :currency, presence: true
end
