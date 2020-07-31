var express = require('express')
var exphb = require('express-handlebars')
var session = require("express-session");
var db = require('./models')

var passport = require('./config/passport')

var PORT = process.env.PORT || 3000;

app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine("handlebars", exphb({
    defaulyLayout: "main",
    helpers: {
    }
})
)
app.set("view engine", 'handlebars')
app.use(express.static("public"))


app.use(session({ secret: "finanChill", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/api_routes')(app)
require('./routes/html_routes')(app)

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("Server listening on localhost:" + PORT)
    })

})
