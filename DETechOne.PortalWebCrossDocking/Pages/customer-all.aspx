<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/Default.Master" AutoEventWireup="true" CodeBehind="customer-all.aspx.cs" Inherits="DETechOne.PortalWebCrossDocking.Pages.customer_all" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
  <style>
    /* Misma línea de estilo que tu formulario previo */
    .card-body .row, .card-footer .row { margin-left:0!important; margin-right:0!important; }
    .card-body .row > [class^="col-"], .card-body .row > [class*=" col-"],
    .card-footer .row > [class^="col-"], .card-footer .row > [class*=" col-"] {
      padding-left: calc(var(--bs-gutter-x,1.5rem)/2);
      padding-right: calc(var(--bs-gutter-x,1.5rem)/2);
    }
    .form-section-title { margin-bottom:.75rem; color:#6c757d; text-transform:uppercase; letter-spacing:.03em; font-weight:600; }
    .table thead th { white-space:nowrap; }
    .icon-btn { border:0; background:transparent; padding:.25rem; line-height:1; cursor:pointer; }

    /* Forzar que el modal se vea completo (el theme a veces lo pisa) */
    #modalCliente .modal-dialog { max-width: 980px; }
    #modalCliente .modal-content { border-radius:.75rem; overflow:visible; }
    #modalCliente .modal-body {
      display:block; overflow:auto;
      max-height:calc(100vh - 180px);
      padding: 1rem 1.25rem;
    }
    #modalCliente .modal-body .row,
    #modalCliente .modal-footer .row { margin-left:0; margin-right:0; }
    #modalCliente .modal-body .row > [class^="col-"],
    #modalCliente .modal-body .row > [class*=" col-"] { padding-left:.75rem; padding-right:.75rem; }
    #modalCliente .form-section-title { margin:.5rem 0 .75rem; color:#6c757d; text-transform:uppercase; letter-spacing:.03em; font-weight:600; }
  </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
  <h3>Clientes</h3>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">

<div class="container-xxl py-4">
  <div class="row g-4 mx-0">
    <div class="col-12">
      <div class="card shadow-sm">
        <div class="card-header d-flex align-items-center justify-content-between">
          <h5 class="mb-0">Clientes — Cross Docking</h5>
          <span class="text-muted small">Ejemplos precargados</span>
        </div>

        <div class="card-body">
          <div class="row mx-0">
            <div class="col-12">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0" id="tablaClientes">
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
                    <!-- Fijo: 3 clientes de ejemplo -->
                    <tr data-id="C0001">
                      <td>C0001</td>
                      <td>Logística Norte SA de CV</td>
                      <td>LogiNorte</td>
                      <td class="text-uppercase">LNS200101ABC</td>
                      <td>contacto@loginorte.mx</td>
                      <td>+52 81 5555 1234</td>
                      <td>Sí</td>
                      <td>Tarima</td>
                      <td class="text-center">
                        <button type="button" class="icon-btn btn-editar" title="Ver / Editar">
                          <span class="material-icons-two-tone">edit</span>
                        </button>
                      </td>
                    </tr>
                    <tr data-id="C0002">
                      <td>C0002</td>
                      <td>Comercial Delta SA de CV</td>
                      <td>Delta</td>
                      <td class="text-uppercase">DEL150630XYZ</td>
                      <td>ventas@delta.mx</td>
                      <td>+52 55 1234 5678</td>
                      <td>No</td>
                      <td>Caja</td>
                      <td class="text-center">
                        <button type="button" class="icon-btn btn-editar" title="Ver / Editar">
                          <span class="material-icons-two-tone">edit</span>
                        </button>
                      </td>
                    </tr>
                    <tr data-id="C0003">
                      <td>C0003</td>
                      <td>María López</td>
                      <td></td>
                      <td class="text-uppercase">LOMM8501019H0</td>
                      <td>maria.lopez@mail.com</td>
                      <td>+52 33 2222 0099</td>
                      <td>Sí</td>
                      <td>Mixto</td>
                      <td class="text-center">
                        <button type="button" class="icon-btn btn-editar" title="Ver / Editar">
                          <span class="material-icons-two-tone">edit</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="card-footer bg-transparent">
          <div class="row mx-0">
            <div class="col-12 text-end">
              <button type="button" class="btn btn-primary">
                <span class="material-icons-two-tone align-text-bottom" style="font-size:18px;">add</span>
                Nuevo cliente
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

