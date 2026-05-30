let transactionId = 1;

let generatedOTP = "";
let timer = null;
let timeLeft = 30;

let currentMobile = "";
let currentAmount = 0;

function startTransaction() {

    const mobile = document.getElementById("mobile").value.trim();
    const amount = parseInt(document.getElementById("amount").value);

    if (mobile === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid mobile number and amount");
        return;
    }

    currentMobile = mobile;
    currentAmount = amount;

    // No OTP for ₹10,000 or less
    if (amount <= 10000) {

        addToTable(
            currentMobile,
            currentAmount,
            "Transaction Successful"
        );

        alert("Transaction Successful\nNo OTP Required");

        clearInputs();
        return;
    }

    // OTP required above ₹10,000
    document.getElementById("otpBlock").style.display = "block";

    generateOTP();
}

function generateOTP() {

    generatedOTP =
        Math.floor(100000 + Math.random() * 900000).toString();

    alert("OTP Generated: " + generatedOTP);

    startTimer();
}

function startTimer() {

    clearInterval(timer);

    timeLeft = 30;

    updateTimer();

    timer = setInterval(function () {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timer);

            alert("OTP Expired. New OTP Generated.");

            generateOTP();
        }

    }, 1000);
}

function updateTimer() {

    document.getElementById("timerText").innerHTML =
        "OTP expires in: " + timeLeft + " seconds";
}

function verifyOTP() {

    const enteredOTP =
        document.getElementById("otpInput").value.trim();

    if (enteredOTP === generatedOTP) {

        clearInterval(timer);

        addToTable(
            currentMobile,
            currentAmount,
            "Transaction Successful"
        );

        alert("Transaction Successful");

        document.getElementById("otpBlock").style.display = "none";

        clearInputs();
    }
    else {

        addToTable(
            currentMobile,
            currentAmount,
            "Transaction Failed"
        );

        alert("Wrong OTP. Transaction Failed");
    }
}

function addToTable(mobile, amount, status) {

    const table =
        document.getElementById("transactionTable");

    const row = table.insertRow();

    const color =
        status === "Transaction Successful"
            ? "green"
            : "red";

    row.innerHTML = `
        <td>${transactionId}</td>
        <td>${mobile}</td>
        <td>₹${amount}</td>
        <td style="color:${color}; font-weight:bold;">
            ${status}
        </td>
    `;

    transactionId++;
}

function clearInputs() {

    document.getElementById("mobile").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("otpInput").value = "";

    currentMobile = "";
    currentAmount = 0;
}