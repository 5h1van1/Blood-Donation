document.getElementById("admin-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        alert("Login Successful!");
        window.location.href = "admin-dashboard.html"; // Redirect to Admin Dashboard
    } else {
        alert("Invalid Credentials!");
    }
});