<!-- ===== Modal Ver/Editar (único, limpio, BS5 beta3) ===== -->
<div class="modal fade" id="modalCliente" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Cliente — <span id="modalCodigo">—</span></h5>
        <!-- Solo BS5: sin span interno -->
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>

      <div class="modal-body">
        <!-- Contenedor (no <form> anidado) -->
        <div id="formEditCliente" class="needs-validation" data-form="modal">
          <div class="row g-3 mx-0 mb-2">
            <div class="col-md-4">
              <label class="form-label">Código</label>
              <input type="text" class="form-control" id="codigoVisible" readonly>
              <input type="hidden" name="id" id="codigoHidden">
            </div>
          </div>

          <div class="mb-3">
            <h6 class="form-section-title">Identificación</h6>
            <div class="row g-3 mx-0">
              <div class="col-md-3">
                <label class="form-label">Tipo de cliente *</label>
                <select class="form-select form-control" name="tipo_cliente" required>
                  <option value="">Selecciona…</option>
                  <option>Empresa</option>
                  <option>Persona</option>
                </select>
              </div>
              <div class="col-md-5">
                <label class="form-label">Razón social *</label>
                <input type="text" class="form-control" name="razon_social" required>
              </div>
              <div class="col-md-4">
                <label class="form-label">Nombre comercial</label>
                <input type="text" class="form-control" name="nombre_comercial">
              </div>
              <div class="col-md-4">
                <label class="form-label">RFC / Tax ID *</label>
                <input type="text" class="form-control text-uppercase" name="rfc"
                       pattern="^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{2,3}$" required>
              </div>
              <div class="col-md-4">
                <label class="form-label">Correo *</label>
                <input type="email" class="form-control" name="email_contacto" required>
              </div>
              <div class="col-md-4">
                <label class="form-label">Teléfono *</label>
                <input type="tel" class="form-control" name="telefono"
                       pattern="^[0-9+\-\s()]{10,20}$" required>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <h6 class="form-section-title">Operación y condiciones</h6>
            <div class="row g-3 mx-0">
              <div class="col-md-4">
                <label class="form-label">Requiere cita *</label>
                <select class="form-select form-control" name="requiere_cita" required>
                  <option value="">Selecciona…</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">Empaque *</label>
                <select class="form-select form-control" name="empaque" required>
                  <option value="">Selecciona…</option>
                  <option>Caja</option>
                  <option>Tarima</option>
                  <option>Mixto</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">Método de pago *</label>
                <select class="form-select form-control" name="metodo_pago" required>
                  <option value="">Selecciona…</option>
                  <option>Transferencia</option>
                  <option>Tarjeta</option>
                  <option>30 días</option>
                  <option>Contado</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">Días de crédito</label>
                <input type="number" class="form-control" name="dias_credito" min="0" max="120" step="5">
              </div>
              <div class="col-md-4">
                <label class="form-label">Moneda</label>
                <select class="form-select form-control" name="moneda">
                  <option>MXN</option>
                  <option>USD</option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label">Observaciones</label>
                <textarea class="form-control" name="observaciones" rows="2"></textarea>
              </div>
            </div>
          </div>
        </div><!-- /#formEditCliente -->
      </div><!-- /.modal-body -->

      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" id="btnGuardarCambios" class="btn btn-primary">Guardar cambios</button>
      </div>
    </div>
  </div>
</div>

