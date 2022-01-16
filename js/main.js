//business interface logic
function Pizza(pizza, size, crust, toppings) {
    this.pizza = pizza;
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
}

var priceSize, priceCrust, priceTopping;

//calculate pizza price
var price = function(pizzaSize, pizzaCrust, pizzaTopping) {
    switch (pizzaSize) {
        case "":
            priceSize = 0;
            break;
        case "large":
            priceSize = 1500;
            break;
        case "medium":
            priceSize = 900;
            break;
        case "small":
            priceSize = 750;
            break;
        default:
            location.reload();
            alert("Please select a pizza size");
    };

    switch (pizzaCrust) {
        case "":
            priceCrust = 0;
            break;
        case "cracker":
            priceCrust = 150;
            break;
        case "cheese":
            priceCrust = 250;
            break;
        case "thin":
            priceCrust = 350;
            break;
        default:
            location.reload();
            alert("Please choose a crust");
    };

    if (pizzaSize == 'large') {
        priceTopping = pizzaTopping.length * 150;
    } else if (pizzaSize == 'medium') {
        priceTopping = pizzaTopping.length * 100;
    } else if (pizzaSize == 'small') {
        priceTopping = pizzaTopping.length * 50;
    }

    var pizzaTotal = priceSize + priceCrust + priceTopping;
    return pizzaTotal;
}


// user interface logic
$(document).ready(function() {
    $("#order-online").click(function() {
        $(".two").show();
        $(".one").hide();
    })

    //Continue button
    $("#continue").click(function(event) {
        event.preventDefault();
        $(".three").show();
        $(".two").hide();
        //get form values
        let pizzaName = $("#pizza option:selected").val();
        let pizzaSize = $("#size option:selected").val();
        let pizzaCrust = $("#crust option:selected").val();
        var pizzaTopping = [];
        $("input:checkbox[name=toppings]:checked").each(function() {
            pizzaTopping.push($(this).val());
        });

        var total = price(pizzaSize, pizzaCrust, pizzaTopping);
        var grandTotal = total + 150;
        var order = new Pizza(pizzaName, pizzaSize, pizzaCrust, pizzaTopping)
        $(".current-order").append('<tr><td id="name">' + order.pizza + '</td><td id="size">' + order.size + '</td><td id="crust">' + order.crust + '</td><td id="toppings">' + order.toppings + '</td><td id="total">' + total);

        //Pickup button
        $("#pick-up").click(function() {
            alert("Dear customer, your order will be ready for pickup in 1 hour. Your order total is: " + total);

            //refresh page
            location.reload();
        })

        //Checkout button
        $("#checkout").click(function() {
            //form data
            var clientName = $("#full-name").val();
            var clientNumber = $("#phone-number").val();
            var clientLocation = $("#location").val();

            if (clientName === "" || clientNumber === "" || clientLocation === "") {
                alert("Please fill in the delivery form. All fields are required")
            } else {
                alert("Dear " + clientName + " your order will be delivered to " + clientLocation + " within the hour! Your order total is: " +
                    grandTotal + " Our rider will call you on arrival");
            }
        })
    })


    //Add another pizza
    $("#add").click(function(event) {
        event.preventDefault();

        //Add an extra order
        $(".three").hide();
        $(".four").hide();
        $(".two").show();
        document.getElementById("form1").reset();
    })

    //Delivery button
    $("#delivery").click(function() {
        $(".table-buttons").hide();
        $(".four").slideDown();
    })
})