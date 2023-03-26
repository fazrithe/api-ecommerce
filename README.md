#NODE JS

#Install
npx express-generator api-ecommerce
npm install
DEBUG=myapp:* npm start
npm install nodemon --save-dev
npm run server
npm install @babel/cli @babel/core @babel/node @babel/preset-env --save-dev
npm run server
npm install sequelize mysql2 --save
npm install -g sequelize-cli
sequelize init
sequelize model:create --name posts --attributes title:string,content:text,tags:string,published:boolean
sequelize db:migrate
sequelize seed:generate —name dummy-posts
sequelize db:seed:all
