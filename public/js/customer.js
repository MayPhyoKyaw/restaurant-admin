// $('#dataTable').DataTable({

//   columnDefs: [{
//   orderable: false,
//   className: 'select-checkbox',
//   targets: 0
//   }],
//   select: {
//   style: 'os',
//   selector: 'td:first-child'
//   }
//   });
$(document).ready(function() {
  var myTable = $('#dataTable').DataTable({
    replace: true,
    fixedColumns: true,
    responsive: true,
    pageLength: 10,
    language: {
      processing: "Processing...",
      loadingRecords: "Loading...",
      paginate: {
        first: "<",
        last: ">",
        next: ">>",
        previous: "<<",
      },
    },
    "columnDefs": [{
        "className": 'select-checkbox',
        "targets": 0,
        "orderable": false,
      },{
        // "width": '%',
        "sClass": 'options',
      }
    ],
    select: {
      style: 'multi',
      // selector: 'td:first-child'
    },
    order: [[ 1, 'asc' ]]
  });

  var trIndex = null;
  var salary = 20000000;
  $("#dataTable tr td").mouseenter(function () {
    trIndex = $(this).parent();
    $(trIndex).find("td:last-child")
      .html(`
        <span>${salary}</span>
        &nbsp;&nbsp;
        <a href="#"><i class="far fa-edit"></i></a>
        &nbsp;&nbsp;
        <a href="#"><i class="far fa-trash-alt"></i></a>
        &nbsp;&nbsp;
        <a href="#"><i class="far fa-plus-square"></i></a>
      `);
  });

  // remove button on tr mouseleave
  $("#dataTable tr td").mouseleave(function () {
    $(trIndex).find('td:last-child').html(`${salary}`);
  });
})
