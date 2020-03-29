const { Client } = require('pg');

const dbClient = new Client({
  connectionString: 'postgresql://localhost/task_tracker'
})

dbClient.connect();

module.exports = dbClient;