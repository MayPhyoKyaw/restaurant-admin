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
        first: "&lsaquo;",
        last: "&rsaquo;",
        next: "&raquo;",
        previous: "&laquo;",
      },
    },
    // "order":[[2, asc], [3, asc], [4, asc], [5, asc], [6, asc], [7, asc]],
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
      style: 'os',
      selector: 'td:first-child'
    },
    order: [[ 2, 'asc' ]]
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
