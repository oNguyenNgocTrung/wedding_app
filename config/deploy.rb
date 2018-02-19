lock "~> 3.10.1"

set :application, "wedding_app"
set :repo_url, "git@github.com:oNguyenNgocTrung/wedding_app.git"
set :branch, :master
set :keep_releases, 5
set :deploy_to, "/home/deploy/wedding_app"
set :linked_files, %w{config/database.yml config/secrets.yml config/application.yml}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads}

namespace :deploy do
  desc "Restart application"
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute :touch, release_path.join("tmp/restart.txt")
    end
  end

  after :publishing, :restart

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end
end
