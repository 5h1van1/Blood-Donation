document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("get-started").addEventListener("click", function () {
        window.location.href = "login.html";
    });

    document.querySelector(".admin-btn").addEventListener("click", function () {
        window.location.href = "admin-login.html";
    });
});
