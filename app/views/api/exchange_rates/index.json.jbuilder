json.array!(@rates) do |rate|
  json.date rate.date
  json.rate rate.rate
  json.currency rate.currency
end
