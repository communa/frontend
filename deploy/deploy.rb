set :stages,        %w(production)
set :default_stage, "production"
set :stage_dir,     "deploy"

require 'capistrano/ext/multistage'

set :application, "communa-frontend"

set :repository,  "git@github.com:communa/frontend.git"
set :scm,         :git

set :keep_releases,  1
set :use_sudo, false

set :normalize_asset_timestamps, false

ssh_options[:forward_agent] = true
ssh_options[:auth_methods] = ["publickey"]

default_run_options[:pty] = true

after 'deploy:update', 'deploy:cleanup'

namespace :deploy do
  task :npminstall, :roles => :app do
    try_sudo "cd #{latest_release} && npm install"
    try_sudo "cd #{latest_release} && npm run build"
    # try_sudo "cd #{latest_release} && npm run pm2"
  end
end

before "deploy:create_symlink", "deploy:npminstall"

task :ssh do
  system "ssh -t #{user}@#{domain} 'cd #{latest_release}; exec \$SHELL -l'"
end
