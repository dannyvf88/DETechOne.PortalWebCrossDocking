<%@ Page Language="C#" MasterPageFile="~/ErrorLayout.Master" AutoEventWireup="true" CodeBehind="NotFound.aspx.cs" Inherits="DETechOne.PortalWebCrossDocking.Pages.NotFound" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContainerError" runat="server">
    <div class="jumbotron">

        <h1 class="text-danger">Error 404</h1>

        <h2>Página no encontrada</h2>

        <p class="lead">Lo sentimos, la ruta que solicitaste no existe o ha sido movida.</p>

        <p><a href="<%= ResolveUrl(System.Web.Security.FormsAuthentication.DefaultUrl) %>" class="btn btn-primary btn-lg">Volver al inicio &raquo;</a></p>

    </div>
</asp:Content>