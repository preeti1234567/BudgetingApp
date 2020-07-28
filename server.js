var express = require('express')
var exphb = require('express-handlebars')

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

require('./routes/api_routes')(app)
require('./routes/post_routes')(app)

var db = require('./models')

db.sequelize.sync({ force: true }).then(function () {
    mapp.listen(PORT, function () {
        console.log("Server listening on localhost:" + PORT)
    })

})
