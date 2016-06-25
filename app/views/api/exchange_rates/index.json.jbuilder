json.array!(@rates) do |rate|
  json.id rate.id
  json.date rate.date
  json.rate rate.rate
  json.currency rate.currency
  json.created_at rate.created_at
end
