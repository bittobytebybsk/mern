const express = require('express');
const app = express();
const connectdb = require('./config/db');

//mongo connection
connectdb();

//init middleware
app.use(express.json({ extended: false }));

//GET
app.get('/', (req, res) => {
  res.send('Hello faf');
  console.log('Hello');
});

//Define routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server Started...');
});
