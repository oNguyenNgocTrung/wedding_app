Rails.application.routes.draw do
  root "homepages#index"

  resources :test_exports, only: :index
end
