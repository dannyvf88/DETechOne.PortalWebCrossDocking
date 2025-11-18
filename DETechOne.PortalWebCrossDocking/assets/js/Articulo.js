function GetItem() {
    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ ItemCode: document.getElementById('txtItemCode').value }),
        url: "WFArticulo.aspx/GetItems",
        success: function (response) {

            if (response.d.success) {
                var data = JSON.parse(response.d.message);

                document.getElementById("txtItemCode").value = "";
                

                data.forEach(function (item) {
                    // Si la solicitud es exitosa, llenamos los campos con los valores
                    document.getElementById("txtItemCodee").value = item.ItemCode;
                    document.getElementById("txtItemName").value = item.ItemName;                     
                    //document.getElementById("txtItemsGroupCode").value = "FIS-GAS-1";// item.GroupCode;

                    GetItemsGroupCode(item.GroupCode);

                    //const comboBox = document.getElementById("txtItemsGroupCode");

                    //console.log(comboBox.options.length);

                    //for (let i = 0; i < comboBox.options.length; i++) {
                    //    console.log(comboBox.options[i].value);
                    //    if (comboBox.options[i].text === "Texto Visible") {
                    //        comboBox.selectedIndex = i;
                    //        break;
                    //    }
                    //}
                    //document.getElementById("txtItemsGroupCode").selectId = 1;
                });


                GetItemsBarCodeListByItemCode();

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.d.message
                });
            }
        },
        error: function (request, message, error) {
            Swal.fire({
                icon: "error",
                title: "Error al consultar la información",
                text: request.responseJSON.d.message
            });
        }
    });
}

function AgregarOpcion(selectId, valor, texto) {
    const select = document.getElementById(selectId);
    const opcion = document.createElement("option");
    opcion.value = valor;
    opcion.text = texto;
    select.appendChild(opcion);
}

function GetItemsGroupCode(selectedValue) {
    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ ItemCode: document.getElementById('txtItemCode').value }),
        url: "WFArticulo.aspx/GetItemsGroupCodeList",
        success: function (response) {

            if (response.d.success) {
                var data = JSON.parse(response.d.message);
                var $cmbUsuarios = $('#txtItemsGroupCode');

                $cmbUsuarios.empty();
                $cmbUsuarios.append('<option value="SE">Seleccione</option>');

                data.forEach(function (item) {
                    //console.log('<option value="' + item.Code + '">' + item.Code + '</option>');
                    $cmbUsuarios.append('<option value="' + item.Code + '">' + item.Name + '</option>');
                });


                debugger;
                $('#txtItemsGroupCode').val(selectedValue);                
                

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.d.message
                });
            }
        },
        error: function (request, message, error) {
            Swal.fire({
                icon: "error",
                title: "Error al consultar la Orden",
                text: request.responseJSON.d.message
            });

            //document.getElementById("btnContinuar").disabled = true;
            //document.getElementById("txtDocNum").value = "";
            //document.getElementById("txtStatus").value = "";
            //document.getElementById("txtCardName").value = "";
            //document.getElementById("txtItems").value = "";
            //document.getElementById("txtAlmacen").value = "";
            //document.getElementById("txtDate").value = "";
        }
    });
}

function UpdateItemInformation() {

    var selectedItemCode = document.getElementById("txtItemCodee");
    var selectedItemsGroupCode = document.getElementById("txtItemsGroupCode");


    $.ajax({
        type: "POST",
        url: "WFArticulo.aspx/UpdateItemInformation",
        data: '{ ItemCode: "' + selectedItemCode.value + '",  ItemsGroupCode: "' + selectedItemsGroupCode.value + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            Swal.Close();
            Swal.fire({
                icon: "Información", title: "Información", text: "Datos actualizados"
            });
            

        },
        error: function (response) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: response.responseText
            });
        }
    });
}

