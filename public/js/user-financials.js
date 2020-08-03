$(function () {
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });
  //----------
  $(".addOTP").on("click", function (event) {
    event.preventDefault();

    var newPurchaseAmount;
    if($("#oneTimePurchase").val().trim() !== ""){
      newPurchaseAmount = $("#oneTimePurchase").val().trim()
    }
   
    $.ajax("/api/one-timeexpense", {
      type: "POST",
      data: newPurchaseAmount
    }).then(
      function () {
        location.reload();
      }
    );
  })

  
  
  $(".add-oneTimePurchase").on("click", function (event) {
    event.preventDefault();

    var newAmount = $("#oneTimePurchase-amount").val().trim()
    
    var oneTimePurchase = {
      title: $("#oneTimePurchase-title").val().trim(),
      amount: newAmount,      
    }
    $.ajax("/api/onetime-purchase", {
      type: "POST",
      data: oneTimePurchase
    }).then(
      function () {
        location.reload();
      }
    );
  })
  
  //------------
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
        location.reload();
      }
    );
  })

  $(".add-unnecessary").on("click", function (event) {
    event.preventDefault();
    var newAmount;
    var frequency = $("#unnecessary-frequency").val().trim()
    if(frequency === "monthly"){
      newAmount = $("#unnecessary-amount").val().trim()/30
    }
    else if(frequency === "yearly"){
      newAmount = $("#unnecessary-amount").val().trim()/365
    }
    else if(frequency === "weekly"){
      newAmount = $("#unnecessary-amount").val().trim()/7
    }
    else if(frequency === "daily"){
      newAmount = $("#unnecessary-amount").val().trim()
    }
    var newUnEx = {
      title: $("#unnecessary-expense").val().trim(),
      amount: newAmount,
      startDate: moment().format("YYYYMMDD"),
      frequency: frequency,
      endDate: null,
      UserId: null
    }
    $.ajax("/api/unnecessary-expense", {
      type: "POST",
      data: newUnEx
    }).then(
      function () {
        location.reload();
      }
    );
  })

  $(".remove-income").on("click", function(event){
    event.preventDefault();
    var newIncome = {endDate: moment().format("YYYYMMDD")};
    var id = event.target.dataset.id;
    $.ajax("/api/income/" + id, {
      type: "PUT",
      data: newIncome
    }).then(
      function () {
        location.reload();
      }
    );
  })
  $(".remove-oneTimePurchase").on("click", function(event){
    event.preventDefault();
    var id = event.target.dataset.id;
    $.ajax("/api/onetime-purchase/" + id, {
      type: "Delete"
    }).then(
      function () {
        location.reload();
      }
    );
  })
  

  $(".remove-necessary").on("click", function(event){
    event.preventDefault();
    var newNecessary = {endDate: moment().format("YYYYMMDD")};
    var id = event.target.dataset.id;
    $.ajax("/api/necessary-expense/" + id, {
      type: "PUT",
      data: newNecessary
    }).then(
      function () {
        location.reload();
      }
    );
  })

  $(".remove-unnecessary").on("click", function(event){
    event.preventDefault();
    var newUnnecessary = {endDate: moment().format("YYYYMMDD")};
    var id = event.target.dataset.id;
    $.ajax("/api/unnecessary-expense/" + id, {
      type: "PUT",
      data: newUnnecessary
    }).then(
      function () {
        location.reload();
      }
    );
  })
});