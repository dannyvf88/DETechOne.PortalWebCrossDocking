<%@ Page Title="" Language="C#" MasterPageFile="~/SiteMaster.Master" AutoEventWireup="true" CodeBehind="Clientes.aspx.cs" Inherits="DETechOne.PortalWebCrossDocking.Pages.Clientes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="loginContainer" runat="server">
    <style>
        .selected-row {
            background-color: #70a1f5; /* Color de fondo al seleccionar */
            color: white; /* Cambiar color del texto a blanco */
        }
    </style>

    <div class="content-wrapper">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="page-description" style="display: flex; justify-content: space-between; align-items: center;">
                        <h1 id="lblTitle" runat="server">Clientes</h1>
                        <div class="button-group" style="display: flex; gap: 5px; flex-direction: row;">
                            <button type="button" id="btnAddBox" class="btn btn-light btn-burger" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar caja" disabled="true" style="width: 30px; height: 30px; padding: 0; display: flex; justify-content: center; align-items: center;" onclick="AddNewBox();">
                                <i class="material-icons" style="font-size: 16px; line-height: 1;">add</i>
                            </button>
                            <button type="button" class="btn btn-light btn-burger" data-bs-toggle="tooltip" data-bs-placement="top" title="Regresar" style="width: 30px; height: 30px; padding: 0; display: flex; justify-content: center; align-items: center;" onclick="window.location.href='Default.aspx'">
                                <i class="material-icons" style="font-size: 16px; line-height: 1;">arrow_back</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="PickDet" >
                <div class="col">
                    <div class="tab-content">
                        <div class="tab-pane fade active show">
                            <div class="card" id="blockui-card-1">
                                <div class="card-body">                                    
                                    <div class="row mb1 table-responsive">
                                        <div class="col">
                                            <div class="card">
                                                <div class="card-header">
                                                    <h5 class="card-title">Listado de clientes</h5>
                                                </div>
                                                <div class="card-body">
                                                    <%-- datatable1 --%>
                                                    <table id="datatable1" class="display" style="width: 100%">
                                                        <thead>
                                                            <tr>
                                                                <th>Clave</th>
                                                                <th>Razón social</th>
                                                                <th>Nombre comercial</th>
                                                                <th>RFC</th>
                                                                <th>Correo</th>
                                                                <th>Teléfono</th>
                                                                <th>Requiere cita</th>
                                                                <th>Empaque</th>
                                                                <th class="text-center">Acciones</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <!-- Aquí se generarán las filas dinámicamente -->
                                                        </tbody>
                                                    </table>
                                                    <asp:Literal ID="EtructurasEmpaqueDataLiteral" runat="server" EnableViewState="false" Visible="false"></asp:Literal>
                                                    <asp:Literal ID="ItemsDataLiteral" runat="server" EnableViewState="false" Visible="false"></asp:Literal>
                                                    <asp:Literal ID="UoMDataLiteral" runat="server" EnableViewState="false" Visible="false"></asp:Literal>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal para mostrar las lineas de la entrega y sus porcentajes empacadas -->
            <div class="modal fade" id="exampleModalCenteredScrollable" tabindex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true" style="display: none;">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="MdTitle"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <table class="table" id="tbPacking">
                                    <thead>
                                        <tr>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Aquí se generarán las filas dinámicamente -->
                                    </tbody>
                                </table>

                                <asp:Literal ID="uADataLiteral" runat="server" EnableViewState="false" Visible="false"></asp:Literal>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row" id="ListaCajas">
                </div>
            </div>
        </div>

    </div>
    <script type="text/javascript">
    </script>
</asp:Content>
