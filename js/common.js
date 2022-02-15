function recommendAjax(type, id, eq) {
    var fNum = id;
    var fPage = Math.floor(fNum / 24) + 1;
    fNum = Math.floor(fNum - 24 * (fPage - 1));

    $.ajax({
        url: "{LoadItemsPageURL}" + fPage + "{LoadItemsPageURLParams}",
        dataType: "html",
    }).done(function (data) {
        var target = $(data)
            .children()
            .eq(parseInt(fNum) - 1);

        var img = $(target).children().children(".card-image").children().attr("src");

        var link = $(target).children().attr("href");

        var name = $(target)
            .children()
            .children(".card-body")
            .children(".item-meta")
            .children(".card-title")
            .text();

        var price = $(target)
            .children()
            .children(".card-body")
            .children(".item-meta")
            .children(".item-price")
            .text();

        var col = $("#" + type)
            .children(".recommend-box")
            .eq(eq)
            .children();
        col.attr("href", link);
        col.children(".recommend-img").append('<img src="' + img + ' alt="' + name + '">');
        col.children(".recommend-name").text(name);
        col.children(".recommend-price").text(price);
    });
}

$(function () {
    $.when(recommendAjax("meat", "{text:meatId1}", 0))
        .then(recommendAjax("meat", "{text:meatId2}", 1))
        .then(recommendAjax("meat", "{text:meatId3}", 2))
        .then(recommendAjax("meat", "{text:meatId4}", 3))
        .then(recommendAjax("meat", "{text:meatId5}", 4))
        .then(recommendAjax("meat", "{text:meatId6}", 5))
        .fail(function () {});

    $.when(recommendAjax("fish", "{text:fishId1}", 0))
        .then(recommendAjax("fish", "{text:fishId2}", 1))
        .then(recommendAjax("fish", "{text:fishId3}", 2))
        .then(recommendAjax("fish", "{text:fishId4}", 3))
        .then(recommendAjax("fish", "{text:fishId5}", 4))
        .then(recommendAjax("fish", "{text:fishId6}", 5))
        .fail(function () {});

    $.when(recommendAjax("soup", "{text:soupId1}", 0))
        .then(recommendAjax("soup", "{text:soupId2}", 1))
        .then(recommendAjax("soup", "{text:soupId3}", 2))
        .then(recommendAjax("soup", "{text:soupId4}", 3))
        .then(recommendAjax("soup", "{text:soupId5}", 4))
        .then(recommendAjax("soup", "{text:soupId6}", 5))
        .fail(function () {});
});