</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsContent" runat="server">
<script>
    (function () {
        'use strict';

        function init() {
            var tbody = document.querySelector('#tablaClientes tbody');
            var cont = document.getElementById('formEditCliente'); // contenedor
            var modalEl = document.getElementById('modalCliente');
            var spanCodigo = document.getElementById('modalCodigo');
            var codigoVisible = document.getElementById('codigoVisible');
            var codigoHidden = document.getElementById('codigoHidden');
            var btnGuardar = document.getElementById('btnGuardarCambios');

            if (!tbody || !cont || !modalEl) return;

            // Datos fijos
            var clientes = {
                C0001: { id: 'C0001', tipo_cliente: 'Empresa', razon_social: 'Logística Norte SA de CV', nombre_comercial: 'LogiNorte', rfc: 'LNS200101ABC', email_contacto: 'contacto@loginorte.mx', telefono: '+52 81 5555 1234', requiere_cita: 'si', empaque: 'Tarima', metodo_pago: 'Transferencia', dias_credito: 30, moneda: 'MXN', observaciones: 'Cruce nocturno' },
                C0002: { id: 'C0002', tipo_cliente: 'Empresa', razon_social: 'Comercial Delta SA de CV', nombre_comercial: 'Delta', rfc: 'DEL150630XYZ', email_contacto: 'ventas@delta.mx', telefono: '+52 55 1234 5678', requiere_cita: 'no', empaque: 'Caja', metodo_pago: 'Contado', dias_credito: 0, moneda: 'MXN', observaciones: '' },
                C0003: { id: 'C0003', tipo_cliente: 'Persona', razon_social: 'María López', nombre_comercial: '', rfc: 'LOMM8501019H0', email_contacto: 'maria.lopez@mail.com', telefono: '+52 33 2222 0099', requiere_cita: 'si', empaque: 'Mixto', metodo_pago: 'Tarjeta', dias_credito: 0, moneda: 'USD', observaciones: 'Requiere etiquetas SSCC' }
            };

            // Helpers
            function q(name) { return cont.querySelector('[name="' + name + '"]'); }
            function setVal(name, v) { var el = q(name); if (el) el.value = (v ?? ''); }

            // Instancia del modal (BS5 beta3 no trae getInstance/getOrCreateInstance)
            var modalInstance = null;
            function openModal(el) {
                if (window.bootstrap && typeof window.bootstrap.Modal === 'function') {
                    modalInstance = new bootstrap.Modal(el);
                    modalInstance.show();
                } else if (window.jQuery) {
                    jQuery(el).modal('show');
                }
            }
            function closeModal(el) {
                if (modalInstance && typeof modalInstance.hide === 'function') {
                    modalInstance.hide();
                } else if (window.jQuery) {
                    jQuery(el).modal('hide');
                }
            }

            // Click en editar
            tbody.addEventListener('click', function (e) {
                var btn = e.target.closest('.btn-editar');
                if (!btn) return;
                e.preventDefault();

                var tr = btn.closest('tr');
                var id = tr && tr.dataset && tr.dataset.id;
                var c = id && clientes[id];
                if (!c) return;

                spanCodigo.textContent = c.id;
                codigoVisible.value = c.id;
                codigoHidden.value = c.id;

                setVal('tipo_cliente', c.tipo_cliente);
                setVal('razon_social', c.razon_social);
                setVal('nombre_comercial', c.nombre_comercial);
                setVal('rfc', c.rfc);
                setVal('email_contacto', c.email_contacto);
                setVal('telefono', c.telefono);
                setVal('requiere_cita', c.requiere_cita);
                setVal('empaque', c.empaque);
                setVal('metodo_pago', c.metodo_pago);
                setVal('dias_credito', c.dias_credito);
                setVal('moneda', c.moneda);
                setVal('observaciones', c.observaciones);

                openModal(modalEl);
            });

            // Guardar demo (memoria)
            if (btnGuardar) {
                btnGuardar.addEventListener('click', function () {
                    var data = {
                        id: codigoHidden.value || codigoVisible.value,
                        tipo_cliente: q('tipo_cliente')?.value || '',
                        razon_social: q('razon_social')?.value || '',
                        nombre_comercial: q('nombre_comercial')?.value || '',
                        rfc: q('rfc')?.value || '',
                        email_contacto: q('email_contacto')?.value || '',
                        telefono: q('telefono')?.value || '',
                        requiere_cita: q('requiere_cita')?.value || '',
                        empaque: q('empaque')?.value || '',
                        metodo_pago: q('metodo_pago')?.value || '',
                        dias_credito: Number(q('dias_credito')?.value || 0),
                        moneda: q('moneda')?.value || '',
                        observaciones: q('observaciones')?.value || ''
                    };
                    if (clientes[data.id]) clientes[data.id] = Object.assign({}, clientes[data.id], data);
                    closeModal(modalEl);
                });
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    })();
</script>
</asp:Content>
