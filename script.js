let transactionId = 1;

let generatedOTP = "";
let timer;
let timeLeft = 30;

let currentMobile = "";
let currentAmount = "";

let knownNumbers = [
    "9391526609",
    "9618643705"
];

function startTransaction() {

    let mobile =
        document.getElementById("mobile").value;

    let amount =
        document.getElementById("amount").value;

    if (mobile === "" || amount === "") {

        alert("Please fill all details");

        return;
    }

    currentMobile = mobile;
    currentAmount = amount;

    // TRUSTED NUMBER

    if (knownNumbers.includes(mobile)) {

        alert("Trusted Number\nTransaction Successful");

        addToTable(
            mobile,
            amount,
            "Transaction Successful"
        );

        clearInputs();

    }

    // UNKNOWN NUMBER

    else {

        document.getElementById("otpBlock")
            .style.display = "block";

        generateOTP();
    }
}

function generateOTP() {

    generatedOTP =
        Math.floor(100000 + Math.random() * 900000)
        .toString();

    alert("OTP Generated: " + generatedOTP);

    startTimer();
}

function startTimer() {

    clearInterval(timer);

    timeLeft = 30;

    updateTimer();

    timer = setInterval(() => {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timer);

            alert("OTP Expired\nNew OTP Generated");

            generateOTP();
        }

    }, 1000);
}

function updateTimer() {

    document.getElementById("timerText")
        .innerHTML =
        "OTP Expires In: " + timeLeft + " seconds";
}

function verifyOTP() {

    let enteredOTP =
        document.getElementById("otpInput").value;

    if (enteredOTP === generatedOTP) {

        clearInterval(timer);

        alert("Transaction Successful");

        addToTable(
            currentMobile,
            currentAmount,
            "Transaction Successful"
        );

        document.getElementById("otpBlock")
            .style.display = "none";

        clearInputs();

    }

    else {

        alert("Wrong OTP\nTransaction Failed");

        addToTable(
            currentMobile,
            currentAmount,
            "Transaction Failed"
        );
    }
}

function addToTable(mobile, amount, status) {

    let table =
        document.getElementById("transactionTable");

    let row = table.insertRow();

    let color =
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
}