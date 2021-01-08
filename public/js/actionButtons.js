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

var button = document.getElementById('submit_btn');

button.addEventListener('click', function (e) {
  var dishName = document.getElementById('dish_Name').value;
  var langName = document.getElementById('lang_Name').value;
  var smallDishPrice = document.getElementById('small_price').value;
  var largeDishPrice = document.getElementById('large_price').value;
  var dishMenu = $('#dish_menu').val();
  var meat = $('#meat').val();
  var size = $('#size').val();
  console.log('button was clicked');

    fetch('/dishMenu.html', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dish_name: dishName,
        lang_name: langName,
        small_dish_price: smallDishPrice,
        large_dish_price: largeDishPrice,
        dish_menu: dishMenu,
        meat: meat,
        size: size,
      })
    })
    // .then (res => res.json())
    .then(response => console.log(response))


  // fetch('/clicked', { method: 'POST'})
  //   .then(function (response) {
  //     console.log(response)
  //     if (response.ok) {
  //       console.log('clicked!!');
  //       return;
  //     }
  //     throw new Error('Failed!!');
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
});

// button.addEventListener('click', function (e) {
//   var array = [];
//   var dishName = document.getElementById('dish_Name').value;
//   var langName = document.getElementById('lang_Name').value;
//   var dishPrice = document.getElementById('price').value;
//   array.push({"name": dishName, "lang_name": langName, "price": dishPrice})
//   console.log(array)
// });

