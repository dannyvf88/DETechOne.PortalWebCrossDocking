const { options } = require("dropzone");

function checkEnter(event) {
    // Verifica si la tecla presionada es "Enter" o "Tab"
    if (event.key === "Enter" || event.key === "Tab") {
        
        document.getElementById("btnAdd").click();
    }
}

/** BUSCAR **/
function GetPick() {
    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Documento: document.getElementById('txtOrder').value }),
        url: "WfPicking.aspx/BuscarDatosPedido",
        success: function (response) {

            document.getElementById('PickCab').style.display = '';
            // Mostrar PickDet
            document.getElementById('PickDet').style.display = 'none';

            
            if (response.d.success) {
                var data = JSON.parse(response.d.message);

                data.forEach(function (item) {
                    // Si la solicitud es exitosa, llenamos los campos con los valores
                    //document.getElementById("txtDocEntry").value = item.DocEntry;
                    document.getElementById("txtDocNum").value = item.NumOrden;
                    document.getElementById("txtStatus").value = item.EstadoPicking;
                    document.getElementById("txtCardName").value = item.Cliente;
                    document.getElementById("txtItems").value = item.Articulos;
                    document.getElementById("txtAlmacen").value = item.WhsCode;
                    document.getElementById("txtComentarios").value = item.Comments;
                    let rawDate = item.DocDate;
                    let formattedDate = rawDate.split(" ")[0];
                    let fechaConvertida = convertirFechaAFormatoISO(formattedDate);
                    document.getElementById("txtDate").value = fechaConvertida;
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
            document.getElementById("txtDate").value = "";
        }
    });
}

