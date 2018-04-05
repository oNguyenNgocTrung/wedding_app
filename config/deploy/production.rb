set :stage, :production
server "128.199.149.245", user: "deploy", roles: %w{web app db}
