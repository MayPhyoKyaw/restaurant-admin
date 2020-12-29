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
        // "targets": -2,
        "orderable": false,
        width: '4.5%',
        "sClass": 'options'
    }]
  });

  var trIndex = null;
  var salary = 200000;
  $("#dataTable tr td").mouseenter(function () {
    trIndex = $(this).parent();
    $(trIndex).find("td:last-child")
      .html(`<a href="#"><i class="far fa-edit"></i></a>
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
  // $("#dataTable tr").hover(
  //   function(){
  //     $(this).append(
  //       $("<span><a href='#'><i class='far fa-edit'></i></a>&nbsp;&nbsp;<a href='#'><i class='far fa-trash-alt'></i></a></span>")
  //     );
  //   },
  //   function(){
  //     $(this).find("span").last().remove();
  //   }
  // );
})
