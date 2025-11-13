
function checkEnter(event) {
    // Verifica si la tecla presionada es "Enter" o "Tab"
    if (event.key === "Enter" || event.key === "Tab") {

        document.getElementById("btnAdd").click();
    }
}

function GetPack() {
    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Documento: document.getElementById('txtOrder').value }),
        url: "WfPacking.aspx/GetDocPacking",
        success: function (response) {
            //PickDet
            document.getElementById('PickDet').style.display = 'none';
            document.getElementById('PickCab').style.display = '';
            if (response.d.success) {
                var data = JSON.parse(response.d.message);

                data.forEach(function (item) {
                    // Si la solicitud es exitosa, llenamos los campos con los valores
                    document.getElementById("txtDocNum").value = item.NumOrden;
                    document.getElementById("txtStatus").value = item.EstadoPacking;
                    document.getElementById("txtCardName").value = item.Cliente;
                    document.getElementById("txtItems").value = item.Articulos;
                    //document.getElementById("txtAlmacen").value = item.Almacen;
                });

                document.getElementById("btnContinuar").disabled = false;
                document.getElementById('txtOrder').value = "";

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

            document.getElementById("btnContinuar").disabled = true;
            document.getElementById("txtDocNum").value = "";
            document.getElementById("txtStatus").value = "";
            document.getElementById("txtCardName").value = "";
            document.getElementById("txtItems").value = "";
            document.getElementById("txtAlmacen").value = "";
        }
    });
}

function GetEmpaque() {

    $.blockUI({
        message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
    });

    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "WfPacking.aspx/GetAcessUser",
        data: JSON.stringify({ EstadoDoc: document.getElementById('txtStatus').value, NumOrden: document.getElementById('txtDocNum').value }),
        success: function (response) {
            if (response.d.success) {
                if (response.d.message === 'XA232301') {
                    $.unblockUI();
                    Swal.fire({
                        title: ' Entrega con Empaque Iniciado',
                        text: 'El empaque de esta entrega ya se inicio ¿Deseas Continuar?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, Continuar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            GetListOfBoxes();
                            $.ajax({
                                type: "POST",
                                url: "WfPacking.aspx/DetallePacking",
                                data: JSON.stringify({ NumEntrega: document.getElementById('txtDocNum').value, tipo: 1 }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (response) {
                                    document.getElementById('btnAddBox').disabled = false;

                                    document.getElementById('PickCab').style.display = 'none';
                                    // Mostrar PickDet
                                    document.getElementById('PickDet').style.display = 'block';
                                    document.getElementById("titPack").value = document.getElementById("txtDocNum").value + "-" + document.getElementById("txtCardName").value + "\n" +
                                        "Lineas a Empacar: " + document.getElementById("txtItems").value;
                                    document.getElementById("MdTitle").textContent = "Entrega Numero: " + document.getElementById("txtDocNum").value;
                                    CALLMetodoEmpacado(response.d.detEmpaque);
                                    CALLMetodoDividido(response.d.message);
                                    document.getElementById("txtCaja").value = response.d.CajaActual;

                                },
                                error: function (response) {
                                    console.log(response);
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error al consultar empaque",
                                        text: response.responseJSON.d.message
                                    });
                                }
                            });

                            


                        }
                    });

                }
                else {

                    GetListOfBoxes();
                    document.getElementById('PickCab').style.display = 'none';
                    // Mostrar PickDet
                    document.getElementById('PickDet').style.display = 'block';
                    document.getElementById("titPack").value = document.getElementById("txtDocNum").value + "-" + document.getElementById("txtCardName").value + "\n" +
                        "Lineas a Empacar: " + document.getElementById("txtItems").value;
                    document.getElementById("MdTitle").textContent = "Entrega Numero: " + document.getElementById("txtDocNum").value;
                    CALLMetodoEmpacado(response.d.detEmpaque);
                    CALLMetodoDividido(response.d.message);
                    document.getElementById("txtCaja").value = response.d.CajaActual;
                    $.unblockUI();
                }

                

            } else {
                $.unblockUI();
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.d.message
                });
            }
        },
        error: function (request, message, error) {
            $.unblockUI();
            Swal.fire({
                icon: "error",
                title: "Error al consultar la Orden",
                text: request.responseJSON.d.message
            });

        }
    });

}

