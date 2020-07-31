var db = require("../models")

var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    app.get("/", (req, res) => {
    
        if (!req.user) {
            console.log(req.user)
            res.sendFile(path.join(__dirname, "../public/login.html"));
          
        }
        res.redirect("/dashboard")        
    })

    async function getAllInfo(userId) {
        var income = await db.Income.findAll({ where: { userId: userId } })
        var necessaryExpenses = await db.NecessaryExpense.findAll({ where: { userId: userId } })
        var unnecessaryExpenses = await db.UnnecessaryExpense.findAll({ where: { userId: userId } })
        return { income: income, necessaryExpenses: necessaryExpenses, unnecessaryExpenses: unnecessaryExpenses }
    }

    app.get("/userfinancials", isAuthenticated, async (req, res) => {
        var userId = req.user.id
        var allData = await getAllInfo(userId)
        console.log(allData)
        res.render("user-financials", allData)
    })

    app.get("/signup", (req, res) => {
        if (req.user) {
            res.redirect("/dashboard")
        }
        else {
            res.sendFile(path.join(__dirname, "../public/signup.html"))
        }
    })

    app.get("/dashboard", isAuthenticated, async (req, res) => {
        var userId = req.user.id
        var allData = await getAllInfo(userId)
        
        //if (allData.income.length === 0 && allData.necesssaryExpenses.length === 0) {
        if (false) {
            res.redirect("/userfinancials")
        }
        else {
            res.sendFile(path.join(__dirname, "../public/dashboard.html"))
        }
    })


}
