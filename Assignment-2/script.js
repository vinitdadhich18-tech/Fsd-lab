let form = document.getElementById("bookingForm");
let result = document.getElementById("result");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let aadhar = document.getElementById("AdharNumber").value;
    let city = document.getElementById("city").value;
    let date = document.getElementById("date").value;
    let seat = document.getElementById("seat").value;

    let bus = document.querySelector('input[name="bus"]:checked');


    if (name == "") {
        showError("Please enter your name.");
        return;
    }

    if (age == "" || age < 1 || age > 100) {
        showError("Please enter a valid age.");
        return;
    }

    if (aadhar.length != 12 || isNaN(aadhar)) {
        showError("Please enter a valid 12 digit Aadhar number.");
        return;
    }

    if (city == "") {
        showError("Please select your city.");
        return;
    }

    if (date == "") {
        showError("Please select the date.");
        return;
    }

    if (bus == null) {
        showError("Please select the bus type.");
        return;
    }

    if (seat == "") {
        showError("Please select a seat.");
        return;
    }


    let price;

    if (bus.value == "AC") {
        price = 800;
    } else {
        price = 500;
    }


    let bookingId = Math.floor(1000 + Math.random() * 9000);


    result.style.display = "block";

    result.innerHTML = `
        <h2>Booking Details</h2>

        <p><b>Booking ID:</b> BUS${bookingId}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Age:</b> ${age}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Bus Type:</b> ${bus.value}</p>
        <p><b>Seat:</b> ${seat}</p>
        <p><b>Ticket Price:</b> ₹${price}</p>

        <p class="success">
            Booking Successful!
        </p>
    `;

});


function showError(message) {

    result.style.display = "block";

    result.innerHTML = `
        <p class="error">${message}</p>
    `;
}