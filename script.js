let transactionId = 1;

// Known trusted numbers
let knownNumbers = [
    "9391526609",
    "9618643705"
];

function checkTransaction() {

    let mobile = document.getElementById("mobile").value;
    let amount = document.getElementById("amount").value;
    let location = document.getElementById("location").value;

    if (mobile === "" || amount === "" || location === "") {
        alert("Please fill all details");
        return;
    }

    let otpStatus = "";
    let transactionStatus = "Successful";

    // Check known number
    if (knownNumbers.includes(mobile)) {

        otpStatus = "Trusted Number - No OTP";

        alert("Trusted Number Detected\nMoney Sent Successfully");

    } else {

        let otp = Math.floor(100000 + Math.random() * 900000);

        otpStatus = "OTP Generated";

        alert("Unknown Number Detected\nOTP Verification Code: " + otp);
    }

    addToTable(mobile, amount, otpStatus, transactionStatus);

    document.getElementById("mobile").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("location").value = "";
}

function addToTable(mobile, amount, otpStatus, transactionStatus) {

    let table = document.getElementById("transactionTable");

    let row = table.insertRow();

    row.innerHTML = `
        <td>${transactionId}</td>
        <td>${mobile}</td>
        <td>₹${amount}</td>
        <td>${otpStatus}</td>
        <td style="color:green; font-weight:bold;">
            ${transactionStatus}
        </td>
    `;

    transactionId++;
}