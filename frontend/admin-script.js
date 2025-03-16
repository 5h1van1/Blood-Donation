document.getElementById("admin-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/admin-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
            alert("Login Successful!");
            localStorage.setItem("adminToken", data.token); // Store JWT token for authentication
            window.location.href = "admin-dashboard.html"; // Redirect to Admin Dashboard
        } else {
            alert("Invalid Credentials!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Try again!");
    }
});
