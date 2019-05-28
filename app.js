require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const expressSession = require('express-session');
const path = require('path');
const morgan = require('morgan');
const routes = require('./src/app/routes');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const app = express();
const session = expressSession({
    key: 'userSessionId',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {}
});

// view engine setup
app.set('views', path.join(__dirname, 'src', 'app', 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'src','app','public')));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session);

routes(app);


app.listen(process.env.PORT);