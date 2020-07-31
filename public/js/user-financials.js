$(function () {
  $(".add-income").on("click", function (event) {
    event.preventDefault();
    console.log($("#amount").val().trim())
    console.log($("#frequency option:selected").text().trim())
    if($("#frequency option:selected").text().trim() === "Monthly"){
      var newAmount = $("#amount").val().trim()/30
    }
    else if($("#frequency").val().trim() === "Yearly"){
      var newAmount = $("#amount").val().trim()/365
    }
    else if($("#frequency").val().trim() === "Weekly"){
      var newAmount = $("#amount").val().trim()/7
    }
    else if($("#frequency").val().trim() === "Daily"){
      var newAmount = $("#amount").val().trim()
    }
    var newIncome = {
      title: $("#job").val().trim(),
      amount: newAmount,
      startDate: moment().format("YYYYMMDD"),
      endDate: null,
    }
    console.log(newIncome)
    $.ajax("/api/income", {
      type: "POST",
      data: newIncome
    }).then(
      function () {
        // console.log("created new income");
        location.reload();
      }
    );
  })
});