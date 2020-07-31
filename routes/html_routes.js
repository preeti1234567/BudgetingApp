var db = require("../models")

var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    
    app.get("/", (req, res) => {
    
        if (!req.user) {
            console.log(req.user)
            res.sendFile(path.join(__dirname, "../public/login.html"));
          
        }
        res.redirect("/dashboard")        
    })

    async function getAllInfo(userId) {
        var income = await db.Income.findAll({where: {userId: userId}})
        var necesssaryExpenses = await db.NecessaryExpense.findAll({where: {userId: userId}})
        var unnecessaryExpenses = await db.UnnecessaryExpenses.findALl({where: {userdId: userId}})
        return {income: income, necesssaryExpenses: necesssaryExpenses, unnecessaryExpenses: unnecessaryExpenses}
    }

    app.get("/userfinancials", isAuthenticated, async (req, res) => {
        var userId = req.user.id
        var allData = getAllInfo(userId)
        res.render("user-financials", allData)
    })

    app.get("/dashboard", isAuthenticated, async (req, res) => {
        var userId = req.user.id
        var allData = getAllInfo(userId)
        res.render("dashboard", allData)

    })
}