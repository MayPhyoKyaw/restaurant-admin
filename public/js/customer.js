$(document).ready(function () {

  // create data
  $("#create_button, #detail_button, #edit_button, #delete_button, #detail_btn").click(function () {
    var buttonValue = $(this).attr("value")
    console.log(buttonValue)
    $(".heading").text(`${buttonValue} Customer`);
    $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);

    // if (buttonValue === "Create") {
    //   $(".submit-button").click(function () {
    //     console.log("Yah")
    //     // var { MongoClient } = require("mongodb");
    //     var dbKey = require("../route/database/dangerousKey.json");
    //     console.log(dbKey)

    //     // // Replace the following with your Atlas connection string
    //     // var url = dbKey.key;
    //     // var client = new MongoClient(url);

    //     // // The database to use
    //     // var dbName = "test-kk";

    //     // async function run() {
    //     //   try {
    //     //     await client.connect();
    //     //     console.log("Connected correctly to server");
    //     //     var db = client.db(dbName);
    //     //     // Use the collection "people"
    //     //     var col = db.collection("people");
    //     //     // Construct a document
    //     //     var personDocument = {
    //     //       "docid": "_id",
    //     //       "name": { "first": "KaungSett", "last": "Paing" },
    //     //       "birth": new Date(1912, 5, 23), // June 23, 191
    //     //       "work": ["IT", "translate", "Engineer"],
    //     //       "views": 1250000
    //     //     }
    //     //     // Insert a single document, wait for promise so we can read it back
    //     //     var p = await col.insertOne(personDocument);
    //     //     // Find one document
    //     //     var myDoc = await col.findOne();
    //     //     // Print to the console
    //     //     console.log(myDoc);
    //     //   } catch (err) {
    //     //     console.log(err.stack);
    //     //   }

    //     //   finally {
    //     //     await client.close();
    //     //   }
    //     // }
    //     // run().catch(console.dir);
    //   })
    // }
  })

  $(".detail_btn").click(function () {
    console.log("Yahh")
  })

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
        <a href="#" data-toggle="modal" data-target="#customerModal"><span class="detail-icon"><i class="far fa-eye fa-fw"></i></span></a>
        &nbsp;&nbsp;
        <a href="#" data-toggle="modal" data-target="#customerModal"><span class="edit-icon"><i class="far fa-edit fa-fw"></i></span></a>
        &nbsp;&nbsp;
        <a href="#" data-toggle="modal" data-target="#customerModal"><span class="delete-icon"><i class="far fa-trash-alt fa-fw"></i></span></a>
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
  $("#customerModal").on("hidden.bs.modal", function () {
    document.getElementById("customer_form").reset();
  })

})

