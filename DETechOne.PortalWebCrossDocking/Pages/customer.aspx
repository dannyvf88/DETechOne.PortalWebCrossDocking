<%@ Page Title="" Language="C#" MasterPageFile="~/Pages/Default.Master" AutoEventWireup="true" CodeBehind="customer.aspx.cs" Inherits="DETechOne.PortalWebCrossDocking.Pages.customer" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
   <h3>Registro de Clientes</h3> 
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <style>
  /* Alinear contenido con bordes dentro de cards */
  .card-body .row,
  .card-footer .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  /* Asegurar padding de columnas (gutter interno) */
  .card-body .row > [class^="col-"],
  .card-body .row > [class*=" col-"],
  .card-footer .row > [class^="col-"],
  .card-footer .row > [class*=" col-"] {
    padding-left: calc(var(--bs-gutter-x, 1.5rem) / 2);
    padding-right: calc(var(--bs-gutter-x, 1.5rem) / 2);
  }
  /* Título de sección con mismo alineado que inputs */
  .form-section-title {
    margin-bottom: .75rem;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: .03em;
    font-weight: 600;
  }
</style>

<div class="container-xxl py-4">
  <div class="row g-4 mx-0">
    <div class="col-12">
      <div class="card shadow-sm">
        <div class="card-header d-flex align-items-center justify-content-between">
          <h5 class="mb-0">Alta de Cliente — Cross Docking</h5>
          <span class="text-muted small">Campos marcados con * son obligatorios</span>
        </div>

        <form id="formClienteCrossDock" class="needs-validation" novalidate>
          <div class="card-body">

            <!-- Identificación -->
            <div class="mb-4">
              <div class="row mx-0">
                <div class="col-12">
                  <h6 class="form-section-title">Identificación</h6>
                </div>
              </div>
              <div class="row g-3 mx-0">
                <div class="col-md-3">
                  <label class="form-label">Tipo de cliente *</label>
                  <select class="form-select" name="tipo_cliente" required>
                    <option value="">Selecciona…</option>
                    <option>Empresa</option>
                    <option>Persona</option>
                  </select>
                  <div class="invalid-feedback">Selecciona el tipo de cliente.</div>
                </div>

                <div class="col-md-5">
                  <label class="form-label">Razón social *</label>
                  <input type="text" class="form-control" name="razon_social" required>
                  <div class="invalid-feedback">La razón social es obligatoria.</div>
                </div>

                <div class="col-md-4">
                  <label class="form-label">Nombre comercial</label>
                  <input type="text" class="form-control" name="nombre_comercial">
                </div>

                <div class="col-md-4">
                  <label class="form-label">RFC / Tax ID *</label>
                  <input type="text" class="form-control text-uppercase" name="rfc"
                         pattern="^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{2,3}$" required
                         placeholder="ABC123456XYZ">
                  <div class="form-text">Formato RFC mexicano (personas/empresas).</div>
                  <div class="invalid-feedback">Ingresa un RFC válido.</div>
                </div>

                <div class="col-md-4">
                  <label class="form-label">Correo de contacto *</label>
                  <input type="email" class="form-control" name="email_contacto" required>
                  <div class="invalid-feedback">Ingresa un correo válido.</div>
                </div>

                <div class="col-md-4">
                  <label class="form-label">Teléfono *</label>
                  <input type="tel" class="form-control" name="telefono"
                         pattern="^[0-9+\-\s()]{10,20}$" required placeholder="+52 55 1234 5678">
                  <div class="invalid-feedback">Ingresa un teléfono válido.</div>
                </div>
              </div>
            </div>

            <!-- Dirección fiscal -->
            <div class="mb-4">
              <div class="row mx-0">
                <div class="col-12">
                  <h6 class="form-section-title">Dirección fiscal</h6>
                </div>
              </div>
              <div class="row g-3 mx-0">
                <div class="col-md-6">
                  <label class="form-label">Calle y número *</label>
                  <input type="text" class="form-control" name="calle" required>
                  <div class="invalid-feedback">Este campo es obligatorio.</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Colonia / Barrio *</label>
                  <input type="text" class="form-control" name="colonia" required>
                  <div class="invalid-feedback">Este campo es obligatorio.</div>
                </div>
                <div class="col-md-3">
                  <label class="form-label">Ciudad *</label>
                  <input type="text" class="form-control" name="ciudad" required>
                  <div class="invalid-feedback">Este campo es obligatorio.</div>
                </div>
                <div class="col-md-3">
                  <label class="form-label">Estado / Provincia *</label>
                  <input type="text" class="form-control" name="estado" required>
                  <div class="invalid-feedback">Este campo es obligatorio.</div>
                </div>
                <div class="col-md-3">
                  <label class="form-label">Código Postal *</label>
                  <input type="text" class="form-control" name="cp" pattern="^\d{4,10}$" required>
                  <div class="invalid-feedback">Ingresa un CP válido.</div>
                </div>
                <div class="col-md-3">
                  <label class="form-label">País *</label>
                  <input type="text" class="form-control" name="pais" required value="México">
                  <div class="invalid-feedback">Este campo es obligatorio.</div>
                </div>
              </div>
            </div>

            <!-- Operación logística -->
            <div class="mb-4">
              <div class="row mx-0">
                <div class="col-12">
                  <h6 class="form-section-title">Operación logística</h6>
                </div>
              </div>
              <div class="row g-3 mx-0">
                <div class="col-md-4">
                  <label class="form-label">Tipo de operación *</label>
                  <select class="form-select" name="tipo_operacion" required>
                    <option value="">Selecciona…</option>
                    <option>Cross docking nacional</option>
                  </select>
                  <div class="invalid-feedback">Selecciona el tipo de operación.</div>
                </div>

               
         

                <div class="col-md-4">
                  <label class="form-label">Requiere cita *</label>
                  <select class="form-select" name="requiere_cita" required>
                    <option value="">Selecciona…</option>
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                  </select>
                  <div class="invalid-feedback">Indica si requiere cita.</div>
                </div>

              

                <div class="col-md-4">
                  <label class="form-label">Empaque *</label>
                  <select class="form-select" name="empaque" required>
                    <option value="">Selecciona…</option>
                    <option>Caja</option>
                    <option>Tarima</option>
                    <option>Mixto</option>
                  </select>
                  <div class="invalid-feedback">Selecciona el tipo de empaque.</div>
                </div>

                

             

                <div class="col-12">
                  <label class="form-label">Documentación requerida</label>
                  <div class="row g-2 mx-0">
                    <div class="col-md-3">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="docs[]" value="packing_list" id="doc1">
                        <label class="form-check-label" for="doc1">Packing list</label>
                      </div>
                    </div>
                    
                   
                    <div class="col-md-3">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="docs[]" value="otros" id="doc4">
                        <label class="form-check-label" for="doc4">Otros</label>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- Condiciones comerciales -->
            <div class="mb-4">
              <div class="row mx-0">
                <div class="col-12">
                  <h6 class="form-section-title">Condiciones comerciales</h6>
                </div>
              </div>
              <div class="row g-3 mx-0">
                <div class="col-md-4">
                  <label class="form-label">Método de pago *</label>
                  <select class="form-select" name="metodo_pago" required>
                    <option value="">Selecciona…</option>
                    <option>Transferencia</option>
                    <option>Tarjeta</option>
                    <option>30 días</option>
                    <option>Contado</option>
                  </select>
                  <div class="invalid-feedback">Selecciona un método de pago.</div>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Días de crédito</label>
                  <input type="number" class="form-control" name="dias_credito" min="0" max="120" step="5" placeholder="0, 15, 30…">
                </div>
                <div class="col-md-4">
                  <label class="form-label">Moneda</label>
                  <select class="form-select" name="moneda">
                    <option>MXN</option>
                    <option>USD</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Observaciones -->
            <div class="mb-3">
              <div class="row mx-0">
                <div class="col-12">
                  <label class="form-label">Observaciones</label>
                </div>
                <div class="col-12">
                  <textarea class="form-control" name="observaciones" rows="3" placeholder="Notas internas, restricciones, instrucciones de cruce…"></textarea>
                </div>
              </div>
            </div>

            <!-- Aceptación -->
            <div class="mb-1">
              <div class="row mx-0">
                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="acepto" required>
                    <label class="form-check-label" for="acepto">
                      Confirmo que la información es correcta y acepto los términos de servicio *
                    </label>
                    <div class="invalid-feedback">Debes aceptar para continuar.</div>
                  </div>
                </div>
              </div>
            </div>

          </div><!-- /card-body -->

          <!-- Botonera en card-footer para respetar bordes inferiores -->
          <div class="card-footer bg-transparent">
            <div class="row mx-0">
              <div class="col-12 d-flex gap-2">
                <button type="submit" class="btn btn-primary">Guardar cliente</button>
                <button type="reset" class="btn btn-outline-secondary">Limpiar</button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
</div>



</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptsContent" runat="server">
</asp:Content>
