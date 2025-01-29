const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`User Service is running on http://localhost:${port}`);
});
