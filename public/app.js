// get article as JSON file
$.getJSON("/article", function(data) { 

    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

$(document).on("click", "p", function() {
    $("#comments").empty();
    var thisId = $(this).attr("data-id");

    $.ajax( {
        method: "GET",
        url: "/articles/" + thisId
    })

    .then(function(data) {
        
        console.log(data)
        
        $("#comments").append("<h2>" + data.title + "</h2>");

        $("#comments").append("<h2>" + data.title + "</h2>");

        $("#comments").append("<h2>" + data.title + "</h2>");

        $("#comments").append("<h2>" + data.title + "</h2>");
    })
})