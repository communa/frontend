set :domain,      "app.communa.network"
set :deploy_to,   "/var/www/html/communa-frontend"
set :user, 'root'

role :web,        domain
role :app,        domain, :primary => true

set :webserver_user, "root"
set :branch, "dev"