function CALLMetodoDividido(messageArray) {

    // Parsear el JSON
    var data = JSON.parse(messageArray);

    if (data.length != 0) {
        document.getElementById("btnFinish").disabled = false
    }


    // Obtener la referencia de la tabla
    var table = document.getElementById("tbPacking").getElementsByTagName('tbody')[0];

    // Limpiar el tbody existente
    table.innerHTML = "";
    var selectedItem = null;


    // Llenar la tabla con los datos del JSON
    data.forEach(function (item) {
        var row = table.insertRow(); // Insertar una nueva fila

        // Insertar las celdas y llenar con los datos
        var cell1 = row.insertCell(0);

        cell1.innerHTML = item.Detalle;


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

    /*document.getElementById("btnFCaja").disabled = true;*/
    var table = document.getElementById("tbEmpacados");
    var hasRows = table.tBodies[0] && table.tBodies[0].rows.length > 0;
    if (hasRows) {
        document.getElementById("btnFinish").disabled = false;
    }
    else {
        document.getElementById("btnFinish").disabled = true;
    }

    document.getElementById("txtItem").value="";
    document.getElementById("txtItem").focus();

}

function CALLMetodoEmpacado(ArrayDetalle) {

    var data = JSON.parse(ArrayDetalle);
    var table = document.getElementById("tbEmpacados").getElementsByTagName('tbody')[0];

    // Limpiar el tbody existente
    table.innerHTML = "";
    var selectedItem = null;


    data.forEach(function (item) {

        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = item.U_ItemCode;
        cell2.innerHTML = item.U_Quantity;
        cell3.innerHTML = item.U_Caja;
        cell4.innerHTML = item.U_CBarra;

        var button = document.createElement("button");
        button.className = "btn btn-light btn-burger";
        button.style.width = "30px";
        button.style.height = "30px";
        button.style.padding = "0";
        button.style.display = "flex";
        button.style.justifyContent = "center";
        button.style.alignItems = "center";
        var icon = document.createElement("i");
        icon.className = "material-icons";
        icon.style.fontSize = "16px";
        icon.textContent = "close";
        button.appendChild(icon);

        cell5.appendChild(button);

        button.addEventListener("click", function () {
            Swal.fire({
                title: 'Eliminar registro de empaque',
                text: "¿Estas seguro que quieres eliminar el registro selecccionado?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, estoy seguro'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: "POST",
                        url: "WfPacking.aspx/DeleteLinePack",
                        data: '{ NumEntrega: "' + document.getElementById("txtDocNum").value + '", Articulo: "' + item.U_ItemCode + '", Cantidad: "' + item.U_Quantity + '", CBarras: "' + item.U_CBarra + '" }',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            document.getElementById("txtCaja").value = response.d.CajaActual;
                            CALLMetodoEmpacado(response.d.detEmpaque);
                            CALLMetodoDividido(response.d.message);
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
            });
        });

    });
}

async function InsertDetalle() {

    $('#blockui-card-1').block({
        message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span><div>'
    });

    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "WfPacking.aspx/InsertEmpaque",
        data: JSON.stringify({
            NumEntrega: document.getElementById('txtDocNum').value,
            Codigo: document.getElementById("txtItem").value,
            Caja: document.getElementById('txtCaja').value
        }),
        success: async function (response) {
            if (response.d.success) {
                if (response.d.message === 'XA232100') {
                    $('#blockui-card-1').unblock();

                    const { value: formValues } = await Swal.fire({
                        title: "Inserta la cantidad a empacar",
                        html: `<input id="swal-input1" class="swal2-input">`,
                        focusConfirm: false,
                        preConfirm: () => {
                            return [
                                document.getElementById("swal-input1").value,
                            ];
                        }
                    });

                    if (formValues) {

                        $('#blockui-card-1').block({
                            message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span><div>'
                        });

                        $.ajax({
                            type: "POST",
                            url: "WfPacking.aspx/InsertaEmpaque",
                            data: JSON.stringify({
                                NumEntrega: document.getElementById('txtDocNum').value,
                                LineaEntrega: response.d.Linea,
                                ItemCode: response.d.ItemCode,
                                Cantidad: formValues[0],
                                BarCode: "",
                                CantSurtida: response.d.Surtida,
                                Caja: document.getElementById('txtCaja').value
                            }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                $.ajax({
                                    type: "POST",
                                    url: "WfPacking.aspx/DetallePacking",
                                    data: JSON.stringify({ NumEntrega: document.getElementById('txtDocNum').value, tipo: 1 }),
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (response) {
                                        document.getElementById('PickCab').style.display = 'none';
                                        // Mostrar PickDet
                                        document.getElementById('PickDet').style.display = 'block';
                                        document.getElementById("titPack").value = document.getElementById("txtDocNum").value + "-" + document.getElementById("txtCardName").value + "\n" +
                                            "Lineas a Empacar: " + document.getElementById("txtItems").value;
                                        document.getElementById("MdTitle").textContent = "Entrega Numero: " + document.getElementById("txtDocNum").value;
                                        CALLMetodoEmpacado(response.d.detEmpaque);
                                        CALLMetodoDividido(response.d.message);
                                        document.getElementById("txtCaja").value = response.d.CajaActual;
                                        document.getElementById("btnFinish").disabled = false;                                        
                                        $('#blockui-card-1').unblock();
                                    },
                                    error: function (response) {
                                        console.log(response);
                                        $('#blockui-card-1').unblock();
                                        Swal.fire({
                                            icon: "error",
                                            title: "Error al consultar empaque",
                                            text: response.responseJSON.d.message
                                        });

                                    }
                                });

                            },
                            error: function (response) {
                                console.log(response);
                                $('#blockui-card-1').unblock();
                                Swal.fire({
                                    icon: "error",
                                    title: "Error al insertar empaque",
                                    text: response.responseJSON.d.message
                                });
                            }

                        });
                    }
                } else {

                    $.ajax({
                        type: "POST",
                        url: "WfPacking.aspx/DetallePacking",
                        data: JSON.stringify({ NumEntrega: document.getElementById('txtDocNum').value, tipo: 1 }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            document.getElementById('PickCab').style.display = 'none';
                            // Mostrar PickDet
                            document.getElementById('PickDet').style.display = 'block';
                            document.getElementById("titPack").value = document.getElementById("txtDocNum").value + "-" + document.getElementById("txtCardName").value + "\n" +
                                "Lineas a Empacar: " + document.getElementById("txtItems").value;
                            document.getElementById("MdTitle").textContent = "Entrega Numero: " + document.getElementById("txtDocNum").value;
                            CALLMetodoEmpacado(response.d.detEmpaque);
                            CALLMetodoDividido(response.d.message);
                            document.getElementById("txtCaja").value = response.d.CajaActual;
                            document.getElementById("btnFinish").disabled = false;
                            $('#blockui-card-1').unblock();
                        },
                        error: function (response) {
                            console.log(response);
                            $('#blockui-card-1').unblock();
                            Swal.fire({
                                icon: "error",
                                title: "Error al consultar empaque",
                                text: response.responseJSON.d.message
                            });
                        }
                    });
                }

            } else {
                $('#blockui-card-1').unblock();
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.d.message
                });
            }
        },
        error: function (request, message, error) {
            $('#blockui-card-1').unblock();
            Swal.fire({
                icon: "error",
                title: "Error al insertar empaque",
                text: request.responseJSON.d.message
            });
        }
    });
}

