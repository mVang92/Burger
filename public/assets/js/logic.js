// Make sure we wait to attach our handlers until the DOM is fully loaded.
console.log("Logic linked!")

$(function () {
    $(".deleteBurger").click(function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        console.log(id);
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("Deleted: ", id);
                location.reload();
            }
        );
    });

    $(".devourBurger").click(function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        var objColVals = {
            devoured: true
        };
        console.log(id);
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: objColVals
        }).then(
            function() {
                console.log("Devoured: ", id);
                location.reload();
            }
        );
    });

    $(".createForm").submit(function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newBurger").val().trim()
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("New burger: ", newBurger.burger_name);
                location.reload();
            }
        );
    });
});