function GetSurtido() {

    $.blockUI({
        message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
    });

    var documentStatus = document.getElementById('txtStatus').value;
    if (documentStatus === 'Procesando') {
        $.unblockUI();
        Swal.fire({
            title: ' Pedido con Surtido Iniciado',
            text: 'El surtido de este pedido ya se inicio ¿Deseas Continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                debugger;
                ContinueToShowSalesOrderDetails();
            }
        });
    }
    else if (documentStatus === 'Terminado') {
        $.unblockUI();
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'El pedido ya se encuentra Terminado.'
        });
    }
    else if (documentStatus === 'Cancelado') {
        $.unblockUI();
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: 'El pedido ya se encuentra en Cancelado.'
        });
    }
    else if (documentStatus === 'Liberado') {
        $.unblockUI();
        //Iniciar el Picking
        Swal.fire({
            title: 'Iniciar Surtido del pedido',
            text: 'Se iniciará el surtido del pedido. ¿Deseas Continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                debugger;
                $.ajax({
                    type: "POST",
                    url: "WfPicking.aspx/StartPicking",
                    data: JSON.stringify({ numOrden: document.getElementById('txtDocNum').value }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        ContinueToShowSalesOrderDetails();
                    },
                    error: function (response) {
                        console.log(response);
                        Swal.fire({
                            icon: "error",
                            title: "Error al consultar surtido",
                            text: response.responseJSON.d.message
                        });
                    }
                });

            }
        });
    }

    //$.ajax({
    //    type: "POST",
    //    dataType: 'json',
    //    contentType: "application/json; charset=utf-8",
    //    data: JSON.stringify({ Documento: document.getElementById('txtOrder').value }),
    //    url: "WfPicking.aspx/BuscarDatosPedido",
    //    success: function (response) {

    //        if (response.d.success) {
                

    //        } else {
    //            Swal.fire({
    //                icon: "error",
    //                title: "Oops...",
    //                text: response.d.message
    //            });
    //        }
    //    },
    //    error: function (request, message, error) {
    //        Swal.fire({
    //            icon: "error",
    //            title: "Error al consultar la Orden",
    //            text: request.responseJSON.d.message
    //        });
    //    }
    //});







    //$.ajax({
    //    type: "POST",
    //    dataType: 'json',
    //    contentType: "application/json; charset=utf-8",
    //    url: "WfPicking.aspx/GetAcessUser",
    //    data: JSON.stringify({ EstadoDoc: document.getElementById('txtStatus').value, NumOrden: document.getElementById('txtDocNum').value }),
    //    success: function (response) {
    //        if (response.d.success) {
    //            debugger;
    //            if (response.d.message === 'XA232301') {
    //                $.unblockUI();
    //                Swal.fire({
    //                    title: ' Pedido con Surtido Iniciado',
    //                    text: 'El surtido de este pedido ya se inicio ¿Deseas Continuar?',
    //                    icon: 'warning',
    //                    showCancelButton: true,
    //                    confirmButtonColor: '#3085d6',
    //                    cancelButtonColor: '#d33',
    //                    confirmButtonText: 'Si, Continuar'
    //                }).then((result) => {
    //                    if (result.isConfirmed) {
    //                        $.ajax({
    //                            type: "POST",
    //                            url: "WfPicking.aspx/DetallePedido",
    //                            data: JSON.stringify({ NumOrden: document.getElementById('txtDocNum').value, tipo: 1 }),
    //                            contentType: "application/json; charset=utf-8",
    //                            dataType: "json",
    //                            success: function (response) {
    //                                document.getElementById('PickCab').style.display = 'none';
    //                                // Mostrar PickDet
    //                                document.getElementById('PickDet').style.display = 'block';
    //                                document.getElementById("titPick").value = document.getElementById("txtDocNum").value + "-" + document.getElementById("txtCardName").value + "\n" +
    //                                    "Comentarios: " + document.getElementById("txtComentarios").value;
    //                                CALLMetodoDividido(response.d.message, response.d.lineaCaptura, response.d.PorcAvance);

    //                            },
    //                            error: function (response) {
    //                                console.log(response);
    //                                Swal.fire({
    //                                    icon: "error",
    //                                    title: "Error al consultar surtido",
    //                                    text: response.responseJSON.d.message
    //                                });
    //                            }
    //                        });

    //                    }
    //                });

    //            }
    //            else {

    //                debugger;
    //                Swal.fire({
    //                    title: 'Iniciar Surtido del pedido',
    //                    text: 'Se iniciará el surtido del pedido. ¿Deseas Continuar?',
    //                    icon: 'warning',
    //                    showCancelButton: true,
    //                    confirmButtonColor: '#3085d6',
    //                    cancelButtonColor: '#d33',
    //                    confirmButtonText: 'Si, Continuar'
    //                }).then((result) => {
    //                    if (result.isConfirmed) {
    //                        $.ajax({
    //                            type: "POST",
    //                            url: "WfPicking.aspx/StartPicking",
    //                            data: JSON.stringify({ numOrden: document.getElementById('txtDocNum').value }),
    //                            contentType: "application/json; charset=utf-8",
    //                            dataType: "json",
    //                            success: function (response) {
    //                                //document.getElementById('PickCab').style.display = 'none';
    //                                //// Mostrar PickDet
    //                                //document.getElementById('PickDet').style.display = 'block';
    //                                //document.getElementById("titPick").value = document.getElementById("txtDocNum").value + "-" + document.getElementById("txtCardName").value + "\n" +
    //                                //    "Comentarios: " + document.getElementById("txtComentarios").value;
    //                                //CALLMetodoDividido(response.d.message, response.d.lineaCaptura, response.d.PorcAvance);

    //                            },
    //                            error: function (response) {
    //                                console.log(response);
    //                                Swal.fire({
    //                                    icon: "error",
    //                                    title: "Error al consultar surtido",
    //                                    text: response.responseJSON.d.message
    //                                });
    //                            }
    //                        });

    //                    }
    //                });



    //                document.getElementById('PickCab').style.display = 'none';
    //                // Mostrar PickDet
    //                document.getElementById('PickDet').style.display = 'block';
    //                document.getElementById("titPick").value = document.getElementById("txtDocNum").value + "-" + document.getElementById("txtCardName").value + "\n" +
    //                    "Comentarios: " + document.getElementById("txtComentarios").value;
    //                CALLMetodoDividido(response.d.message, response.d.lineaCaptura, response.d.PorcAvance);
    //                $.unblockUI();
    //            }

    //        } else {
    //            $.unblockUI();
    //            Swal.fire({
    //                icon: "error",
    //                title: "Oops...",
    //                text: response.d.message
    //            });
    //        }
    //    },
    //    error: function (request, message, error) {
    //        $.unblockUI();
    //        Swal.fire({
    //            icon: "error",
    //            title: "Error al consultar la Orden",
    //            text: request.responseJSON.d.message
    //        });

    //    }
    //});
}

