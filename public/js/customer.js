$(document).ready(function() {

  // create data
  $("#create_button, #detail_button, #edit_button, #delete_button").click(function() {
    var buttonValue = $(this).attr("value")
    console.log(buttonValue)
      $(".heading").text(`${buttonValue} Customer`);
      // $(".submit-button").text(`${buttonValue}`);
      $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
  })

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
        "targets": [0,1],
        "orderable": false,
        "width": "1%",
      },
    ],
    select: {
      style: 'multi',
      // style: 'os',
      selector: 'td:first-child'
    },
    order: [[ 2, 'asc' ]]
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
        <a href="#"><span class="detail-icon"><i class="far fa-eye fa-fw"></i></span></a>
        &nbsp;&nbsp;
        <a href="#"><span class="edit-icon"><i class="far fa-edit fa-fw"></i></span></a>
        &nbsp;&nbsp;
        <a href="#"><span class="delete-icon"><i class="far fa-trash-alt fa-fw"></i></span></a>

      `);
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
  $("#customerModal").on("hidden.bs.modal", function() {
    document.getElementById("customer_form").reset();
  })

})