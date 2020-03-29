// Requires...
const express = require('express');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator');
const db = require('./db');

// Create the Express application
const app = express();

// Add Express middlewares...
app.use(bodyParser.json());
// app.use(expressValidator());

// temp array of tasks
const tasks = [
  { id: 1, title: 'Book flights' },
  { id: 2, title: 'Renew driver license' },
  { id: 3, title: 'Return library books' }
];

// Define root GET route handler
app.get('/', (req, res) => {
  res.send('Hello world!!');  
});

// Define GET Tasks route handler
app.get('/api/tasks', (req, res) => {
  // res.send(tasks);
  try {
    const results = await db.query('SELECT * FROM task');
    return res.json(results.rows);
  } catch (err) {
    return next(err);
  }
});

// Define GET Task route handler
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) res.status(404).send('Task with specified id was not found.');
  res.send(task);
});

// Define POST Task route handler
app.post('/api/tasks', (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title
  };
  tasks.push(task);
  res.send(task);
});

// D

// Listen for incoming requests

// First, acquire & validate the port; if a port isn't set, use 3000
const validatePort = unvalidatedPort => {
  const validatedPort = parseInt(unvalidatedPort, 10);
  if (isNaN(validatedPort)) return validatedPort;
  if (validatedPort >= 0) return validatedPort;
  return false;
};
const validPort = validatePort(process.env.PORT || '3000');

// Then, define & register error and listening handlers
// const onListening = () => {
//   const address = app.address();
//   const bind = typeof address === 'string' ? 'pipe ' + addresss : 'port ' + validPort;
//   debug('Listening on ' + bind);
// };
// app.on('listening', onListening);

// const onError = error => {
//   if (error.syscall !== 'listen') throw error
//   const bind = typeof address === 'string' ? 'pipe ' + addresss : 'port ' + validPort;
//   switch (error.code) {
//     case 'EACCESS':
//       console.error(bind + ' rquires elevated privileges.');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use.');
//       process.exit(1);
//       break;
//   }
// };
// app.on('error', onError);

// Finally, listen for requests
app.listen(validPort, () => console.log(`Listening on port ${validPort}...`));
