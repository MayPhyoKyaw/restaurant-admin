// const MongoClient = require('mongodb').MongoClient;

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
      { targets: "dish-name-dt", data: "dishName", className: "text", width: "40%" },
      { targets: "lang-name-dt", data: "langName", className: "text", width: "30%" },
      { targets: "dish-menu-dt", data: "dishMenu", className: "text", width: "13%" },
      { targets: "small-price-dt", data: "smallDishPrice", className: "text", width: "18%" },
      { targets: "large-price-dt", data: "largeDishPrice", className: "hiddenData"},
      { targets: "meat-dt", data: "meat", className: "hiddenData"},
      { targets: "size-dt", data: "size", className: "hiddenData"},
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
      // console.log("Data => " + data)
      if (data[7] === "Pork") {
        $(row).find('td:eq(3)').html(data[3] + '<span class="badge-pork">Pork</span>')
      }
      else if (data[7] === "Chicken") {
        $(row).find('td:eq(3)').html(data[3] + '<span class="badge-chicken">Chicken</span>')
      }
      else if (data[7] === "Seafood") {
        $(row).find('td:eq(3)').html(data[3] + '<span class="badge-seafood">Seafood</span>')
      }
      else if (data[7] === "Beef") {
        $(row).find('td:eq(3)').html(data[3] + '<span class="badge-beef">Beef</span>')
      }
      if (data[8] === "Small") {
        $(row).find('td:eq(5)').html(data[5] + '<span class="badge-size-small">S</span>')
      }
      else if (data[8] === "Large") {
        $(row).find('td:eq(5)').html(data[5] + '<span class="badge-size-large">L</span>')
      }
      else if (data[8] === "Small, Large") {
        $(row).find('td:eq(5)').html(data[5] + '<span class="badge-size-small">S</span><span class="badge-size-large">L</span>')
      }
      console.log(data[5])
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
        }).draw();
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  // var rowData = myTable.row();
  // console.log(rowData);
  $("#dataTable tbody").on('mouseenter', '.hover', function () {
    var trIndex = null;
    // trIndex = $(this).parent();
    trIndex = myTable.row(this).node();
    // console.log(trIndex);
    data1 = myTable.row(this).data();
    // console.log(data1.smallDishPrice);
    $(trIndex).find("td:nth-child(6)")
      .html(`
        <span>${data1.smallDishPrice}</span>
        &nbsp;&nbsp;
        <a href="#" id="copy_btn" value="Copy" data-toggle="modal" data-target="#dishMenuConfirmation"><span class="copy-icon"><i class="fas fa-copy fa-fw"></i></span></a>
        &nbsp;&nbsp;
        <a href="#" id="edit_btn" value="Edit" data-toggle="modal" data-target="#edit_dishMenuModal"><span class="edit-icon"><i class="far fa-edit fa-fw"></i></span></a>
        &nbsp;&nbsp;
        <a href="#" id="delete_btn" value="Delete" data-toggle="modal" data-target="#dishMenuConfirmation"><span class="delete-icon"><i class="far fa-trash-alt fa-fw"></i></span></a>
      `);

    // click button
    $("#copy_btn, #edit_btn, #delete_btn").click(function () {
      var buttonValue = $(this).attr("value");
      var header = $(".card-header").attr("value");
      $(".heading").text(`${buttonValue} ${header}`);
      $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      $(".edit-submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      $(".danger-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      $(".confirmation-msg").html(`<div class="text-center">
      <p>Are you sure want to ${buttonValue}?</p>
      </div>`);
    });
  });

  // remove button on tr mouseleave
  $("#dataTable tbody").on('mouseleave', '.hover', function () {
    var trIndex = null;
    trIndex = myTable.row(this).node();
    data1 = myTable.row(this).data()
    $(trIndex).find('td:nth-child(6)').html(`${data1.smallDishPrice}`);
  });

  // change input field style in modal
  if ($(".text-box").val() != "") {
    console.log("Have")
    $(".text-box").css('cssText', 'border-bottom: 2px solid #3f51b5 !important;');
  } else {
    console.log("no")
  }

  // close cancel button to reset modal
  $("#dishMenuModal, #edit_dishMenuModal").on("hidden.bs.modal", function () {
    document.getElementById("dishMenu_form").reset();
    // $(".filter-option-inner-inner").text(document.getElementById("dish_menu").title);
    $("#preview").attr("src", "https://placehold.it/720x540");
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
    $("#size option[value='Small'").attr("selected", "selected");
    // var size = $("select#size option:selected").val(`${data.size}`);
    console.log(size)
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

    var button = document.getElementById('edit_submit_btn');

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

  var createButton = document.getElementById('submit_btn');
  createButton.addEventListener('click', function (e) {
    $("#dishMenuModal").modal("hide");
    location.reload();
  })

  $('#dataTable .star-o').on('click', function () {
    $(this).toggleClass('star-active');
  });
  $('select').selectpicker();

})
