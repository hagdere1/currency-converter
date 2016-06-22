class CreateExchangeRates < ActiveRecord::Migration
  def change
    create_table :exchange_rates do |t|
      t.datetime :date, null: false
      t.decimal :rate, null: false, precision: 8, scale: 2
      t.string :currency, null: false
      t.timestamps null: false
    end

    add_index :exchange_rates, :currency
  end
end
