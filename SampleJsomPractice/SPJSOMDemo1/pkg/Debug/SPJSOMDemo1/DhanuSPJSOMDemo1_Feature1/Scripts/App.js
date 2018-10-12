'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        var context = SP.ClientContext.get_current();
        $("#ctl00_PlaceHolderSiteName_onetidProjectPropertyTitle").hide();
        getUserName();
        $("#ctl00_onetidHeadbnnr2").attr("src", "../Images/download.jpg");
        var web = context.get_web();
        context.load(web, "Title", "Description");

        /**************Click to perform some task*********/
        jQuery("#loadButton").click(loadAndInclude);
        jQuery("#nestedIncludesButton").click(nestedIncludes);
        jQuery("#camlQueriesButton").click(camlQueries);
        jQuery("#dataBindingButton").click(dataBinding);
        jQuery("#createListButton").click(createList);
        jQuery("#batchExceptionButton").click(batchExceptionHandling);
        jQuery("#createItemButton").click(createItem);
        jQuery("#updateItemButton").click(updateItem);
        //jQuery("#proxyButton").click(webProxy);
        //jQuery("#hostButton").click(callToHostWeb);
    });

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetUserNameSuccess() {
        $('#messageSiteName').text('Hello ' + user.get_title());
    }

    // This function is executed if the above call fails
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }

    function loadAndInclude() {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();
        var lists = web.get_lists();
        context.load(web, "Title", "Description");
        context.load(lists, "Include(Title)");
        context.executeQueryAsync(success, fail);

        function success() {
            var message = jQuery("#DataMessage");
            message.text(web.get_title());
            var lenum = lists.getEnumerator();
            while (lenum.moveNext()) {
                message.append("<br />");
                message.append(lenum.get_current().get_title());
            }
        }

        function fail(sender, args) {
            alert("Call failed. Error: " +
                args.get_message());
        }
    }

    function nestedIncludes() {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();
        var lists = web.get_lists();
        context.load(web, "Title", "Description");
        context.load(lists, "Include(Title, Fields.Include(Title))");
        context.executeQueryAsync(success, fail);

        function success() {
            var message = jQuery("#DataMessage");
            message.text(web.get_title());
            var lenum = lists.getEnumerator();
            while (lenum.moveNext()) {
                var list = lenum.get_current();
                message.append("<br />");
                message.append(list.get_title()).css("color", "blue");
                var fenum = list.get_fields().getEnumerator();
                var i = 0;
                while (fenum.moveNext()) {
                    var field = fenum.get_current();
                    message.append("<br />&nbsp;&nbsp;&nbsp;&nbsp;");
                    message.append(field.get_title()).css("color", "green");
                    if (i++ > 5) break;
                }
            }
            //while (lenum.moveNext()) {
            //    var list = lenum.get_current();
            //    message.append("<ul style='list-style-type: circle;'>").text(message.append(field.get_title()));
            //    //.css("color", "blue");
            //    var fenum = list.get_fields().getEnumerator();
            //    var i = 0;
            //    while (fenum.moveNext()) {
            //        var field = fenum.get_current();
            //        message.append("<li>").text(message.append(field.get_title()));//.css("color", "green");
            //        message.append("</li>");
            //        if (i++ > 5) break;
            //    }
            //    message.append("</ul>");
            //}
        }

        function fail(sender, args) {
            alert("Call failed. Error: " +
                args.get_message());
        }
    }


    /*****************Create List**********************/
    function createList() {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();

        try {
            var lci = new SP.ListCreationInformation();
            lci.set_title("Tasks");
            lci.set_templateType(SP.ListTemplateType.tasks);
            lci.set_quickLaunchOption(SP.QuickLaunchOptions.on);
            var list = web.get_lists().add(lci);

            context.executeQueryAsync(success, fail);
        } catch (ex) {
            alert(ex.message);
        }

        function success() {
            var message = jQuery("#DataMessage");
            message.text("List added");
        }

        function fail(sender, args) {
            alert("Call failed. Error: " +
                args.get_message());
        }
    }


    /*****************CAML Query*************************/

    function camlQueries() {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();
        var listname = prompt("Please Enter Valid List Name", "");
        var list = web.get_lists().getByTitle(listname);
        var columnName = prompt("Please Enter Valid Field/Column Name", "");
        var columnValue = prompt("Please Enter Value to be filtered", "");
        var query = new SP.CamlQuery();
        query.set_viewXml("<View>" +
            "<Query>" +
            "<Where><Eq>" +
            "<FieldRef Name=" + columnName + " " +
            "<Value Type='Text'>" + columnValue+ "</Value > " +
            "</Eq></Where>" +
            "</Query>" +
            "</View>");
        var items = list.getItems(query);
        context.load(web, "Title");
        context.load(items, "Include(ID, Title)");
        context.executeQueryAsync(success, fail);

        function success() {
            var message = jQuery("#DataMessage");
            message.text(web.get_title());
            var ienum = items.getEnumerator();
            while (ienum.moveNext()) {
                message.append("<br />");
                message.append(ienum.get_current().get_item("Title"));
            }
        }

        function fail(sender, args) {
            alert("Call failed. Error: " +
                args.get_message());
        }
    }


    function dataBinding() {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();
        var list = web.get_lists().getByTitle("Products");
        var query = new SP.CamlQuery();
        query.set_viewXml("<View>" +
            "<Query>" +
            "<Where><Eq>" +
            "<FieldRef Name='Category' " +
            "LookupId='True' />" +
            "<Value Type='Lookup'>1</Value>" +
            "</Eq></Where>" +
            "</Query>" +
            "<RowLimit>5</RowLimit>" +
            "</View>");
        var items = list.getItems(query);
        context.load(web, "Title");
        var itemsArray = context.loadQuery(items,
            "Include(Title, UnitsInStock, UnitPrice)");
        context.executeQueryAsync(success, fail);

        function success() {
            var message = jQuery("#DataMessage");
            message.text(web.get_title());
            message.append("<br/>");
            var template = jQuery("#products-template");
            message.append(template.render(itemsArray));
        }

        function fail(sender, args) {
            alert("Call failed. Error: " +
                args.get_message());
        }
    }

    /********************************batchExceptionHandling***************************** */
    function batchExceptionHandling() {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();
        var scope = null;

        try {
            var list = null;

            scope = new SP.ExceptionHandlingScope(context);
            var scopeStart = scope.startScope();

            var scopeTry = scope.startTry();
            list = web.get_lists().getByTitle("Tasks");
            context.load(list);
            scopeTry.dispose();

            var scopeCatch = scope.startCatch();
            var lci = new SP.ListCreationInformation();
            lci.set_title("Tasks");
            lci.set_quickLaunchOption(SP.QuickLaunchOptions.on);
            lci.set_templateType(SP.ListTemplateType.tasks);
            list = web.get_lists().add(lci);
            scopeCatch.dispose();

            var scopeFinally = scope.startFinally();
            list = web.get_lists().getByTitle("Tasks");
            context.load(list);
            scopeFinally.dispose();

            scopeStart.dispose();

            context.executeQueryAsync(success, fail);
        } catch (ex) {
            alert(ex.message);
        }

        function success() {
            var message = jQuery("#DataMessage");
            var status = scope.get_hasException() ? " created" : " loaded";
            message.text(list.get_title() + status);
        }

        function fail(sender, args) {
            alert("Call failed. Error: " +
                args.get_message());
        }
    }


    /*****************************Create Item**************************/
    function createItem() {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();

        try {
            var list = web.get_lists().getByTitle("Tasks");

            var ici = new SP.ListItemCreationInformation();
            var item = list.addItem(ici);
            item.set_item("Title", "Sample Task");
            item.set_item("AssignedTo", web.get_currentUser());
            var due = new Date();
            due.setDate(due.getDate() + 7);
            item.set_item("DueDate", due);
            item.update();

            context.executeQueryAsync(success, fail);
        } catch (ex) {
            alert(ex.message);
        }

        function success() {
            var message = jQuery("#DataMessage");
            message.text("Item added");
        }

        function fail(sender, args) {
            alert("Call failed. Error: " +
                args.get_message());
        }
    }

    /**************************************Update Item*************************************/
    function updateItem() {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();
        var items = null;

        try {
            var list = web.get_lists().getByTitle("Tasks");
            var query = new SP.CamlQuery();
            query.set_viewXml("<View><RowLimit>1</RowLimit></View>");
            var qitems = list.getItems(query);
            items = context.loadQuery(qitems);
            context.executeQueryAsync(success1, fail);
        } catch (ex) {
            alert(ex.message);
        }

        function success1() {
            if (items.length > 0) {
                var item = items[0];
                item.set_item("Status", "In Progress");
                item.set_item("PercentComplete", 0.10);
                item.update();
            }

            context.executeQueryAsync(success2, fail);
        }

        function success2() {
            var message = jQuery("#DataMessage");
            message.text("Item updated");
        }

        function fail(sender, args) {
            alert("Call failed. Error: " +
                args.get_message());
        }
    }

}
