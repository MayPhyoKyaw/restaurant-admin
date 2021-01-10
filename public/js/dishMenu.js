// const MongoClient = require('mongodb').MongoClient;

// import { render } from "pug";

// Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb+srv://ksp:ksp123@cluster0.tqggl.mongodb.net/<dbname>?retryWrites=true&w=majority";

$(document).ready(function () {

  //select all
  // var  DT1 = $('#dataTable').DataTable();
  $(".selectAll").on("click", function (e) {
    if ($(this).is(":checked")) {
      myTable.rows().select();
    } else {
      myTable.rows().deselect();
    }
  });

  //datatable
  var myTable = $('#dataTable').DataTable({
    replace: true,
    fixedColumns: true,
    responsive: true,
    pageLength: 10,
    language: {
      processing: "Processing...",
      loadingRecords: "Loading...",
      paginate: {
        first: "&lsaquo;",
        last: "&rsaquo;",
        next: "&raquo;",
        previous: "&laquo;",
      },
    },
    // ajax: "data.json",
    columns: [
      {
        data: "select",
        render: function () {
          return "<td></td>"
        }
      },
      {
        data: "fav",
        render: function () {
          return '<span class="star-o" id="fav"></span>'
        },
        className: "selection"
      },
      // { data: "dishName", className: "text" },
      // { data: "langName", className: "text" },
      // { data: "dishMenu", className: "text" },
      // { data: "price", className: "text" },
      { targets: "dish-name-dt", data: "dishName", className: "text", width: "23%" },
      { targets: "lang-name-dt", data: "langName", className: "text", width: "27%" },
      { targets: "dish-menu-dt", data: "dishMenu", className: "text", width: "12%" },
      {
        targets: "datetime-dt", data: "datetime", className: "text", width: "20%",
        render: function (data) {
          console.log(data)
          var datetime = data.split(",");
          if(data['updated_at'] == null){
            return (`<span>Created At: ${datetime[0]}</span>`)
          }
          else{
            return (`<span>Created At: ${datetime[0]}</span><br/><span>Updated At: ${datetime[1]}`)
          }
        }
      },
      { targets: "small-price-dt", data: "smallDishPrice", className: "text", width: "19%" },
      { targets: "large-price-dt", data: "largeDishPrice", className: "hiddenData" },
      { targets: "meat-dt", data: "meat", className: "hiddenData" },
      { targets: "size-dt", data: "size", className: "hiddenData" },
      { targets: "dish-id-dt", data: "id", className: "hiddenData", searchable: false },
    ],
    order: [[2, 'asc']],
    columnDefs: [
      {
        "className": 'select-checkbox',
        "targets": 0
      },
      {
        "sClass": 'options',
      },
      {
        "targets": [0, 1],
        "orderable": false,
        "width": "1%",
      },
      // { targets: "dish-name-dt", width: "40%" },
      // { targets: "lang-name-dt", width: "30%" },
      // { targets: "dish-menu-dt", width: "13%" },
      // { targets: "small-price-dt", width: "18%" },
      // { targets: "large-price-dt", className: "hiddenData" },
      // { targets: "meat-dt", className: "hiddenData" },
      // { targets: "size-dt", className: "hiddenData" },
      // { targets: "dish-id-dt", className: "hiddenData", searchable: false },
    ],
    select: {
      style: 'multi',
      // style: 'os',
      selector: 'td:first-child',
    },
    rowCallback: function (row, data, index) {
      // for dish meat
      console.log(data);
      if (data["meat"] === "Pork") {
        $(row).find('td:eq(3)').html(data["langName"] + '<span class="badge-pork">Pork</span>')
      }
      else if (data["meat"] === "Chicken") {
        $(row).find('td:eq(3)').html(data["langName"] + '<span class="badge-chicken">Chicken</span>')
      }
      else if (data["meat"] === "Seafood") {
        $(row).find('td:eq(3)').html(data["langName"] + '<span class="badge-seafood">Seafood</span>')
      }
      else if (data["meat"] === "Beef") {
        $(row).find('td:eq(3)').html(data["langName"] + '<span class="badge-beef">Beef</span>')
      }
      // for dish size
      if (data["size"] === "Small") {
        $(row).find('td:eq(6)').html(data["smallDishPrice"] + '<span class="badge-size-small">S</span> <br/>' + data["largeDishPrice"])
      }
      else if (data["size"] === "Large") {
        $(row).find('td:eq(6)').html(data["smallDishPrice"] + '<br/>' + data["largeDishPrice"] + '<span class="badge-size-large">L</span> ')
      }
      else if (data['size'] === "Small,Large") {
        $(row).find('td:eq(6)').html(data["smallDishPrice"] + '<span class="badge-size-small">S</span> </br>' + data["largeDishPrice"] + '<span class="badge-size-large">L</span>')
      }
      // for dish menu
      if (data['dishMenu'] === "Appetizers") {
        $(row).find('td:eq(4)').html(`<span class="badge badge-light badge-appetizers">${data['dishMenu']}</span>`)
      }
      else if (data['dishMenu'] === "Soups") {
        $(row).find('td:eq(4)').html(`<span class="badge badge-light badge-soups">${data['dishMenu']}</span>`)
      }
      else if (data['dishMenu'] === "Salads") {
        $(row).find('td:eq(4)').html(`<span class="badge badge-light badge-salads">${data['dishMenu']}</span>`)
      }
      else if (data['dishMenu'] === "Curries") {
        $(row).find('td:eq(4)').html(`<span class="badge badge-light badge-curries">${data['dishMenu']}</span>`)
      }
      else if (data['dishMenu'] === "Vegetables Dishes") {
        $(row).find('td:eq(4)').html(`<span class="badge badge-light badge-vegetables-dishes">${data['dishMenu']}</span>`)
      }
      ////
    },
    createdRow: function (row, data, index) {
      $(row).addClass('hover');
    }
  });

  $('#dataTable tbody').on('click', '.star-o', function () {
    $(this).toggleClass('star-active');
  });

  fetch('/selectDish', { method: 'GET' })
    .then(function (response) {
      if (response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function (data) {
      // document.getElementById('counter').innerHTML = `Button was clicked ${data.length} times`;
      data.forEach(dish => {
        console.log(dish);
        // console.log(`${dish.created_at}`);
        // var crDate = dish.created_at;
        // console.log(`${crDate.getFullYear()}-${crDate.getMonth()+1}-${crDate.getDate()}`)
        var rowNode = myTable.row.add({
          // "select": '',
          // "fav" : '',
          "dishName": `${dish.dishName}`,
          "langName": `${dish.langName}`,
          "dishMenu": `${dish.dishMenu}`,
          "smallDishPrice": `${dish.smallDishPrice}`,
          "largeDishPrice": `${dish.largeDishPrice}`,
          "meat": `${dish.meat}`,
          "size": `${dish.size}`,
          "id": `${dish._id}`,
          "datetime": `${dish.created_at},${dish.updated_at}`,
        }).draw();
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  //  hover to see action buttons
  $("#dataTable tbody").on('mouseenter', '.hover', function () {
    var trIndex = null;
    // trIndex = $(this).parent();
    trIndex = myTable.row(this).node();
    data1 = myTable.row(this).data();
    $(trIndex).find("td:nth-child(7)")
      .html(`
        <span>${data1.smallDishPrice}</span>
        <a href="#" id="copy_btn" value="Copy" data-toggle="modal" data-target="#dishMenuConfirmation"><span class="copy-icon"><i class="fas fa-copy fa-fw"></i></span></a>
        <a href="#" id="edit_btn" value="Edit" data-toggle="modal" data-target="#edit_dishMenuModal"><span class="edit-icon"><i class="far fa-edit fa-fw"></i></span></a>
        <a href="#" id="delete_btn" value="Delete" data-toggle="modal" data-target="#delete_dishMenuConfirmation"><span class="delete-icon"><i class="far fa-trash-alt fa-fw"></i></span></a>
        <br/>
        <span>${data1.largeDishPrice}</span>
      `);

    // click button
    $("#copy_btn, #edit_btn, #delete_btn").click(function () {
      var buttonValue = $(this).attr("value");
      var header = $(".card-header").attr("value");
      $(".heading").text(`${buttonValue} ${header}`);
      $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      $(".edit-submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      $(".danger-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      // $(".confirmation-msg").html(`<div class="text-center">
      // <p>Are you sure want to ${buttonValue}?</p>
      // </div>`);
    });
  });

  // remove button on tr mouseleave
  $("#dataTable tbody").on('mouseleave', '.hover', function () {
    var trIndex = null;
    trIndex = myTable.row(this).node();
    data1 = myTable.row(this).data();

    if (data1["size"] === "Small") {
      $(trIndex).find('td:nth-child(7)').html(`${data1.smallDishPrice} <span class="badge-size-small">S</span> <br/> ${data1.largeDishPrice}`);
    }
    else if (data1["size"] === "Large") {
      $(trIndex).find('td:nth-child(7)').html(`${data1.smallDishPrice} <br/> ${data1.largeDishPrice} <span class="badge-size-large">L</span> `);
    }
    else if (data1['size'] === "Small,Large") {
      $(trIndex).find('td:nth-child(7)').html(`${data1.smallDishPrice} <span class="badge-size-small">S</span> <br/> ${data1.largeDishPrice} <span class="badge-size-large">L</span>`);
    }
  });

  // change input field style in modal
  if ($(".text-box").val() != "") {
    console.log("Have")
    $(".text-box").css('cssText', 'border-bottom: 2px solid #3f51b5 !important;');
  } else {
    console.log("no")
  }

  // close cancel button to reset modal
  $("#dishMenuModal, #edit_dishMenuModal, #delete_dishMenuConfirmation").on("hidden.bs.modal", function () {
    document.getElementById("dishMenu_form").reset();
    $("#edit_dish_id").text('');
    $("#delete_dish_id").text('');
    $("#preview").attr("src", "https://placehold.it/720x540");
    myTable.rows().deselect();
  })

  // upload image
  $(document).on("click", ".browse", function () {
    var file = $(this).parents().find(".file");
    file.trigger("click");
  });
  $('input[type="file"]').change(function (e) {
    var fileName = e.target.files[0].name;
    $("#file").val(fileName);

    var reader = new FileReader();
    reader.onload = function (e) {
      // get loaded data and render thumbnail.
      document.getElementById("preview").src = e.target.result;
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
  });

  // select row to make action
  $('#dataTable tbody').on('click', '#edit_btn', function () {
    $(this).parents('tr').toggleClass("selected")
      .siblings(".selected")
      .removeClass("selected");
    var data = myTable.row($(this).parents('tr')).data();
    console.log(data);
    $("#edit_dish_id").append(`${data["id"]}`)
    document.getElementById("edit_dish_Name").value = data["dishName"];
    document.getElementById("edit_lang_Name").value = data["langName"];
    document.getElementById("edit_small_price").value = data["smallDishPrice"];
    document.getElementById("edit_large_price").value = data["largeDishPrice"];
    // document.getElementById("size").value = data["size"];
    var sizes = data["size"];
    var sizeSelected = sizes.split(",");
    var meat = data["meat"];
    var meatSelected = meat.split(",");
    console.log(sizeSelected, meatSelected);
    // for(var i in sizeSelected) {
    //   var optionVal = sizeSelected[i];
    //   console.log(optionVal);
    //   // $("select#edit_size").find("option[value="+optionVal+"]").attr("selected", "selected");
    //   $('.selectpicker#edit_size').selectpicker('val', sizeSelected);
    //   // console.log($('.selectpicker#edit_size').selectpicker('val',optionVal));
    // }
    $('.selectpicker#edit_size').selectpicker('val', sizeSelected);
    $('.selectpicker#edit_meat').selectpicker('val', meatSelected);
    $('.selectpicker#edit_dish_menu').selectpicker('val', data["dishMenu"]);
    // $('#meat').multiselect({ selectAllValue: 'multiselect-all', enableCaseInsensitiveFiltering: true, enableFiltering: true, maxHeight: '300', buttonWidth: '235', onChange: function (element, checked) { var brands = $('#multiselect1 option:selected'); var selected = []; $(brands).each(function (index, brand) { selected.push([$(this).val()]); }); console.log(selected); } });
    console.log(data);

    // fetch('/dishMenu.html', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     pre_dish_name: document.getElementById("dish_Name").value,
    //     pre_lang_name: document.getElementById('lang_Name').value,
    //     pre_small_dish_price: document.getElementById('small_price').value,
    //     pre_large_dish_price: document.getElementById('large_price').value,
    //     pre_dish_menu: $('#dish_menu').val(),
    //     pre_meat: $('#meat').val(),
    //     pre_size: $('#size').val(),
    //   })
    // })

    $("#cancel").on('click', function () {
      $("#edit_size option[selected]").removeAttr("selected");
      $("#edit_meat option[selected]").removeAttr("selected");
      $("#edit_dish_menu option[selected]").removeAttr("selected")
      myTable.rows().deselect();
    })

    var button = document.getElementById('edit_submit_btn');

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (month < 10) month = "0"+month;
    if (day < 10) day = "0"+day;

    var updated = year+"/"+month+"/"+day+" "+hour+":"+minute+":"+second;

    button.addEventListener('click', function (e) {
      var dishId = $('#edit_dish_id').text();
      var dishName = document.getElementById('edit_dish_Name').value;
      var langName = document.getElementById('edit_lang_Name').value;
      var smallDishPrice = document.getElementById('edit_small_price').value;
      var largeDishPrice = document.getElementById('edit_large_price').value;
      var dishMenu = $('#edit_dish_menu').val();
      var meat = $('#edit_meat').val();
      var size = $('#edit_size').val();
      console.log('button was clicked');

      fetch('/dishMenu.html/edit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          edit_dish_id: dishId,
          edit_dish_name: dishName,
          edit_lang_name: langName,
          edit_small_dish_price: smallDishPrice,
          edit_large_dish_price: largeDishPrice,
          edit_dish_menu: dishMenu,
          edit_meat: meat,
          edit_size: size,
          updated_at: updated,
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
      $("#edit_dishMenuModal").modal("hide");
    });
  })

  $('#dataTable tbody').on('click', '#delete_btn', function () {
    console.log("click delete btn")
    $(this).parents('tr').toggleClass("selected")
      .siblings(".selected")
      .removeClass("selected");
    var data = myTable.row($(this).parents('tr')).data();
    console.log(data);
    $("#delete_dish_id").append(`${data["id"]}`);

    var button = document.getElementById('delete_submit_btn');

    button.addEventListener('click', function (e) {
      fetch('/dishMenu.html/delete', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          delete_dish_id: data["id"],
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
      $("#delete_dishMenuConfirmation").modal("hide");
    })
  });

  var createButton = document.getElementById('submit_btn');
  createButton.addEventListener('click', function (e) {
    $("#dishMenuModal").modal("hide");
    location.reload();
  })

  var editButton = document.getElementById('edit_submit_btn');
  editButton.addEventListener('click', function (e) {
    $("#edit_dishMenuModal").modal("hide");
    location.reload();
  })

  var editButton = document.getElementById('delete_submit_btn');
  editButton.addEventListener('click', function (e) {
    $("#delete_dishMenuConfirmation").modal("hide");
    location.reload();
  })

})
