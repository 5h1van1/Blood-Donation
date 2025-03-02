async function fetchRecipients() {
    const bloodGroup = document.getElementById("blood-group").value;
    const location = document.getElementById("location").value;

    const response = await fetch(`/get-recipients?bloodGroup=${bloodGroup}&location=${location}`);
    const recipients = await response.json();

    const tableBody = document.querySelector("#recipient-table tbody");
    tableBody.innerHTML = "";

    recipients.forEach(recipient => {
        const row = `<tr>
            <td>${recipient.name}</td>
            <td>${recipient.blood_group}</td>
            <td>${recipient.location}</td>
            <td>${recipient.urgency_level}</td>
            <td>${recipient.contact}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
