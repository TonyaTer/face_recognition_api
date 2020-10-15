require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
});


const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {res.send('Server is running')});
app.get('/profile/:id', profile.handleProfile(db));
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleAPIcall());


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
});
