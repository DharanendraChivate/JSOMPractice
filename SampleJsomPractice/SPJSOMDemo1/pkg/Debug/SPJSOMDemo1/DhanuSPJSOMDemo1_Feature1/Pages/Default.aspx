﻿<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <%--<script type="text/javascript" src="../Scripts/jquery-1.9.1.js"></script>--%>
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="Stylesheet" type="text/css" href="../Css/bootstrap.min.css" />
    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    
</asp:Content>


<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<%--<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>--%>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div class="row">
        <h1 id="messageSiteName" style="font-family: cursive; text-align:center;">
            <!-- The following content will be replaced with the user name when you run the app - see App.js -->
            initializing...
        </h1>
    </div>
    <div class="row" style="margin-top: 5%;background-color: #8080803b;">
        <div class="col-sm-3" style="margin-top: 2%; margin-bottom: 1%;">
            <ol>
                <li style="margin-bottom: 3%;">
                    <button type="button" class="btn btn-primary btn-sm" id="loadButton">Display Lists</button>
                </li>
                <li style="margin-bottom: 3%;">
                    <button type="button" class="btn btn-info btn-sm" id="nestedIncludesButton">Display Lists And Fields</button>
                </li>
                <li style="margin-bottom: 3%;">
                    <button type="button" class="btn btn-primary btn-sm" id="createListButton">Create List</button>
                </li>
                <li style="margin-bottom: 3%;">
                    <button type="button" class="btn btn-info btn-sm" id="camlQueriesButton">Filter Data From List</button>
                </li>
                <li style="margin-bottom: 3%;">
                    <button type="button" class="btn btn-primary btn-sm" id="dataBindingButton">Data Binding</button>
                </li>
                <li style="margin-bottom: 3%;">
                    <button type="button" class="btn btn-info btn-sm" id="batchExceptionHandling">Batch Exception Handling</button>
                </li>
                <li style="margin-bottom: 3%;">
                    <button type="button" class="btn btn-info btn-sm" id="createItemButton">Batch Exception Handling</button>
                </li>
                <li style="margin-bottom: 3%;">
                    <button type="button" class="btn btn-info btn-sm" id="updateItemButton">Batch Exception Handling</button>
                </li>
            </ol>
        </div>
        <div class="col-sm-9 text-primary border border-info" style="margin-top: 2%; margin-bottom: 1%;" id="DataMessage">

        </div>
    </div>

</asp:Content>
