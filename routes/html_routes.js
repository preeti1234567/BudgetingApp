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
    var oneTimePurchase = await db.oneTimePurchase.findAll({ where: { userId: userId } })
    return { income: income, necessaryExpenses: necessaryExpenses, unnecessaryExpenses: unnecessaryExpenses, oneTimePurchase:oneTimePurchase }
  }

  app.get("/userfinancials", isAuthenticated, async (req, res) => {
    var userId = req.user.id
    var incomeData = await db.Income.findAll({ where: { userId: userId } })
    var necessaryData = await db.NecessaryExpense.findAll({ where: { userId: userId } })
    var unnecessaryData = await db.UnnecessaryExpense.findAll({ where: { userId: userId } })
    var oneTimePurchase = await db.oneTimePurchase.findAll({ where: { userId: userId } })
    const data = {
      income: incomeData.map(income => {
        if(!income.endDate){
          return {
            title: income.title,
            amount: (income.amount * 30),
            id: income.id
          }
        }
        else{
          return;
        }
      }),
      necessaryExpenses: necessaryData.map(nec => {
        if(!nec.endDate){
          return {
            title: nec.title,
            amount: (nec.amount * 30),
            id: nec.id
          }
        }
        else{
          return;
        }
      }),
      unnecessaryExpenses: unnecessaryData.map(un => {
        if(!un.endDate){
          return {
            title: un.title,
            amount: (un.amount * 30),
            id: un.id
          }
        }
        else{
          return {};
        }
      }),
      oneTimePurchase: oneTimePurchase.map(otp => {
          return {
            title: otp.title,
            amount: (otp.amount),
            id: otp.id
          }       
      })
    }
    for(var array in data){
        data[array] = data[array].filter(function( element ) {
          return element !== undefined;
       });
    }
    console.log(data);
    res.render("user-financials", data)
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

    if (allData.income.length === 0 && allData.necessaryExpenses.length === 0) {
      res.redirect("/userfinancials")
    }
    else {
      res.sendFile(path.join(__dirname, "../public/dashboard.html"))
    }
  })


}
