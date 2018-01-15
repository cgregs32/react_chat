Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    get 'messages', to: 'messages#index'
    post 'messages', to: 'messages#create'
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
