async function fetchDonors() {
    const bloodGroup = document.getElementById("blood-group").value;
    const location = document.getElementById("location").value;

    //let query = /get-donors?bloodGroup=${bloodGroup}&location=${location};

    const response = await fetch(query);
    const donors = await response.json();

    const tableBody = document.querySelector("#donor-table tbody");
    tableBody.innerHTML = "";

    donors.forEach(donor => {
        let row = `<tr>
            <td>${donor.name}</td>
            <td>${donor.blood_group}</td>
            <td>${donor.location}</td>
            <td>${donor.last_donation_date}</td>
            <td><a href="tel:${donor.contact}">${donor.contact}</a></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}