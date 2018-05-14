var uriSL = 'api/ShoppingListsEF/';
var uriIt = 'api/ItemsEF/';
var currentList = {};

$(document).ready(function () {
    console.info("OK");

    getShoppingLists();
    hideShoppingList();

    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");
    if (idIndex != -1) {
        getShoppingListById(pageUrl.substring(idIndex + 4));
    }
})

function hideShoppingList() {
    $('#shoppingListDiv').hide();
    $('#createListDiv').show();
}

function formatShoppingList(shoppingList) {
    return shoppingList.Name + ': ' + shoppingList.Items.length + ' items';
}

function getShoppingListById(id) {
    $.ajax({
        type: "GET",
        dataTye: "json",
        url: uriSL + id,
        success: function (result) {
            currentList = result;
            showShoppingList();
            drawItems();
        }
    });
}

function showShoppingList() {
    $('#shoppingListTitle').html(currentList.Name);

    $('#shoppingListDiv').show();
    $('#createListDiv').hide();
}

function drawItems() {
    var $list = $('#shoppingListItems').empty();

    for (var i = 0; i < currentList.Items.length; i++) {
        var currentItem = currentList.Items[i];
        var $li = $("<li>").html(currentItem.Name)
            .attr("id", "item_" + i);
        var $deleteBtn = $("<button onclick='deleteItem(" + currentItem.Id + ")'>D</button>").appendTo($li);
        var $checkBtn = $("<button onclick='checkItem(" + currentItem.Id + ")'>C</button>").appendTo($li);

        if (currentItem.Checked) {
            $li.addClass("checked");
        }

        $li.appendTo($list);
    }
}

function checkItem(id) {
    var changedItem = {};

    for (var i = 0; i < currentList.Items.length; i++) {
        if (currentList.Items[i].Id == id) {
            changedItem = currentList.Items[i];
            break;
        }
    }

    changedItem.Checked = !changedItem.Checked;

    $.ajax({
        type: 'PUT',
        dataType: 'json',
        data: changedItem,
        url: uriIt + id,
        success: function (result) {
            changedItem = result;
            drawItems();
        }
    })
}

function deleteItem(id) {
    $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: uriIt + id,
        success: function (result) {
            currentList = result;
            drawItems();
        }
    })
}

function addItem() {
    var newItem = {};
    newItem.Name = $('#newItemName').val();
    newItem.ShoppingListId = currentList.Id;

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: uriIt,
        data: newItem,
        success: function (result) {
            $('#newItemName').val('');
            currentList = result;
            drawItems();
        }
    })
}

function createList() {
    var newList = {};
    newList.Name = $('#newShoppingListName').val();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: uriSL,
        data: newList,
        success: function (result) {
            currentList = result;
            window.location.href = window.location.href + '?id=' + currentList.Id;
        }
    })

}

function deleteShoppingList(id) {
    $.ajax({
        type: 'DELETE',
        dataType: 'json',
        url: uriSL + id,
        success: function (result) {
            getShoppingLists();
        }
    })
}

function getShoppingLists() {
    $shoppingLists = $("#shoppingLists").empty();
    $.getJSON(uriSL)
        .done(function (data) {
            // On success, 'data' contains a list of products.
            $.each(data, function (key, item) {
                // Add a list item for the product.
                var $li = $('<li>').appendTo($shoppingLists);
                $('<a>', { text: formatShoppingList(item), href: 'indexShoppingList.html?id=' + item.Id }).appendTo($li);
                $("<button onclick='deleteShoppingList(" + item.Id + ")'>D</button>").appendTo($li);
            });
        });
}