let transactionId = 1;

function checkFraud() {

    let amount = document.getElementById("amount").value;
    let location = document.getElementById("location").value;
    let mobile = document.getElementById("mobile").value;

    if (amount === "" || location === "" || mobile === "") {
        alert("Please fill all details");
        return;
    }

    let riskScore = Math.floor(Math.random() * 100);

    let status = "";
    let color = "";

    if (riskScore > 70) {
        status = "Fraud Detected";
        color = "red";
    }
    else {
        status = "Safe Transaction";
        color = "green";
    }

    let otp = Math.floor(100000 + Math.random() * 900000);

    alert("OTP Verification Code: " + otp);

    addToTable(amount, mobile, riskScore, status, color);

    document.getElementById("amount").value = "";
    document.getElementById("location").value = "";
    document.getElementById("mobile").value = "";
}

function addToTable(amount, mobile, riskScore, status, color) {

    let table = document.getElementById("transactionTable");

    let row = table.insertRow();

    row.innerHTML = `
        <td>${transactionId}</td>
        <td>₹${amount}</td>
        <td>${mobile}</td>
        <td>${riskScore}%</td>
        <td style="color:${color}; font-weight:bold;">
            ${status}
        </td>
    `;

    transactionId++;
}