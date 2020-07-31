var db = require("../models")

var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

    app.get("/", (req, res) => {
        if (req.user) {
            res.redirect("/dashboard")
        }
        else {
            res.redirect("/login")
        }

    })

    app.get("/login", (req, res) => {
        if (req.user) {
            res.redirect("/dashboard")
        }
        else {
            res.sendFile(path.join(__dirname, "../public/login.html"))
        }
    })

    async function getAllInfo(userId) {
        var income = await db.Income.findAll({ where: { userId: userId } })
        var necessaryExpenses = await db.NecessaryExpense.findAll({ where: { userId: userId } })
        var unnecessaryExpenses = await db.UnnecessaryExpense.findAll({ where: { userId: userId } })
        return { income: income, necessaryExpenses: necessaryExpenses, unnecessaryExpenses: unnecessaryExpenses }
    }

    app.get("/userfinancials", isAuthenticated, async (req, res) => {
        var userId = req.user.id
        var incomeData = await db.Income.findAll({ where: { userId: userId } })
        const incobj = {
            income: incomeData.map(income => {
              return {
                title: income.title,
                amount: (income.amount*30)
              }
            })
          }
        res.render("user-financials", incobj)
        var necessaryData = await db.NecessaryExpense.findAll({ where: { userId: userId } })
        const necobj = {
            necessaryExpenses: necessaryData.map(nec => {
              return {
                title: nec.title,
                amount: (nec.amount*30)
              }
            })
          }
        res.render("user-financials", necobj)
        var unnecessaryData = await db.UnnecessaryExpense.findAll({ where: { userId: userId } })
        const unobj = {
            unnecessaryExpenses: unnecessaryData.map(un => {
              return {
                title: un.title,
                amount: (un.amount*30)
              }
            })
          }
        res.render("user-financials", unobj)
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
        
        if (allData.income.length === 0 && allData.necesssaryExpenses.length === 0) {
            res.redirect("/userfinancials")
        }
        else {
            res.sendFile(path.join(__dirname, "../public/dashboard.html"))
        }
    })


}
