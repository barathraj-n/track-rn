require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth')

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://admin:vBa2VBQ3mS6t0O6d@track-cluster.00uae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error',(err) => {
    console.log('Error connecting to mongo instance', err);
});

app.get('/', requireAuth, (req,res) => {
    res.send(`Your email address id ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});