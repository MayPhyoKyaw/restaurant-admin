$(document).ready(function () {
  // create data
  $("#create_button").click(function () {
    var buttonValue = $(this).attr("value");
    console.log(buttonValue)
    var header = $(".card-header").attr("value");
    $(".heading").text(`${buttonValue} ${header}`);
    $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);

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
        .then(function (response) {
          console.log(response)
          if (response.ok) {
            console.log('clicked!!');
            return;
          }
          throw new Error('Failed!!');
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  })

  // edit data
  $("#edit_button").click(function () {
    var buttonValue = $(this).attr("value");
    var header = $(".card-header").attr("value");
    $(".heading").text(`${buttonValue} ${header}`);
    $(".edit-submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
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
    // $(".confirmation-msg").html(`<div class="text-center">
    //   <p>Are you sure want to ${buttonValue}?</p>
    //   </div>`);
  })

  // var dishRow = $('#dataTable').DataTable({
  //   ajax: {
  //     url: 'data.json',
  //     dataSrc: "",
  //     columns: [
  //       // {data: }
  //       {data: "dishName"},
  //       {data: "langName"},
  //       {data: "dishMenu"},
  //       {data: "price"},
  //     ],
  //   }
  // });
  // fetch('/selectDish', {method: 'GET'})
  //   .then(function(response) {
  //     if(response.ok) return response.json();
  //     throw new Error('Request failed.');
  //   })
  //   .then(function(data) {
  //     // document.getElementById('counter').innerHTML = `Button was clicked ${data.length} times`;
  //     data.forEach(dish => {
  //       console.log(dish.dishName, dish.langName, dish.smallDishPrice);
  //       // $("#dataTable tbody").append(`
  //       //   <tr>
  //       //     <td></td>
  //       //     <td class="selection"><span class="star-o"></span></td>
  //       //     <td>${dish.dishName}</td>
  //       //     <td>${dish.langName}</td>
  //       //     <td>${dish.dishMenu}</td>
  //       //     <td>${dish.largeDishPrice}</td>
  //       //   </tr>
  //       // `)
  //       dishRow.row.add({
  //         "dishName" : `${dish.dishName}`,
  //         "langName" : `${dish.langName}`,
  //         "dishMenu" : `${dish.dishMenu}`,
  //         "price" : `${dish.largeDishPrice}`,
  //       }).draw();
  //     });
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
})

// function selectDish() {

// }
