document.addEventListener("DOMContentLoaded", function () {
    // Handle "Get Started" button click
    document.getElementById("get-started").addEventListener("click", function () {
        window.location.href = "donor.html"; // Redirect to donor registration page
    });

    // Handle navigation links
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior
            
            let targetSection = this.getAttribute("href");
            
            if (targetSection.startsWith("#")) {
                // Smooth scroll to section if it's an in-page link
                document.querySelector(targetSection).scrollIntoView({ behavior: "smooth" });
            } else {
                // Navigate to other pages if it's an external link
                window.location.href = targetSection;
            }
        });
    });

    // Handle icon clicks (Example: Navigate to Registration page)
    document.querySelectorAll(".icons div").forEach((iconDiv, index) => {
        iconDiv.addEventListener("click", function () {
            let pages = ["donor.html", "blood-retrieval.html", "register.html"];
            window.location.href = pages[index]; // Redirect based on the icon clicked
        });
    });
});
