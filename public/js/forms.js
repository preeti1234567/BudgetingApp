$(document).ready(function(){

    $("#add-income").on("submit", function(event){
        var newIncome = {
            title: $("#job").val().trim(),
            amount: $("#amount").val().trim(),
            frequency: $("#frequency").val().trim()
        }
        event.preventDefault();
        $.ajax("/api/income", {
            type: "POST",
            data: newIncome
          }).then(
            function() {
              console.log("created new income");
              location.reload();
            }
          );
    })
});