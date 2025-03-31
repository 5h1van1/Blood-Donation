// Fetch donors on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchDonors();
});

async function fetchDonors() {
    const bloodGroup = document.getElementById("blood-group").value;

    // Construct the query URL
    let query = `http://localhost:3000/get-donors`;
    if (bloodGroup) query += `?bloodGroup=${encodeURIComponent(bloodGroup)}`;

    try {
        const response = await fetch(query);
        const donors = await response.json();
        console.log("Donor Data Response:", donors);

        if (!response.ok) {
            throw new Error(donors.error || "Failed to fetch donors.");
        }

        // Update the table
        const tableBody = document.querySelector("#donor-table tbody");
        tableBody.innerHTML = ""; // Clear previous rows

        donors.forEach(donor => {
            let row = `
                <tr>
                    <td>${donor.full_name}</td>
                    <td>${donor.blood_group}</td>
                    <td>${donor.address || "N/A"}</td>
                    <td>${donor.last_donation ? new Date(donor.last_donation).toLocaleDateString() : "N/A"}</td>
                    <td><a href="tel:${donor.phone}">${donor.phone}</a></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error("Error fetching donors:", error.message);
        alert("Failed to fetch donors. Please try again later.");
    }
}