function abreCaja() {

    if (document.getElementById("txtCaja").value != "") {
        document.getElementById("btnFCaja").disabled = false;
        document.getElementById("txtItem").value = "";
        document.getElementById("txtItem").focus();        
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debes tener una caja ya abierta para empacar"
        });
    }

}

function CierraCaja() {
    var CajaActual = parseInt(document.getElementById("txtCaja").value, 10);

    document.getElementById("txtCaja").value = CajaActual + 1;
    document.getElementById("txtItem").value = "";
    document.getElementById("txtItem").focus();
    
}

function FinalizaPacking() {
    Swal.fire({
        title: 'Terminar Empaque',
        text: "¿Estas seguro de terminar el Empaque?, Una vez aceptando se Cierra y no se podran hacer modificaciones",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Procesando cierre de Empaque',
                didOpen: function () {
                    Swal.showLoading();

                    // Realizar la llamada AJAX
                    $.ajax({
                        type: "POST",
                        url: "WFPacking.aspx/ClosePacking",
                        data: JSON.stringify({ NumEntrega: document.getElementById('txtDocNum').value }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            Swal.close(); // Cerrar SweetAlert después del éxito
                            var baseUrl = window.location.origin;
                            var pdfUrl = baseUrl + response.d.pdf;
                            console.log(pdfUrl);

                            Swal.fire({
                                      title: "Descarga Impresiones",
                                      icon: "info",
                                      html: `
                                        Para descargar el formato
                                        de impresion presiona 
                                        <a href="${pdfUrl}" target="_blank" autofocus>aqui</a>,
                                      `,
                                      showCloseButton: true
                            }).then(function () {
                                // Redirigir a la página después de que el Swal se cierre
                                window.location.href = "WFListPacking.aspx";
                            });                           

                            //setTimeout(function () {
                            //    window.location.href = "WFListPacking.aspx";
                            //}, 3000);
                            
                            
                        },
                        error: function (response) {
                            Swal.close(); // Cerrar SweetAlert si ocurre un error
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: response.responseText
                            });
                        }
                    });
                }
            });



        }
    });
}

