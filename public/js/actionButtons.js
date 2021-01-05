$(document).ready(function () {
  // create data
  $("#create_button").click(function () {
    var buttonValue = $(this).attr("value");
    $(".heading").text(`${buttonValue} Customer`);
    $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
  })

  // edit data
  $("#edit_button").click(function () {
    var buttonValue = $(this).attr("value");
    $(".heading").text(`${buttonValue} Customer`);
    $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
  })

  // delete data
  $("#copy_button").click(function () {
    var buttonValue = $(this).attr("value");
    $(".heading").text(`${buttonValue} Customer`);
    $(".danger-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
    $(".confirmation-msg").html(`<div class="text-center">
      <p>Are you sure want to ${buttonValue}?</p>
      </div>`);
  })

  // delete data
  $("#delete_button").click(function () {
    var buttonValue = $(this).attr("value");
    $(".heading").text(`${buttonValue} Customer`);
    $(".danger-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
    $(".confirmation-msg").html(`<div class="text-center">
      <p>Are you sure want to ${buttonValue}?</p>
      </div>`);
  })
})