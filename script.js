let id = 1;

let generatedOTP = "";
let pendingTransaction = null;

let timer;
let timeLeft = 10;

// START TIMER
function startTimer() {
    timeLeft = 10;
    document.getElementById("resendBtn").disabled = true;

    timer = setInterval(() => {
        document.getElementById("timerText").innerText =
            "Time left: " + timeLeft + "s";

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            document.getElementById("timerText").innerText = "OTP Expired!";
            document.getElementById("resendBtn").disabled = false;
        }
    }, 1000);
}

// GENERATE OTP
function generateOTP() {
    generatedOTP = Math.floor(1000 + Math.random() * 9000);
    alert("OTP: " + generatedOTP);
}

// MAIN FUNCTION
function checkFraud() {

    let amount = document.getElementById("amount").value;
    let location = document.getElementById("location").value;

    let riskScore = 0;

    // FRAUD LOGIC
    if (amount > 10000) riskScore += 50;
    if (location.toLowerCase() !== "home") riskScore += 30;

    let status = "";

    if (riskScore < 40) status = "Safe";
    else if (riskScore < 70) status = "Suspicious";
    else status = "Unsafe";   // ✅ changed here

    document.getElementById("result").innerHTML =
        "Risk Score: " + riskScore + " | Status: " + status;

    let color = "green";
    if (status === "Suspicious") color = "orange";
    if (status === "Unsafe") color = "red";   // ✅ changed here

    // OTP REQUIRED FOR HIGH RISK
    if (riskScore >= 50) {

        pendingTransaction = { amount, riskScore, status, color };

        document.getElementById("otpSection").style.display = "block";

        generateOTP();
        startTimer();

        return;
    }

    addToTable(amount, riskScore, status, color);
}


// VERIFY OTP
function verifyOTP() {

    let userOTP = document.getElementById("otpInput").value;

    if (timeLeft < 0) {
        alert("OTP expired!");
        return;
    }

    if (userOTP == generatedOTP) {
        alert("Transaction Successful!");

        addToTable(
            pendingTransaction.amount,
            pendingTransaction.riskScore,
            pendingTransaction.status,
            pendingTransaction.color
        );

        clearInterval(timer);
        document.getElementById("otpSection").style.display = "none";
    } else {
        alert("Wrong OTP!");
    }
}


// RESEND OTP
function resendOTP() {
    generateOTP();
    startTimer();
}


// ADD TO TABLE
function addToTable(amount, riskScore, status, color) {

    let table = document.getElementById("tableData");

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${id++}</td>
        <td>${amount}</td>
        <td>${riskScore}</td>
        <td style="color:${color}; font-weight:bold;">${status}</td>
    `;

    table.appendChild(row);
}
