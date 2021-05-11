pm2 stop server.js
git pull
yarn && yarn build
NODE_ENV=production pm2 start server.js -i 0
