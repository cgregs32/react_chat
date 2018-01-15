json.array! @messages do |message|
  json.id message.id
  json.email message.user.email
  json.body message.body
  json.created_at message.created_at
end
