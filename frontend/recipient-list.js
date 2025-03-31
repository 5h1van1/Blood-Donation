// Fetch recipients on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchRecipients();
});

async function fetchRecipients() {
    const bloodGroup = document.getElementById("blood-group").value;

    // Construct the query URL
    let query = `http://localhost:3000/get-recipients`;
    if (bloodGroup) query += `?bloodGroup=${encodeURIComponent(bloodGroup)}`;

    try {
        const response = await fetch(query);
        const recipients = await response.json();
        console.log("Recipient Data Response:", recipients);

        if (!response.ok) {
            throw new Error(recipients.error || "Failed to fetch recipients.");
        }

        // Update the table
        const tableBody = document.querySelector("#recipient-table tbody");
        tableBody.innerHTML = ""; // Clear previous rows

        recipients.forEach(recipient => {
            const row = `
                <tr>
                    <td>${recipient.fullname}</td>
                    <td>${recipient.blood_group_needed}</td>
                    <td>${recipient.blood_units_required}</td>
                    <td>${recipient.urgency}</td>
                    <td>${recipient.hospital_name}</td>
                    <td>${recipient.hospital_address}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error("Error fetching recipients:", error.message);
        alert("Failed to fetch recipients. Please try again later.");
    }
}
