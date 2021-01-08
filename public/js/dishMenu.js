// const MongoClient = require('mongodb').MongoClient;

// Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb+srv://ksp:ksp123@cluster0.tqggl.mongodb.net/<dbname>?retryWrites=true&w=majority";

$(document).ready(function () {

  //select all
  // var  DT1 = $('#dataTable').DataTable();
  $(".selectAll").on( "click", function(e) {
      if ($(this).is( ":checked" )) {
        myTable.rows(  ).select();
      } else {
        myTable.rows(  ).deselect();
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
      { targets: "dish-name-dt", width: "40%"},
      { targets: "lang-name-dt", width: "30%"},
      { targets: "dish-menu-dt", width: "13%"},
      { targets: "small-price-dt", width: "18%"},
      { targets: "large-price-dt", className: "hiddenData" },
      { targets: "meat-dt", className: "hiddenData" },
      { targets: "size-dt", className: "hiddenData" },
    ],
    select: {
      style: 'multi',
      // style: 'os',
      selector: 'td:first-child',
    },
    rowCallback: function(row, data, index) {
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
      if(data[8] === "Small") {
        $(row).find('td:eq(5)').html(data[5] + '<span class="badge-size-small">S</span>')
      }
      else if(data[8] === "Large") {
        $(row).find('td:eq(5)').html(data[5] + '<span class="badge-size-large">L</span>')
      }
      else if(data[8] === "Small, Large") {
        $(row).find('td:eq(5)').html(data[5] + '<span class="badge-size-small">S</span><span class="badge-size-large">L</span>')
      }
      console.log(data[5])
    }
  });

  // $('#dataTable tbody').on('click', 'tr', function () {
  //   if ($(this).hasClass('selected')) {
  //     $(this).removeClass('selected');
  //   }
  //   else {
  //     myTable.$('tr.selected').removeClass('selected');
  //     $(this).addClass('selected');
  //   }
  // })
  // edit and del button
  var trIndex = null;
  var salary = 20000000;
  $("#dataTable tr td").mouseenter(function () {
    trIndex = $(this).parent();
    $(trIndex).find("td:nth-child(6)")
      .html(`
        <span>${salary}</span>
        &nbsp;&nbsp;
        <a href="#" id="copy_btn" value="Copy" data-toggle="modal" data-target="#dishMenuConfirmation"><span class="copy-icon"><i class="fas fa-copy fa-fw"></i></span></a>
        &nbsp;&nbsp;
        <a href="#" id="edit_btn" value="Edit" data-toggle="modal" data-target="#dishMenuModal"><span class="edit-icon"><i class="far fa-edit fa-fw"></i></span></a>
        &nbsp;&nbsp;
        <a href="#" id="delete_btn" value="Delete" data-toggle="modal" data-target="#dishMenuConfirmation"><span class="delete-icon"><i class="far fa-trash-alt fa-fw"></i></span></a>
      `);

    // click button
    $("#copy_btn, #edit_btn, #delete_btn").click(function () {
      var buttonValue = $(this).attr("value");
      var header = $(".card-header").attr("value");
      $(".heading").text(`${buttonValue} ${header}`);
      $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      $(".danger-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      $(".confirmation-msg").html(`<div class="text-center">
      <p>Are you sure want to ${buttonValue}?</p>
      </div>`);
    });
  });

  // remove button on tr mouseleave
  $("#dataTable tr td").mouseleave(function () {
    $(trIndex).find('td:nth-child(6)').html(`${salary}`);
  });

  // change input field style in modal
  if ($(".text-box").val() != "") {
    console.log("Have")
    $(".text-box").css('cssText', 'border-bottom: 2px solid #3f51b5 !important;');
  } else {
    console.log("no")
  }

  // close cancel button to reset modal
  $("#dishMenuModal").on("hidden.bs.modal", function () {
    document.getElementById("dishMenu_form").reset();
    // $(".filter-option-inner-inner").text(document.getElementById("dish_menu").title);
    $("#preview").attr("src","https://placehold.it/720x540");

  })

  // upload image
  $(document).on("click", ".browse", function() {
    var file = $(this).parents().find(".file");
    file.trigger("click");
  });
  $('input[type="file"]').change(function(e) {
    var fileName = e.target.files[0].name;
    $("#file").val(fileName);

    var reader = new FileReader();
    reader.onload = function(e) {
      // get loaded data and render thumbnail.
      document.getElementById("preview").src = e.target.result;
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
  });

})