function GeneraInvoice() {
    Swal.fire({
        title: 'Guias y Factura',
        text: "¿Estas seguro de Actualizar las Guias?, Una vez aceptando actualizan las guias y se genera la Factura",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Actualizar Guias y Generando Factura',
                didOpen: function () {
                    Swal.showLoading();

                    // Realizar la llamada AJAX
                    $.ajax({
                        type: "POST",
                        url: "WFPacking.aspx/GeneraInvoice",
                        data: JSON.stringify({ NumEntrega: document.getElementById('txtDocNum').value }),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            Swal.close(); // Cerrar SweetAlert después del éxito
                            window.location.href = "WFListPacking.aspx";
                        },
                        error: function (response) {
                            Swal.close(); // Cerrar SweetAlert si ocurre un error
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: response.responseText
                            });
                        }
                    });
                }
            });



        }
    });
}






/*Nuevas funcionalidates*/
function AddNewBox() {
    Swal.fire({
        title: 'Agregar caja',
        text: "¿Estás seguro de que deseas agregar una nueva caja?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url: "WFPacking.aspx/AddNewBox",
                data: JSON.stringify({ NumOrden: document.getElementById('txtDocNum').value }),
                //data: '',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    GetListOfBoxes();
                },
                error: function (response) {
                    Swal.close(); // Cerrar SweetAlert si ocurre un error
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.responseText
                    });
                }
            });


            //Swal.fire({
            //    title: 'Actualizar Guias y Generando Factura',
            //    didOpen: function () {
            //        Swal.showLoading();

            //        // Realizar la llamada AJAX
            //        $.ajax({
            //            type: "POST",
            //            url: "WFPacking.aspx/GeneraInvoice",
            //            data: JSON.stringify({ NumEntrega: document.getElementById('txtDocNum').value }),
            //            contentType: "application/json; charset=utf-8",
            //            dataType: "json",
            //            success: function (response) {
            //                Swal.close(); // Cerrar SweetAlert después del éxito
            //                window.location.href = "WFListPacking.aspx";
            //            },
            //            error: function (response) {
            //                Swal.close(); // Cerrar SweetAlert si ocurre un error
            //                Swal.fire({
            //                    icon: "error",
            //                    title: "Error",
            //                    text: response.responseText
            //                });
            //            }
            //        });
            //    }
            //});



        }
    });
}
function GetListOfBoxes() {
    $.ajax({
        type: "POST",
        url: "WFPacking.aspx/GetListOfBoxes",
        data: JSON.stringify({ NumOrden: document.getElementById('txtDocNum').value }),
        //data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            debugger;
            // Obtener el JSON desde el Literal (como cadena de texto)
            var jsonData = response.d;

            // Parsear el JSON
            var data = JSON.parse(jsonData);

            // Obtener la referencia de la tabla
            var table = document.getElementById("datatable1").getElementsByTagName('tbody')[0];

            // Limpiar el tbody existente
            table.innerHTML = "";
            var selectedItem = null;


            // Llenar la tabla con los datos del JSON
            data.forEach(function (item) {
                var row = table.insertRow(); // Insertar una nueva fila

                // Insertar las celdas y llenar con los datos
                //Número de caja
                var cell1 = row.insertCell(0);
                cell1.innerHTML = item.NumCaja;

                //Artículos
                var cell2 = row.insertCell(1);
                cell2.innerHTML = item.NumItems;

                //Estado
                var cell3 = row.insertCell(2);
                cell3.innerHTML = item.Estado;

                //Guía 
                var cell4 = row.insertCell(3);
                cell4.innerHTML = item.Guia;

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

                    document.getElementById("exampleModalBoxedItems").innerText = "Caja " + item.NumCaja;

                    GetListOfItemsByBox(item.BoxCode)

                    const successModal = new bootstrap.Modal(document.getElementById('BoxedItems'));
                    successModal.show();
                });

                //Eliminar
                var cell6 = row.insertCell(5);
                var buttonDeleteBox = document.createElement("button");
                buttonDeleteBox.className = "btn btn-light btn-burger";
                buttonDeleteBox.style.width = "30px";
                buttonDeleteBox.style.height = "30px";
                buttonDeleteBox.style.padding = "0";
                buttonDeleteBox.style.display = "flex";
                buttonDeleteBox.style.justifyContent = "center";
                buttonDeleteBox.style.alignItems = "center";

                var icon = document.createElement("i");
                icon.className = "material-icons";
                icon.style.fontSize = "16px";
                icon.textContent = "delete";

                buttonDeleteBox.appendChild(icon);

                cell6.appendChild(buttonDeleteBox);
                row.appendChild(cell6);
                buttonDeleteBox.addEventListener("click", function () {
                    //const successModal = new bootstrap.Modal(document.getElementById('BoxedItems'));
                    //successModal.show();
                    alert('Eliminar');
                });

                //Cerrar
                var cell7 = row.insertCell(5);
                var buttonClose = document.createElement("button");
                buttonClose.className = "btn btn-light btn-burger";
                buttonClose.style.width = "30px";
                buttonClose.style.height = "30px";
                buttonClose.style.padding = "0";
                buttonClose.style.display = "flex";
                buttonClose.style.justifyContent = "center";
                buttonClose.style.alignItems = "center";

                var icon = document.createElement("i");
                icon.className = "material-icons";
                icon.style.fontSize = "16px";

                if (item.Estado == 'Abierto')
                    icon.textContent = "lock_open";
                else
                {
                    icon.textContent = "lock";
                    buttonClose.disabled = true;
                }

                buttonClose.appendChild(icon);

                cell7.appendChild(buttonClose);
                row.appendChild(cell7);
                buttonClose.addEventListener("click", function () {
                    //const successModal = new bootstrap.Modal(document.getElementById('BoxedItems'));
                    //successModal.show();
                    //alert('Cerrar');
                    // Desactivar botón y agregar spinner
                    buttonClose.disabled = true;
                    const originalHTML = buttonClose.innerHTML;
                    buttonClose.innerHTML = '<i class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">restart_alt</i>';
                    CloseBox(item.BoxCode);
                    buttonClose.innerHTML = '<i class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">lock</i>';
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

                //var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
                //row.addEventListener(isTouchDevice ? "click" : "dblclick", function () {
                //    // Tomar el valor de la primera columna
                //    document.getElementById("txtOrder").value = item.NumDoc;

                //    // Buscar el botón por su ID y disparar el evento clic
                //    var button = document.getElementById("btnBuscar"); // Reemplaza con el ID de tu botón
                //    if (button) {
                //        button.click();
                //    }

                //    var homeTab = document.querySelector('#home-tab'); // Selecciona el tab de "Manual"
                //    if (homeTab) {
                //        homeTab.click(); // Activa la pestaña usando el evento de clic
                //    }

                //});

            });
        },
        error: function (response) {
            $.unblockUI();
            Swal.close(); // Cerrar SweetAlert si ocurre un error
            Swal.fire({
                icon: "error",
                title: "Error",
                text: response.responseText
            });
        }
    });
}
function GetListOfItemsByBox(boxNum) {
    $.ajax({
        type: "POST",
        url: "WFPacking.aspx/GetListOfItemsByBox",
        data: JSON.stringify({ NumOrden: document.getElementById('txtDocNum').value, BoxNum: boxNum}),
        //data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            // Obtener el JSON desde el Literal (como cadena de texto)
            var jsonData = response.d;

            console.log(jsonData);

            // Parsear el JSON
            var data = JSON.parse(jsonData);

            // Obtener la referencia de la tabla
            var table = document.getElementById("BoxedItemsList").getElementsByTagName('tbody')[0];

            // Limpiar el tbody existente
            table.innerHTML = "";
            var selectedItem = null;


            // Llenar la tabla con los datos del JSON
            data.forEach(function (item) {
                debugger;
                var row = table.insertRow(); // Insertar una nueva fila

                // Insertar las celdas y llenar con los datos

                //ItemCode
                var cell1 = row.insertCell(0);
                cell1.innerHTML = item.ItemCode;

                //Código Barras
                var cell2 = row.insertCell(1);
                cell2.innerHTML = item.BarCode;

                //Cantidad
                var cell3 = row.insertCell(2);
                cell3.innerHTML = item.Cantidad;

                //UoM
                var cell4 = row.insertCell(3);
                cell4.innerHTML = item.UoM;

                //Eliminar
                var cell5 = row.insertCell(4);
                var buttonDeleteBox = document.createElement("button");
                buttonDeleteBox.className = "btn btn-light btn-burger";
                buttonDeleteBox.style.width = "30px";
                buttonDeleteBox.style.height = "30px";
                buttonDeleteBox.style.padding = "0";
                buttonDeleteBox.style.display = "flex";
                buttonDeleteBox.style.justifyContent = "center";
                buttonDeleteBox.style.alignItems = "center";

                var icon = document.createElement("i");
                icon.className = "material-icons";
                icon.style.fontSize = "16px";
                icon.textContent = "delete";

                buttonDeleteBox.appendChild(icon);

                cell5.appendChild(buttonDeleteBox);
                row.appendChild(cell5);
                buttonDeleteBox.addEventListener("click", function () {
                    //const successModal = new bootstrap.Modal(document.getElementById('BoxedItems'));
                    //successModal.show();
                    alert('Eliminar');
                });
                //buttonDeleteBox.addEventListener("click", function () {
                //    //const successModal = new bootstrap.Modal(document.getElementById('BoxedItems'));
                //    //successModal.show();
                //    alert('Cerrar');
                //});

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
        },
        error: function (response) {
            var responseText = JSON.parse(response.responseText);
            Swal.close(); // Cerrar SweetAlert si ocurre un error
            Swal.fire({
                icon: "error",
                title: "Error",
                text: responseText.Message
            });
        }
    });
}
function GetItemsInfoByBarCode() {
    //txtItmCodigoBarras
    $.ajax({
        type: "POST",
        url: "WFPacking.aspx/GetItemsInfoByBarCode",
        data: JSON.stringify({ itemBarCode: document.getElementById('txtItmCodigoBarras').value }),
        //data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            // Obtener el JSON desde el Literal (como cadena de texto)
            var jsonData = response.d;

            // Parsear el JSON
            var data = JSON.parse(jsonData);


            // Llenar la tabla con los datos del JSON
            data.forEach(function (item) {
                
                document.getElementById("txtItmCode").value = item.ItemCode;
                document.getElementById("txtItmCantidad").value = item.Quantity;
                document.getElementById("txtItmUnidadMedida").value = item.UoM;
            });
        },
        error: function (response) {
            Swal.close(); // Cerrar SweetAlert si ocurre un error
            Swal.fire({
                icon: "error",
                title: "Error",
                text: response.responseText
            });
        }
    });

}
function AddNewItemToBox() {
    $.ajax({
        type: "POST",
        url: "WFPacking.aspx/AddNewItemToBox",
        data: JSON.stringify({
            NumOrden: document.getElementById('txtDocNum').value,
            ItemCode: document.getElementById('txtItmCode').value,
            Cantidad: document.getElementById('txtItmCantidad').value,
            UoM: document.getElementById('txtItmUnidadMedida').value
        }),
        //data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            GetListOfItemsByBox(2);
        },
        error: function (response) {
            Swal.close(); // Cerrar SweetAlert si ocurre un error
            Swal.fire({
                icon: "error",
                title: "Error",
                text: response.responseText
            });
        }
    });
}
function CloseBox(boxCode) {
    Swal.fire({
        title: 'Cerrar caja',
        text: "¿Estás seguro de que deseas cerrar la caja? Esta accion no se puede deshacer.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
    }).then(async (result) => {
        if (result.isConfirmed) {

            const { value: formValues } = await Swal.fire({
                title: "Por favor, especifique la guía de empaque.",
                html: `
                                <div>
                                    <label for="swal-input11">Guía:</label>
                                    <input id="swal-input11" class="swal2-input">
                                </div>
                            `,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById("swal-input11").value,
                    ];
                }


            });
            debugger;
            if (formValues) {
                $('#blockui-card-1').block({
                    message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span><div>'
                });

                if (document.getElementById("swal-input11").value === '') {
                    $('#blockui-card-1').unblock();
                    //Swal.fire({
                    //    icon: "error",
                    //    title: "Oops...",
                    //    text: "La ubicación especificada no es válida."
                    //});
                }
                else {
                    $('#blockui-card-1').unblock();
                    $.ajax({
                        type: "POST",
                        url: "WFPacking.aspx/CloseBox",
                        data: JSON.stringify({ NumOrden: document.getElementById("txtDocNum").value, BoxCode: boxCode, Guia: document.getElementById("swal-input11").value }),
                        //data: '',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            GetListOfBoxes();
                        },
                        error: function (response) {
                            Swal.close(); // Cerrar SweetAlert si ocurre un error
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: response.responseText
                            });
                        }
                    });
                }
            }           
        }
    });
}






