const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : process.env.host,
      port : 3306,
      user : process.env.user,
      password : process.env.password,
      database : process.env.database
    }
  });
  module.exports=knex