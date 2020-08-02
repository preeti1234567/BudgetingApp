var db = require("../models")
var passport = require("../config/passport");
const income = require("../models/income");
module.exports = function (app) {
  //Server routes go here
}

module.exports = function (app) {

  app.get('/api/user_data', (req, res) => {
    if (!req.user) {
      res.json({})
    }
    else {
      res.json({
        username: req.user.username,
        id: req.user.userId,
        startDate: req.user.createdAt.slice(0, 10)
      })
    }
  })

  app.post("/api/signup", (req, res) => {
    // When the user signs up, send a signup request to 
    db.User.create(req.body).then(function (result) {
      console.log("Successfully redirecting")
      res.send("Signed up")
    }).catch(err => {
      console.log(err)
      res.status(404).json(err)
    })

  })



  app.post("/api/login", passport.authenticate("local"), (req, res) => {

    if (req.user) {
      res.redirect("/dashboard")
    }
    else {
      res.redirect("/signup")
    }
  })

  app.get("/api/logout", (req, res) => {
    if (req.user) {
      req.logout()
      res.redirect('/')
    }
    else {
      res.redirect('/')
    }
  })

  app.get("/api/all", async (req, res) => {
    var userId = req.user.id
    var income = await db.Income.findAll({ where: { userId: userId} })
    var necessaryExpenses = await db.NecessaryExpense.findAll({ where: { userId: userId} })
    var unnecessaryExpenses = await db.UnnecessaryExpense.findAll({ where: { userId: userId} })
    var oneTimePurchase = await db.oneTimePurchase.findAll({ where: { userId: userId } })
    expenseObj = { income: income, necessaryExpenses: necessaryExpenses, unnecessaryExpenses: unnecessaryExpenses,oneTimePurchase: oneTimePurchase}
    res.json(expenseObj)
  })


  function filterExceptions(unnecessaryExpenses, date) {

    for (const expense of unnecessaryExpenses) {
      var exceptions = expense.exceptions
      if (exceptions) {
        var exceptionsArr = exceptions.split(",") || []
        if (date in exceptionsArr) {
          delete unnecessaryExpenses.expense
        }
      }

    }
  }
  function getSavingsforDate(expenseObj, date) {
    var income = JSON.parse(expenseObj.income)
    var unnecessaryExpenses = JSON.parse(expenseObj.unnecessaryExpenses)
    var necessaryExpenses = JSON.parse(expenseObj.necessaryExpenses)
    var oneTimePurchase = JSON.parse(expenseObj.oneTimePurchase)
    filterExceptions(unnecessaryExpenses, date)

    var totalSavings = 0
    console.log(totalSavings)
    for (const row of income) {
      if ((parseInt(row.startDate) <= parseInt(date)) && (!row.endDate || parseInt(row.endDate) > parseInt(date))) {
        totalSavings += parseFloat(row.amount)
        console.log(totalSavings)
      }
    }
    for (const row of unnecessaryExpenses) {
      if ((parseInt(row.startDate) <= parseInt(date)) && (!row.endDate || parseInt(row.endDate) > parseInt(date))) {
        totalSavings -= parseFloat(row.amount)
      }
    }
    for (const row of necessaryExpenses) {
      if ((parseInt(row.startDate) <= parseInt(date)) && (!row.endDate || parseInt(row.endDate) > parseInt(date))) {
        totalSavings -= parseFloat(row.amount)
        console.log(totalSavings)
      }
    }
    for (const row of oneTimePurchase) {
      if (row.date && parseInt(date) === parseInt(row.date)) {
        totalSavings -= parseFloat(row.amount)
        console.log(totalSavings)
      }
    }
    console.log(108)
    console.log(totalSavings)
    return { dailySaving: totalSavings, date: date }
  }

  app.post("/api/dailyBudget/:date", (req, res) => {

    var date = req.params.date
    console.log(req.body)
    var expenseObj = req.body

    var savingsData = getSavingsforDate(expenseObj, date)
  
    res.json(savingsData)
  });


  //Get route for the income
  app.get("/api/income", function (req, res) {
    var current_id = req.user.id
    db.Income.findAll({
      where: {
        userId: current_id
      }
    }).then(function (data) {
      res.json(data);
    });
  });


  //Post route for the income
  app.post("/api/income", function (req, res) {
    var incomeObj = req.body
    incomeObj.UserId = req.user.id

    db.Income.create(incomeObj).then(function (result) {
      res.json(result)
    })

  });

  //Post route for the necessary expense
  app.post("/api/necessary-expense", function (req, res) {
    req.body.UserId = req.user.id
    db.NecessaryExpense.create(req.body).then(function (result) {
      res.json(req.body);
    });

  });



  //Delete route for the income
  app.delete("/api/income/:id", function (req, res) {
    db.Income.destroy({
      where: {
        id: req.params.id
      }
    })
  });

  //Update route for the income
  app.put("/api/income/:id", function (req, res) {
    db.Income.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  //Post route for onetime-purchase
  app.post("/api/onetime-purchase", function (req, res) {
    var oneTimePurchase = req.body
    oneTimePurchase.UserId = req.user.id

    db.oneTimePurchase.create(oneTimePurchase).then(function (result) {
      res.json(result)
    })

  });

//Get route for the OneTimePurchase
app.get("/api/onetime-purchase", function (req, res) {
  var current_id = req.user.id
  db.oneTimePurchase.findAll({
    where: {
      userId: current_id
    }
  }).then(function (data) {
    res.json(data);
  });
});

//Delete route for the OneTimePurchase
app.delete("/api/onetime-purchase/:id", function (req, res) {
  db.oneTimePurchase.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (data) {
    res.json("record deleted");
  });
});

//Update route for the OneTimePurchase
app.put("/api/onetime-purchase/:id", function (req, res) {
  db.oneTimePurchase.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function (data) {
    res.json(data);
  });
});

  //Get route for the necessary expense
  app.get("/api/necessary-expense", function (req, res) {
    var current_id = req.user.id
    db.NecessaryExpense.findAll({
      where: {
        userId: current_id
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  //Delete route for the necessary expense
  app.delete("/api/necessary-expense/:id", function (req, res) {
    db.NecessaryExpense.destroy({
      where: {
        id: req.params.id
      }
    })
  });

  //Update route for the necessary expense
  app.put("/api/necessary-expense/:id", function (req, res) {
    db.NecessaryExpense.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });


  //Get route for the unnecessary expense
  app.get("/api/unnecessary-expense", function (req, res) {
    var current_id = req.user.id
    db.UnnecessaryExpense.findAll({
      where: {
        userId: current_id
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  //Post route for the unnecessary expense
  app.post("/api/unnecessary-expense", function (req, res) {
    req.body.UserId = req.user.id
    db.UnnecessaryExpense.create(req.body).then(function (result) {
      res.json(result)
    })
      ;
  });

  //Delete route for the unnecessary expense
  app.delete("/api/unnecessary-expense/:id", function (req, res) {
    db.UnecessaryExpense.destroy({
      where: {
        id: req.params.id
      }
    })    
  });

  //Update route for the unnecessary expense
  app.put("/api/unnecessary-expense/:id", function (req, res) {
    db.UnnecessaryExpense.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });


  //Get route for the user
  app.get("/api/user", function (req, res) {
    db.User.findAll({}).then(function (data) {
      res.json(data);
    });
  });

  //Post route for the user
  app.post("/api/user", function (req, res) {
    db.User.create(req.body);
    res.json(req.body);
  });

  //Delete route for the user
  app.delete("/api/user/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    })
  });

  //Update route for the user
  app.put("/api/user/:id", function (req, res) {
    db.User.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  //Get route for the daily budget
  app.get("/api/daily-budget", function (req, res) {
    db.DailyBudget.findAll({}).then(function (data) {
      res.json(data);
    });
  });

  //Post route for the daily budget
  app.post("/api/daily-budget", function (req, res) {
    db.DailyBudget.create(req.body);
    res.json(req.body);
  });

  //Delete route for the daily budget
  app.delete("/api/daily-budget/:id", function (req, res) {
    db.DailyBudget.destroy({
      where: {
        id: req.params.id
      }
    })
  });



  //Update route for the daily budget
  app.put("/api/daily-budget/:id", function (req, res) {
    db.DailyBudget.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });


};

