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
    "columnDefs": [
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
    ],
    select: {
      style: 'multi',
      // style: 'os',
      selector: 'td:first-child'
    },
    order: [[2, 'asc']]
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
    $(trIndex).find("td:last-child")
      .html(`
        <span>${salary}</span>
        &nbsp;&nbsp;
        <a href="#" id="copy_btn" value="Copy" data-toggle="modal" data-target="#customerConfirmation"><span class="copy-icon"><i class="fas fa-copy fa-fw"></i></span></a>
        &nbsp;&nbsp;
        <a href="#" id="edit_btn" value="Edit" data-toggle="modal" data-target="#customerModal"><span class="edit-icon"><i class="far fa-edit fa-fw"></i></span></a>
        &nbsp;&nbsp;
        <a href="#" id="delete_btn" value="Delete" data-toggle="modal" data-target="#customerConfirmation"><span class="delete-icon"><i class="far fa-trash-alt fa-fw"></i></span></a>
      `);

    // click button
    $("#copy_btn, #edit_btn, #delete_btn").click(function () {
      var buttonValue = $(this).attr("value");
      $(".heading").text(`${buttonValue} Customer`);
      $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      $(".danger-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      $(".confirmation-msg").html(`<div class="text-center">
      <p>Are you sure want to ${buttonValue}?</p>
      </div>`);
    })
  });

  // remove button on tr mouseleave
  $("#dataTable tr td").mouseleave(function () {
    $(trIndex).find('td:last-child').html(`${salary}`);
  });

  // change input field style in modal
  if ($(".text-box").val() != "") {
    console.log("Have")
    $(".text-box").css('cssText', 'border-bottom: 2px solid #3f51b5 !important;');
  } else {
    console.log("no")
  }

  // close cancel button to reset modal
  $("#customerModal").on("hidden.bs.modal", function () {
    document.getElementById("customer_form").reset();
  })

})