function GetItemsBarCodeListByItemCode() {
    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ ItemCode: document.getElementById('txtItemCodee').value }),
        url: "WFArticulo.aspx/GetItemsBarCodeListByItemCode",
        success: function (response) {
            debugger;
            if (response.d.success) {
                // Obtener el JSON desde el Literal (como cadena de texto)
                var jsonData = response.d.message;

                // Parsear el JSON
                var data = JSON.parse(jsonData);

                // Obtener la referencia de la tabla
                var table = document.getElementById("datatable1").getElementsByTagName('tbody')[0];

                // Limpiar el tbody existente
                table.innerHTML = "";
                var selectedItem = null;


                // Llenar la tabla con los datos del JSON
                data.forEach(function (item) {
                    // Insertar una nueva fila
                    var row = table.insertRow(); 

                    // Insertar las celdas y llenar con los datos

                    //Code,
                    var cell1 = row.insertCell(0);
                    cell1.innerHTML = item.Code;

                    //EsquemaEmpaque,
                    var cell2 = row.insertCell(1);
                    cell2.innerHTML = item.EsquemaEmpaque;

                    //UoM,
                    var cell3 = row.insertCell(2);
                    cell3.innerHTML = item.UoM;

                    //CodigoBarras
                    var cell4 = row.insertCell(3);
                    cell4.innerHTML = item.CodigoBarras;

                    //Editar
                    var cell5 = row.insertCell(4);
                    var buttonEditItem = document.createElement("button");
                    buttonEditItem.className = "btn btn-light btn-burger";
                    buttonEditItem.style.width = "30px";
                    buttonEditItem.style.height = "30px";
                    buttonEditItem.style.padding = "0";
                    buttonEditItem.style.display = "flex";
                    buttonEditItem.style.justifyContent = "center";
                    buttonEditItem.style.alignItems = "center";

                    var icon = document.createElement("i");
                    icon.className = "material-icons";
                    icon.style.fontSize = "16px";
                    icon.textContent = "edit";

                    buttonEditItem.appendChild(icon);

                    cell5.appendChild(buttonEditItem);
                    row.appendChild(cell5);
                    buttonEditItem.addEventListener("click", function () {
                        debugger;
                        document.getElementById("exampleModalBoxedItems").innerText = "Editar código de barras";
                        document.getElementById("txtCode").value = item.Code;
                        document.getElementById("txtItmCode").value = item.ItemCode;
                        document.getElementById("txtItmUnidadMedida").value = item.UoM;
                        document.getElementById("txtItmCodigoBarras").value = item.CodigoBarras;
                        //
                        document.getElementById("txtUoMCode").value = item.UoMCode;
                        document.getElementById("EsquemaEmpaqueCode").value = item.EsquemaEmpaqueCode;
                        const successModal = new bootstrap.Modal(document.getElementById('exampleModalUoMBBarCode'));
                        successModal.show();
                    });

                    row.addEventListener("click", function () {
                        // Deseleccionar otras filas
                        var selectedRow = document.querySelector(".selected-row");
                        if (selectedRow) {
                            selectedRow.classList.remove("selected-row");
                        }

                        // Seleccionar la fila actual
                        row.classList.add("selected-row");
                        selectedItem = item;

                    });

                });

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.d.message
                });
            }
        },
        error: function (request, message, error) {
            Swal.fire({
                icon: "error",
                title: "Error al consultar la Orden",
                text: request.responseJSON.d.message
            });
        }
    });
}

function UpdateItemsBarCode() {
    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        //Code, BarCode, EsqItemRel, UoMCode,  UoMDescripcion
        data: JSON.stringify({
            Code: document.getElementById('txtCode').value,
            BarCode: document.getElementById('txtItmCodigoBarras').value,
            EsqItemRel: document.getElementById('EsquemaEmpaqueCode').value,
            UoMCode: document.getElementById('txtUoMCode').value,
            UoMDescripcion: document.getElementById("txtItmUnidadMedida").value,
        }),
        url: "WFArticulo.aspx/UpdateItemsBarCode",
        success: function (response) {
            debugger;
            if (response.d.success) {
                GetItemsBarCodeListByItemCode();
                //Swal.Close();
                const successModal = new bootstrap.Modal(document.getElementById('exampleModalUoMBBarCode'));
                successModal.Close();

                Swal.fire({
                    icon: "Información", title: "Información", text: "Datos actualizados"
                });

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.d.message
                });
            }
        },
        error: function (request, message, error) {
            Swal.fire({
                icon: "error",
                title: "Error al consultar la Orden",
                text: request.responseJSON.d.message
            });
        }
    });
}