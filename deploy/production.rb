set :domain,      "24.199.67.146"
set :deploy_to,   "/var/www/html/communa-frontend"
set :user, 'root'

role :web,        domain
role :app,        domain, :primary => true

set :webserver_user, "root"
set :branch, "master"
