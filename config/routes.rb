Rails.application.routes.draw do
  root "homepages#index"

  resources :customers, only: :create
end
