$(document).ready(function () {

  //select all
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
      { targets: "dish-name-dt", data: "dishName", className: "text", width: "30%" },
      { targets: "lang-name-dt", data: "langName", className: "text", width: "35%" },
      { targets: "dish-menu-dt", data: "dishMenu", className: "text", width: "11%" },
      {
        targets: "datetime-dt", data: "datetime", className: "text", width: "15%",
        render: function (data) {
          // console.log(data)
          var datetime = data.split(",");
          // console.log(datetime[1]);
          if (datetime[1] === "undefined") {
            return (`<span><i class="fas fa-plus-circle fa-fw publish-icon"></i> ${datetime[0]}</span>`)
          }
          else {
            return (`<span><i class="fas fa-plus-circle fa-fw publish-icon"></i> ${datetime[0]}</span><br/><span><i class="fas fa-pen fa-fw publish-icon"></i> ${datetime[1]}`)
          }
        }
      },
      { targets: "action-btn-dt", data: null, width: "8%", orderable: false, searchable: false, defaultContent: "" },
      // { targets: "small-price-dt", data: "smallDishPrice", className: "text", width: "19%" },
      // { targets: "large-price-dt", data: "largeDishPrice", className: "hiddenData" },
      { targets: "meat-dt", data: "meat", className: "hiddenData" },
      // { targets: "size-dt", data: "size", className: "hiddenData" },
      { targets: "dish-id-dt", data: "id", className: "hiddenData", searchable: false },
    ],
    order: [[5, 'desc']],
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
      // var meatBadge = data["meat"].replace(/,/g, ' ');
      // $(row).find('td:eq(3)').html(data["langName"] + `<span class="badges">${meatBadge}</span>`)
      // var replace1 = $(row).find('td:eq(3)').html().replace('<span class="badges">','');
      // var replace2 = replace1.replace('</span>','');
      // if (replace2.includes("Chicken")) {
      //   console.log(replace2.split("Chicken",""))
      // }
      // console.log(replace2)
      var meatBadge = data["meat"].split(",");
      // console.log(meatBadge);
      meatBadge.forEach(badge => {
        // console.log(badge);
        $(row).find('td:eq(3)').html((data["langName"] + `<span class="${badge}">${badge}</span>`))
      });

      // // for dish size
      // if (data["size"] === "Small") {
      //   $(row).find('td:eq(6)').html(data["smallDishPrice"] + '<span class="badge-size-small">S</span> <br/>' + data["largeDishPrice"])
      // }
      // else if (data["size"] === "Large") {
      //   $(row).find('td:eq(6)').html(data["smallDishPrice"] + '<br/>' + data["largeDishPrice"] + '<span class="badge-size-large">L</span> ')
      // }
      // else if (data['size'] === "Small,Large") {
      //   $(row).find('td:eq(6)').html(data["smallDishPrice"] + '<span class="badge-size-small">S</span> </br>' + data["largeDishPrice"] + '<span class="badge-size-large">L</span>')
      // }
      // var sizeBadge = data["size"].split(",");
      // sizeBadge.forEach(sizebadge => {
      //   $(row).find('td:eq(3)').append(`<span class="badge-${sizebadge}>S</span>`)
      // })
      var dMmenuBadge = data["dishMenu"].split(",");
      dMmenuBadge.forEach(dbadge => {
        console.log(dbadge)
        $(row).find('td:eq(4)').html(`<span class="badge badge-light badge-${dbadge}">${dbadge}</span>`)
      })
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
        // console.log(`${dish.created_at}`);
        // var crDate = dish.created_at;
        // console.log(`${crDate.getFullYear()}-${crDate.getMonth()+1}-${crDate.getDate()}`)
        var rowNode = myTable.row.add({
          // "select": '',
          // "fav" : '',
          "dishName": `${dish.dishName}`,
          "langName": `${dish.langName}`,
          "dishMenu": `${dish.dishMenu}`,
          // "smallDishPrice": `${dish.smallDishPrice}`,
          // "largeDishPrice": `${dish.largeDishPrice}`,
          "meat": `${dish.meat}`,
          // "size": `${dish.size}`,
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
        <a href="#" id="copy_btn" value="Copy" data-toggle="modal" data-target="#copy_dishMenuConfirmation"><span class="copy-icon"><i class="fas fa-copy fa-fw"></i></span></a>
        <a href="#" id="edit_btn" value="Edit" data-toggle="modal" data-target="#edit_dishMenuModal"><span class="edit-icon"><i class="far fa-edit fa-fw"></i></span></a>
        <a href="#" id="delete_btn" value="Delete" data-toggle="modal" data-target="#delete_dishMenuConfirmation"><span class="delete-icon"><i class="far fa-trash-alt fa-fw"></i></span></a>
      `);

    // click button
    $("#copy_btn, #edit_btn, #delete_btn").click(function () {
      var buttonValue = $(this).attr("value");
      var header = $(".card-header").attr("value");
      $(".heading").text(`${buttonValue} ${header}`);
      $(".submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      $(".edit-submit-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
      $(".danger-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
    });
  });

  // remove button on tr mouseleave
  $("#dataTable tbody").on('mouseleave', '.hover', function () {
    var trIndex = null;
    trIndex = myTable.row(this).node();
    data1 = myTable.row(this).data();

    $(trIndex).find('td:nth-child(7)').html(``);
    // console.log(trIndex);
    // if (data1["size"] === "Small") {
    //   $(trIndex).find('td:nth-child(7)').html(`${data1.smallDishPrice} <span class="badge-size-small">S</span> <br/> ${data1.largeDishPrice}`);
    // }
    // else if (data1["size"] === "Large") {
    //   $(trIndex).find('td:nth-child(7)').html(`${data1.smallDishPrice} <br/> ${data1.largeDishPrice} <span class="badge-size-large">L</span> `);
    // }
    // else if (data1['size'] === "Small,Large") {
    //   $(trIndex).find('td:nth-child(7)').html(`${data1.smallDishPrice} <span class="badge-size-small">S</span> <br/> ${data1.largeDishPrice} <span class="badge-size-large">L</span>`);
    // }
  });

  // change input field style in modal
  if ($(".text-box").val() != "") {
    console.log("Have")
    $(".text-box").css('cssText', 'border-bottom: 2px solid #3f51b5 !important;');
  } else {
    console.log("no")
  }

  // close cancel button to reset modal
  $("#dishMenuModal, #edit_dishMenuModal, #delete_dishMenuConfirmation, #copy_dishMenuConfirmation").on("hidden.bs.modal", function () {
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
    // document.getElementById("edit_small_price").value = data["smallDishPrice"];
    // document.getElementById("edit_large_price").value = data["largeDishPrice"];
    // document.getElementById("size").value = data["size"];
    // var sizes = data["size"];
    // var sizeSelected = sizes.split(",");
    var meat = data["meat"];
    var meatSelected = meat.split(",");
    // console.log(sizeSelected, meatSelected);
    // for(var i in sizeSelected) {
    //   var optionVal = sizeSelected[i];
    //   console.log(optionVal);
    //   // $("select#edit_size").find("option[value="+optionVal+"]").attr("selected", "selected");
    //   $('.selectpicker#edit_size').selectpicker('val', sizeSelected);
    //   // console.log($('.selectpicker#edit_size').selectpicker('val',optionVal));
    // }
    // $('.selectpicker#edit_size').selectpicker('val', sizeSelected);
    $('.selectpicker#edit_meat').selectpicker('val', meatSelected);
    $('.selectpicker#edit_dish_menu').selectpicker('val', data["dishMenu"]);
    // $('#meat').multiselect({ selectAllValue: 'multiselect-all', enableCaseInsensitiveFiltering: true, enableFiltering: true, maxHeight: '300', buttonWidth: '235', onChange: function (element, checked) { var brands = $('#multiselect1 option:selected'); var selected = []; $(brands).each(function (index, brand) { selected.push([$(this).val()]); }); console.log(selected); } });
    // console.log(data);

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
      // $("#edit_size option[selected]").removeAttr("selected");
      $("#edit_meat option[selected]").removeAttr("selected");
      $("#edit_dish_menu option[selected]").removeAttr("selected")
      myTable.rows().deselect();
    })

    var button = document.getElementById('edit_submit_btn');

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;

    var updated = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;

    button.addEventListener('click', function (e) {
      var dishId = $('#edit_dish_id').text();
      var dishName = document.getElementById('edit_dish_Name').value;
      var langName = document.getElementById('edit_lang_Name').value;
      // var smallDishPrice = document.getElementById('edit_small_price').value;
      // var largeDishPrice = document.getElementById('edit_large_price').value;
      var dishMenu = $('#edit_dish_menu').val();
      var meat = $('#edit_meat').val();
      // var size = $('#edit_size').val();
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
          // edit_small_dish_price: smallDishPrice,
          // edit_large_dish_price: largeDishPrice,
          edit_dish_menu: dishMenu,
          edit_meat: meat,
          // edit_size: size,
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

  // delete btn on datatable
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

  // copy btn on datatable
  $('#dataTable tbody').on('click', '#copy_btn', function () {
    console.log("click copy btn")
    $(this).parents('tr').toggleClass("selected")
      .siblings(".selected")
      .removeClass("selected");
    var data = myTable.row($(this).parents('tr')).data();
    console.log(data);
    // $("#delete_dish_id").append(`${data["id"]}`);

    var button = document.getElementById('copy_submit_btn');

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;

    var created = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;

    button.addEventListener('click', function (e) {
      fetch('/dishMenu.html/copy', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // delete_dish_id: data["id"],
          copy_dish_name: data["dishName"],
          copy_lang_name: data["langName"],
          // copy_small_dish_price: data["smallDishPrice"],
          // copy_large_dish_price: data["largeDishPrice"],
          copy_dish_menu: data["dishMenu"],
          copy_meat: data["meat"],
          // copy_size: data["size"],
          created_at: created,
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
      $("#copy_dishMenuConfirmation").modal("hide");
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

  var deleteButton = document.getElementById('delete_submit_btn');
  deleteButton.addEventListener('click', function (e) {
    $("#delete_dishMenuConfirmation").modal("hide");
    location.reload();
  })

  var copyButton = document.getElementById('copy_submit_btn');
  copyButton.addEventListener('click', function (e) {
    $("#delete_dishMenuConfirmation").modal("hide");
    location.reload();
  })

  // delete data
  $("#delete_button").click(function () {
    var buttonValue = $(this).attr("value");
    var header = $(".card-header").attr("value");
    $(".heading").text(`${buttonValue} ${header}`);
    $(".danger-button").html(`<i class="fas fa-check fa-fw"></i>${buttonValue}`);
    var delRowsSelected = myTable.rows('.selected').data().length;
    $(".confirmation-msg").html(`<div class="text-center">
      <p>Are you sure want to Delete ${delRowsSelected} selected rows?</p>
    </div>`);

    var delDATAs = myTable.rows('.selected').data();
    console.log(delDATAs);
    var delIDArr = [];
    delDATAs.filter(delIDs => {
      console.log(delIDs.id)
      delIDArr.push(delIDs.id)
      // return (delIDs.id !== null);
    });
    console.log(delIDArr)
    // console.log("delID" + delID)
    // var dels = delDATAs.map(delids => {
    //   // console.log(delids.id);
    //   return delids.id
    // })
    // console.log("dels => " + dels)
    // // for(i=0; i<dels.length; i++){
    // //   console.log(dels[i])
    // // }
    // function del(d){
    //   var d1, i;
    //   console.log(d[0], d[1], d.length)
    //   for(i=0; i<d.length; i++){
    //     console.log(d[i], i)
    //     d1 = d[i];
    //     return d1;
    //   }
    // }
    // var delIDs = del(dels);
    // // console.log(delIDs)
    // // var dels = delDATAs.split(",");
    // // console.log(typeof(delDATAs));
    // // console.log(delID);
    // // console.log(delIDs[0].id, delIDs[1].id);

    var button = document.getElementById('delete_mul_submit_btn');

    button.addEventListener('click', function (e) {
      fetch('/dishMenu.html/deleteMul', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          delete_mul_dish_id: delIDArr,
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
      $("#deleteMul_dishMenuConfirmation").modal("hide");
      location.reload();
    })
  })

  // click action button to make function
  $("#edit_button").click(function () {
    var sel = myTable.rows('.selected').data().length;
    if (sel > 1) {
      // $("#edit_dishMenuModal").modal("hide");
      $("#editWarning").modal("show");
      $(".warning-msg").html(`
        <div class="text-center">
          <p>You are selected more than one rows to edit!!!</p>
          <p>Please Select A Row Again.</p>
        </div>`
      );
    }
    else if (sel == 0) {
      $("#editWarning").modal("show");
      $(".warning-msg").html(`
        <div class="text-center">
          <p>You need to select a row to edit!!!</p>
          <p>Please Select A Row.</p>
        </div>`
      );
    }
    else {
      var selected = myTable.row('.selected').data();
      console.log(selected.id);
      $("#edit_dishMenuModal").modal("show");

      $("#edit_dish_id").append(`${selected.id}`)
      document.getElementById("edit_dish_Name").value = selected.dishName;
      document.getElementById("edit_lang_Name").value = selected.langName;
      // document.getElementById("edit_small_price").value = selected.smallDishPrice;
      // document.getElementById("edit_large_price").value = selected.largeDishPrice;
      // document.getElementById("size").value = data["size"];
      // var sizes = selected.size;
      // var sizeSelected = sizes.split(",");
      var meat = selected.meat;
      var meatSelected = meat.split(",");
      console.log(meatSelected);

      // $('.selectpicker#edit_size').selectpicker('val', sizeSelected);
      $('.selectpicker#edit_meat').selectpicker('val', meatSelected);
      $('.selectpicker#edit_dish_menu').selectpicker('val', selected.dishMenu);
      // $('#meat').multiselect({ selectAllValue: 'multiselect-all', enableCaseInsensitiveFiltering: true, enableFiltering: true, maxHeight: '300', buttonWidth: '235', onChange: function (element, checked) { var brands = $('#multiselect1 option:selected'); var selected = []; $(brands).each(function (index, brand) { selected.push([$(this).val()]); }); console.log(selected); } });
      // console.log(data);

      $("#cancel").on('click', function () {
        // $("#edit_size option[selected]").removeAttr("selected");
        $("#edit_meat option[selected]").removeAttr("selected");
        $("#edit_dish_menu option[selected]").removeAttr("selected")
        myTable.rows().deselect();
      })

      var button = document.getElementById('edit_submit_btn');

      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      if (minute < 10) minute = "0" + minute;
      if (second < 10) second = "0" + second;

      var updated = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;

      button.addEventListener('click', function (e) {
        var dishId = $('#edit_dish_id').text();
        var dishName = document.getElementById('edit_dish_Name').value;
        var langName = document.getElementById('edit_lang_Name').value;
        // var smallDishPrice = document.getElementById('edit_small_price').value;
        // var largeDishPrice = document.getElementById('edit_large_price').value;
        var dishMenu = $('#edit_dish_menu').val();
        var meat = $('#edit_meat').val();
        // var size = $('#edit_size').val();
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
            // edit_small_dish_price: smallDishPrice,
            // edit_large_dish_price: largeDishPrice,
            edit_dish_menu: dishMenu,
            edit_meat: meat,
            // edit_size: size,
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
    }
  })

  // click copy button to make function
  $("#copy_button").click(function () {
    var sel = myTable.rows('.selected').data().length;
    if (sel > 1) {
      $("#copyWarning").modal("show");
      $(".warning-msg").html(`
        <div class="text-center">
          <p>You are selected more than one rows to copy!!!</p>
          <p>Please Select A Row Again.</p>
        </div>`
      );
    }
    else if (sel == 0) {
      $("#copyWarning").modal("show");
      $(".warning-msg").html(`
        <div class="text-center">
          <p>You need to select a row to edit!!!</p>
          <p>Please Select A Row.</p>
        </div>`
      );
    }
    else {
      var selected = myTable.row('.selected').data();
      console.log(selected);

      $("#cancel").on('click', function () {
        myTable.rows().deselect();
      })

      var button = document.getElementById('copy_submit_btn');

      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      if (minute < 10) minute = "0" + minute;
      if (second < 10) second = "0" + second;

      var created = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;

      button.addEventListener('click', function (e) {
        console.log('button was clicked');

        fetch('/dishMenu.html/copy', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            copy_dish_name: selected.dishName,
            copy_lang_name: selected.langName,
            // copy_small_dish_price: selected.smallDishPrice,
            // copy_large_dish_price: selected.largeDishPrice,
            copy_dish_menu: selected.dishMenu,
            copy_meat: selected.meat,
            // copy_size: selected.size,
            created_at: created,
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
        $("#copy_dishMenuConfirmation").modal("hide");
      });
    }
  })
})
