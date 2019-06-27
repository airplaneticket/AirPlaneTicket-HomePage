require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const expressSession = require('express-session');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const flash = require('express-flash')
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useFindAndModify: false });

const app = express();
const session = expressSession({
    key: 'userSessionId',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {}
});

app.set('views', path.join(__dirname, 'src', 'app', 'views'));
app.set('view engine', 'ejs');

// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'app', 'public')));
app.use('/booking', express.static(path.join(__dirname, 'src', 'app', 'public')));
app.use('/register/verify', express.static(path.join(__dirname, 'src', 'app', 'public')));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session);
app.use(flash());

require('./src/app/routes/index')(app);


app.listen(process.env.PORT);