function ContinueToShowSalesOrderDetails() {
    $.ajax({
        type: "POST",
        url: "WfPicking.aspx/DetallePedido",
        data: JSON.stringify({ NumOrden: document.getElementById('txtDocNum').value, tipo: 1 }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            document.getElementById('PickCab').style.display = 'none';
            // Mostrar PickDet
            document.getElementById('PickDet').style.display = 'block';
            document.getElementById("titPick").value = document.getElementById("txtDocNum").value + "-" + document.getElementById("txtCardName").value + "\n" +
                "Comentarios: " + document.getElementById("txtComentarios").value;
            CALLMetodoDividido(response.d.message, response.d.lineaCaptura, response.d.PorcAvance);

        },
        error: function (response) {
            console.log(response);
            Swal.fire({
                icon: "error",
                title: "Error al consultar surtido",
                text: response.responseJSON.d.message
            });
        }
    });
}

function EndPicking() {
    Swal.fire({
        title: 'Terminar Picking',
        text: "¿Está seguro de que desea finalizar el proceso de picking? Esta acción no se puede deshacer.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
        if (result.isConfirmed) { 
            //Terminar el Picking
            Swal.fire({
                title: 'Operación de empaque',
                text: "¿El pedido requiere ser empacado?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, requiere empaque'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    //Empacar el producto
                    const { value: formValues } = await Swal.fire({
                        title: "Por favor, especifique la ubicación de empaque.",
                        html: `
                                <div>
                                    <label for="swal-input11">Ubicacion:</label>
                                    <input id="swal-input11" class="swal2-input">
                                </div>
                            `,
                        //didOpen: () => {
                        //    // Llenar el combo dinámicamente
                        //    GetUoMList(function (options) {
                        //        let select = document.getElementById("swal-input2");
                        //        select.innerHTML = options;
                        //    });
                        //},
                        focusConfirm: false,
                        preConfirm: () => {
                            return [
                                document.getElementById("swal-input11").value,
                            ];
                        }


                    });
                    debugger;
                    if (formValues) {
                        debugger;
                        $('#blockui-card-1').block({
                            message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span><div>'
                        });

                        debugger;
                        if (document.getElementById("swal-input11").value === '') {
                            $('#blockui-card-1').unblock();
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "La ubicación especificada no es válida."
                            });
                        }
                        else {
                            $('#blockui-card-1').unblock();
                            $.ajax({
                                type: "POST",
                                url: "WFPicking.aspx/ClosePickingWhithPacking",
                                data: JSON.stringify({ NumOrden: document.getElementById('txtDocNum').value, PackingLocationCode: document.getElementById('swal-input11').value }),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (response) {
                                    Swal.close(); // Cerrar SweetAlert después del éxito
                                    window.location.href = "WFListPicking.aspx";
                                },
                                error: function (response) {
                                    const jsonResponse = JSON.parse(response.responseText);

                                    Swal.close(); // Cerrar SweetAlert si ocurre un error
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        text: jsonResponse.d.message
                                    });
                                }
                            });
                        }
                    }
                }
                else {
                    //No Empacar el producto
                    Swal.fire({
                        title: 'Entregar pedido',
                        text: "¿Está seguro de que desea realizar la entrega del pedido? Esta acción no se puede deshacer.",
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, estoy seguro'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            alert('No se requiere empacar el producto, y se debe realizar la entrega');
                        }
                    });
                }
            });           

            //***********






            //Swal.fire({
            //    title: 'Procesando cierre de Picking y Entrega',
            //    didOpen: function () {
            //        Swal.showLoading();

            //        // Realizar la llamada AJAX
            //        $.ajax({
            //            type: "POST",
            //            url: "WFPicking.aspx/CerrarPicking",
            //            data: JSON.stringify({ NumOrden: document.getElementById('txtDocNum').value }),
            //            contentType: "application/json; charset=utf-8",
            //            dataType: "json",
            //            success: function (response) {
            //                Swal.close(); // Cerrar SweetAlert después del éxito
            //                window.location.href = "WFListPicking.aspx";
            //            },
            //            error: function (response) {
            //                const jsonResponse = JSON.parse(response.responseText);

            //                Swal.close(); // Cerrar SweetAlert si ocurre un error
            //                Swal.fire({
            //                    icon: "error",
            //                    title: "Error",
            //                    text: jsonResponse.d.message
            //                });
            //            }
            //        });
            //    }
            //});



        } else {

            $.blockUI({
                message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
            });

            $.ajax({
                type: "POST",
                url: "WFPicking.aspx/ActualizaProcesando",
                data: JSON.stringify({ NumOrden: document.getElementById('txtDocNum').value }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $.unblockUI();
                    window.location.href = "WFListPicking.aspx";
                },
                error: function (response) {
                    $.unblockUI();
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



























function convertirFechaAFormatoISO(fecha) {
    // La fecha está en formato dd/MM/yyyy
    let [day, month, year] = fecha.split("/");  // Dividimos la fecha en partes
    return `${year}-${month}-${day}`;  // Retornamos en formato yyyy-MM-dd
}

function CALLMetodoDividido(messageArray,LineaSurtida,PorcAvance) {
    
    // Parsear el JSON
    var data = JSON.parse(messageArray);
    console.log(PorcAvance);

    if (data.length === 0 || PorcAvance === "100" ) {
        document.getElementById("btnTerminar").disabled = false
    }


    // Obtener la referencia de la tabla
    var table = document.getElementById("tbPicking").getElementsByTagName('tbody')[0];

    // Limpiar el tbody existente
    table.innerHTML = "";
    var selectedItem = null;


    // Llenar la tabla con los datos del JSON
    data.forEach(function (item) {
        var row = table.insertRow(); // Insertar una nueva fila

        // Insertar las celdas y llenar con los datos
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);

        cell0.innerHTML = item.Line;
        cell1.innerHTML = item.Detalle;

        //Verifica la linea capturada 
        if (LineaSurtida != null) {
            console.log(LineaSurtida);
            console.log(item.Line);
            if (item.Line == LineaSurtida) {
                row.classList.add("selected-row");
                selectedItem = item;
            }
        }

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

    document.getElementById("Itemtxt").focus();

}

async function InsertDetalle() {

    $('#blockui-card-1').block({
        message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span><div>'
    });

    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "WfPicking.aspx/SurtidoPedido",
        data: JSON.stringify({
            NumOrden: document.getElementById('txtDocNum').value,
            Codigo: document.getElementById('Itemtxt').value
        }),        
        success: async function (response) { 
            if (response.d.success) {

                
                    $('#blockui-card-1').unblock();
                    var { value: formValues } = await Swal.fire({
                        title: "Inserta la cantidad a surtir",
                        /*html: `<input id="swal-input1" class="swal2-input"> <input id="swal-input2" class="swal2-input">`,*/
                        html: `<div>
                                    <label for="swal-input1">Cantidad:</label>
                                    <input id="swal-input1" class="swal2-input">
                               </div>
                               <div>
                                    <label for="swal-input2">Unidad de Medida:</label>
                                    <select id="swal-input2" class="swal2-select">
                                        <option value="">-- Selecciona --</option>                                        
                                    </select>
                               </div>
                               <div>
                                    <label for="swal-input3">Ubicación Origen:</label>
                                    <input id="swal-input3" class="swal2-input">
                               </div>
                                <div>
                                    <label for="swal-input4">Ubicación Destino:</label>
                                    <input id="swal-input4" class="swal2-input">
                               </div>`,
                        didOpen: () => {
                            GetUoMList(function (options) {
                                let select = document.getElementById("swal-input2");
                                select.innerHTML = options;
                            });
                        },
                        focusConfirm: false,
                        preConfirm: () => {
                            return [
                                document.getElementById("swal-input1").value,
                                document.getElementById("swal-input2").value,
                                document.getElementById("swal-input3").value,
                                document.getElementById("swal-input4").value
                            ];
                        }
                    });                   

                if (formValues) {
                    debugger;
                        $('#blockui-card-1').block({
                            message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span><div>'
                        });

                        $.ajax({                            
                            type: "POST",
                            url: "WfPicking.aspx/InsertaSurtido",
                            data: JSON.stringify({
                                NumOrden: document.getElementById('txtDocNum').value,
                                LineaOrden: response.d.LineNum,
                                ItemCode: response.d.ItemCode,
                                Cantidad: document.getElementById("swal-input1").value,
                                LoteAsignado: "",
                                BarCode: "",
                                CantSurtida: response.d.CantSurt,
                                UoM: document.getElementById("swal-input2").value,
                                LocationBinCode: document.getElementById("swal-input3").value,
                                LocationDBinCode: document.getElementById("swal-input4").value,
                                WhsCode: response.d.WhsCode
                            }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                $.ajax({
                                    type: "POST",
                                    url: "WfPicking.aspx/DetallePedido",
                                    data: JSON.stringify({ NumOrden: document.getElementById('txtDocNum').value, tipo: 1 }),
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: function (response) {
                                        document.getElementById('PickCab').style.display = 'none';
                                        // Mostrar PickDet
                                        document.getElementById('PickDet').style.display = 'block';
                                        document.getElementById("titPick").value = document.getElementById("txtDocNum").value + "-" + document.getElementById("txtCardName").value + "\n" +
                                            "Comentarios: " + document.getElementById("txtComentarios").value;
                                        document.getElementById("Itemtxt").value = "";
                                        CALLMetodoDividido(response.d.message, response.d.lineaCaptura, response.d.PorcAvance);
                                        document.getElementById("btnTerminar").disabled = false
                                        $('#blockui-card-1').unblock();
                                    },
                                    error: function (response) {
                                        console.log(response);
                                        $('#blockui-card-1').unblock();
                                        Swal.fire({
                                            icon: "error",
                                            title: "Error al consultar surtido",
                                            text: response.responseJSON.d.message
                                        });

                                    }
                                });

                            },
                            error: function (response) {
                                document.getElementById("Itemtxt").value = "";
                                $('#blockui-card-1').unblock();                                
                                Swal.fire({
                                    icon: "error",
                                    title: "Error al insertar surtido",
                                    text: response.responseJSON.d.message
                                });
                            }

                        });
                    }








                //if (response.d.message === 'XA232100') {                  

                //    $('#blockui-card-1').unblock();
                //    var { value: formValues } = await Swal.fire({
                //        title: "Inserta la cantidad a surtir",
                //        /*html: `<input id="swal-input1" class="swal2-input"> <input id="swal-input2" class="swal2-input">`,*/
                //        html: `<div>
                //                    <label for="swal-input1">Cantidad:</label>
                //                    <input id="swal-input1" class="swal2-input">
                //               </div>
                //               <div>
                //                    <label for="swal-input2">Unidad de Medida:</label>
                //                    <select id="swal-input2" class="swal2-select">
                //                        <option value="">-- Selecciona --</option>                                        
                //                    </select>
                //               </div>
                //               <div>
                //                    <label for="swal-input3">Ubicación Origen:</label>
                //                    <input id="swal-input3" class="swal2-input">
                //               </div>
                //                <div>
                //                    <label for="swal-input4">Ubicación Destino:</label>
                //                    <input id="swal-input4" class="swal2-input">
                //               </div>`,
                //        didOpen: () => {
                //            GetUoMList(function (options) {
                //                let select = document.getElementById("swal-input2");
                //                select.innerHTML = options;
                //            });
                //        },
                //        focusConfirm: false,
                //        preConfirm: () => {
                //            return [
                //                document.getElementById("swal-input1").value,
                //                document.getElementById("swal-input2").value,
                //                document.getElementById("swal-input3").value,
                //                document.getElementById("swal-input4").value
                //            ];
                //        }
                //    });                   

                //    if (formValues) {
                //        $('#blockui-card-1').block({
                //            message: '<div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span><div>'
                //        });

                //        $.ajax({                            
                //            type: "POST",
                //            url: "WfPicking.aspx/InsertaSurtido",
                //            data: JSON.stringify({
                //                NumOrden: document.getElementById('txtDocNum').value,
                //                LineaOrden: response.d.Linea,
                //                ItemCode: response.d.ItemCode,
                //                Cantidad: formValues[0],
                //                LoteAsignado: "",
                //                BarCode: "",
                //                CantSurtida: response.d.Surtida,
                //                UoM: document.getElementById("swal-input2").value,
                //                LocationBinCode: document.getElementById("swal-input3").value,
                //                LocationDBinCode: document.getElementById("swal-input4").value
                //            }),
                //            contentType: "application/json; charset=utf-8",
                //            dataType: "json",
                //            success: function (response) {
                //                $.ajax({
                //                    type: "POST",
                //                    url: "WfPicking.aspx/DetallePedido",
                //                    data: JSON.stringify({ NumOrden: document.getElementById('txtDocNum').value, tipo: 1 }),
                //                    contentType: "application/json; charset=utf-8",
                //                    dataType: "json",
                //                    success: function (response) {
                //                        document.getElementById('PickCab').style.display = 'none';
                //                        // Mostrar PickDet
                //                        document.getElementById('PickDet').style.display = 'block';
                //                        document.getElementById("titPick").value = document.getElementById("txtDocNum").value + "-" + document.getElementById("txtCardName").value + "\n" +
                //                            "Comentarios: " + document.getElementById("txtComentarios").value;
                //                        document.getElementById("Itemtxt").value = "";
                //                        CALLMetodoDividido(response.d.message, response.d.lineaCaptura, response.d.PorcAvance);
                //                        document.getElementById("btnTerminar").disabled = false
                //                        $('#blockui-card-1').unblock();
                //                    },
                //                    error: function (response) {
                //                        console.log(response);
                //                        $('#blockui-card-1').unblock();
                //                        Swal.fire({
                //                            icon: "error",
                //                            title: "Error al consultar surtido",
                //                            text: response.responseJSON.d.message
                //                        });

                //                    }
                //                });

                //            },
                //            error: function (response) {
                //                document.getElementById("Itemtxt").value = "";
                //                $('#blockui-card-1').unblock();                                
                //                Swal.fire({
                //                    icon: "error",
                //                    title: "Error al insertar surtido",
                //                    text: response.responseJSON.d.message
                //                });
                //            }

                //        });
                //    }
                //} else {

                //    $.ajax({
                //        type: "POST",
                //        url: "WfPicking.aspx/DetallePedido",
                //        data: JSON.stringify({ NumOrden: document.getElementById('txtDocNum').value, tipo: 1 }),
                //        contentType: "application/json; charset=utf-8",
                //        dataType: "json",
                //        success: function (response) {
                //            document.getElementById('PickCab').style.display = 'none';
                //            // Mostrar PickDet
                //            document.getElementById('PickDet').style.display = 'block';
                //            document.getElementById("titPick").value = document.getElementById("txtDocNum").value + "-" + document.getElementById("txtCardName").value + "\n" +
                //                "Comentarios: " + document.getElementById("txtComentarios").value;
                //            document.getElementById("Itemtxt").value = "";
                //            CALLMetodoDividido(response.d.message, response.d.lineaCaptura, response.d.PorcAvance);
                //            document.getElementById("btnTerminar").disabled = false
                //            $('#blockui-card-1').unblock();
                //        },
                //        error: function (response) {
                //            console.log(response);
                //            $('#blockui-card-1').unblock();
                //            Swal.fire({
                //                icon: "error",
                //                title: "Error al consultar surtido",
                //                text: response.responseJSON.d.message
                //            });
                //        }
                //    });
                //}

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
            document.getElementById("Itemtxt").value = "";
            $('#blockui-card-1').unblock();

            Swal.fire({
                icon: "error",
                title: "Error al insertar surtido",
                text: request.responseJSON.d.message
            });
        }
    });

    
}

function GetUoMList(callback)
{
    /*return '<option value="">-- Selecciona --</option>';*/
    $.ajax({
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "WfPicking.aspx/GetListOfUoM",
        data: JSON.stringify({ ItemCode: document.getElementById('Itemtxt').value }),
        success: function (response) {
            callback(response.d);
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


