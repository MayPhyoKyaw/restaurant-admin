$(document).ready(function () {
  // create data
  $("#create_button").click(function () {
    var buttonValue = $(this).attr("value");
    console.log(buttonValue)
    var header = $(".card-header").attr("value");
    $(".heading").text(`${buttonValue} ${header}`);
    $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
  })

  // edit data
  $("#edit_button").click(function () {
    var buttonValue = $(this).attr("value");
    var header = $(".card-header").attr("value");
    $(".heading").text(`${buttonValue} ${header}`);
    $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
  })

  // delete data
  $("#copy_button").click(function () {
    var buttonValue = $(this).attr("value");
    var header = $(".card-header").attr("value");
    $(".heading").text(`${buttonValue} ${header}`);
    $(".danger-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
    $(".confirmation-msg").html(`<div class="text-center">
      <p>Are you sure want to ${buttonValue}?</p>
      </div>`);
  })

  // delete data
  $("#delete_button").click(function () {
    var buttonValue = $(this).attr("value");
    var header = $(".card-header").attr("value");
    $(".heading").text(`${buttonValue} ${header}`);
    $(".danger-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
    $(".confirmation-msg").html(`<div class="text-center">
      <p>Are you sure want to ${buttonValue}?</p>
      </div>`);
  })
})

var button = document.getElementById('create_button');
button.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/clicked', {method: 'POST'})
  .then(function(response) {
    if(response.ok) {
      console.log('clicked!!');
      return;
    }
    throw new Error('Failed!!');
  })
  .catch(function(error) {
    console.log(error);
  });
});