const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session')
const cors = require('cors');

//initializations
const app = express();
app.name ='API'
require('./lib/passport')

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'))

app.engine('.hbs', exphbs.engine({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs')

//Middlewaress
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true, limit: '50mb'}))
app.use(express.json({ limit: '50mb' }))
app.use(session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())


//Routes
app.use('/users', require('./routes/users'))
app.use(require('./routes/auth'))
app.use(require('./routes/content'))


//Public
app.use(express.static(path.join(__dirname,'public')))

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });


//Starting the server
app.listen(app.get('port'), () =>{
    console.log('Server on port',app.get('port'))
})