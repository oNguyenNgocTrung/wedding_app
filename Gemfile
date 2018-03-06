source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem "rails", "~> 5.1.4"
gem "pg", "0.20.0"
gem "puma", "~> 3.7"
gem "sass-rails", "~> 5.0"
gem "uglifier", ">= 1.3.0"
gem "coffee-rails", "~> 4.2"
gem "jquery-rails", "4.3.1"
gem "turbolinks", "~> 5"
gem "jbuilder", "~> 2.5"
gem "figaro"
gem "config"
gem "slim"
gem "capistrano"
gem "capistrano-rails", require: false
gem "capistrano-bundler", require: false
gem "capistrano-passenger", "~> 0.2.0"
gem "capistrano-rbenv"
gem "wicked_pdf"
gem "wkhtmltopdf-binary"

group :development, :test do
  gem "capybara", "~> 2.13"
  gem "pry-rails"
  gem "selenium-webdriver"
  gem "awesome_print"
  gem "rspec"
  gem "rspec-rails"
  gem "rspec-collection_matchers"
  gem "better_errors"
  gem "guard-rspec", require: false
  gem "database_cleaner"
  gem "factory_bot_rails"
  gem "faker"
  gem "rubocop", "~> 0.51.0", require: false
end

group :test do
  gem "shoulda-matchers", "~> 3.1"
end

group :development do
  gem "web-console", ">= 3.3.0"
  gem "listen", ">= 3.0.5", "< 3.2"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
