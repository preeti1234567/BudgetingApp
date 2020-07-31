$(function () {
  $(".add-income").on("click", function (event) {
    event.preventDefault();

    var newAmount;
    if($("#income-frequency").val().trim() === "monthly"){
      newAmount = $("#income-amount").val().trim()/30
    }
    else if($("#income-frequency").val().trim() === "yearly"){
      newAmount = $("#income-amount").val().trim()/365
    }
    else if($("#income-frequency").val().trim() === "weekly"){
      newAmount = $("#income-amount").val().trim()/7
    }
    else if($("#income-frequency").val().trim() === "daily"){
      newAmount = $("#income-amount").val().trim()
    }
    var newIncome = {
      title: $("#job").val().trim(),
      amount: newAmount,
      startDate: moment().format("YYYYMMDD"),
      endDate: null,
    }
    $.ajax("/api/income", {
      type: "POST",
      data: newIncome
    }).then(
      function () {
        location.reload();
      }
    );
  })

  $(".add-necessary").on("click", function (event) {
    event.preventDefault();
    var newAmount;
    if($("#necessary-frequency").val().trim() === "monthly"){
      newAmount = $("#necessary-amount").val().trim()/30
    }
    else if($("#necessary-frequency").val().trim() === "yearly"){
      newAmount = $("#necessary-amount").val().trim()/365
    }
    else if($("#necessary-frequency").val().trim() === "weekly"){
      newAmount = $("#necessary-amount").val().trim()/7
    }
    else if($("#necessary-frequency").val().trim() === "daily"){
      newAmount = $("#necessary-amount").val().trim()
    }
    console.log(newAmount)
    var newNecEx = {
      title: $("#necessary-expense").val().trim(),
      amount: newAmount,
      startDate: moment().format("YYYYMMDD"),
      endDate: null,
      UserId: null
    }
    $.ajax("/api/necessary-expense", {
      type: "POST",
      data: newNecEx
    }).then(
      function () {
        console.log("created new income");
        location.reload();
      }
    );
  })

  $(".add-unnecessary").on("click", function (event) {
    event.preventDefault();
    var newAmount;
    if($("#unnecessary-frequency").val().trim() === "monthly"){
      newAmount = $("#unnecessary-amount").val().trim()/30
    }
    else if($("#unnecessary-frequency").val().trim() === "yearly"){
      newAmount = $("#unnecessary-amount").val().trim()/365
    }
    else if($("#unnecessary-frequency").val().trim() === "weekly"){
      newAmount = $("#unnecessary-amount").val().trim()/7
    }
    else if($("#unnecessary-frequency").val().trim() === "daily"){
      newAmount = $("#unnecessary-amount").val().trim()
    }
    var newUnEx = {
      title: $("#unnecessary-expense").val().trim(),
      amount: newAmount,
      startDate: moment().format("YYYYMMDD"),
      endDate: null,
      UserId: null
    }
    $.ajax("/api/unnecessary-expense", {
      type: "POST",
      data: newUnEx
    }).then(
      function () {
        console.log("created new income");
        location.reload();
      }
    );
  })
});