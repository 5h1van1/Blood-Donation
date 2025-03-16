document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = new FormData(event.target);
    const data = {
        email: formData.get("email"), 
        dob: formData.get("dob"), 
        name: formData.get("name"),
        blood_group: formData.get("blood_group"),
        contact: formData.get("contact"),
        address: formData.get("address")
    };

    try {
        // Send form data to the server
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        // Parse the server's response
        const result = await response.json();
        if (response.ok) {
            alert(result.message); // Notify the user of success
            window.location.href = "login.html"; // Redirect to the login page
        } else {
            console.error(result.error); // Log the error
            alert("Error during registration. Please try again.");
        }
    } catch (error) {
        console.error("Network Error:", error); // Log network issues
        alert("Unable to connect to the server. Please check your connection.");
    }
});
