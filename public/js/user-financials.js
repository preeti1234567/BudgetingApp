$(function () {
  $(".add-income").on("click", function (event) {
    event.preventDefault();
    console.log($("#amount").val().trim())
    if($("#frequency").val().trim() === "monthly"){
      var newAmount = $("#amount").val().trim()/30
    }
    else if($("#frequency").val().trim() === "yearly"){
      var newAmount = $("#amount").val().trim()/365
    }
    else if($("#frequency").val().trim() === "weekly"){
      var newAmount = $("#amount").val().trim()/7
    }
    else if($("#frequency").val().trim() === "daily"){
      var newAmount = $("#amount").val().trim()
    }
    var newIncome = {
      title: $("#job").val().trim(),
      amount: newAmount,
      startDate: moment().format("YYYYMMDD"),
      endDate: null,
      UserId: 3
    }
    console.log(newIncome)
    $.ajax("/api/income", {
      type: "POST",
      data: newIncome
    }).then(
      function () {
        console.log("created new income");
        // location.reload();
      }
    );
  })
});