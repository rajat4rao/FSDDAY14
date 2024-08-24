document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const pincode = document.getElementById('pincode').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const foodChoices = Array.from(document.querySelectorAll('input[name="food"]:checked')).map(el => el.value);
        const state = document.getElementById('state').value;
        const country = document.getElementById('country').value;

        if (foodChoices.length < 2) {
            alert('Please select at least 2 food choices.');
            return;
        }

        const newRow = table.insertRow();
        const cells = [
            firstName, lastName, email, address, pincode, gender,
            foodChoices.join(', '), state, country
        ];

        cells.forEach((cell, index) => {
            const newCell = newRow.insertCell(index);
            newCell.textContent = cell;
        });

        form.reset();
    });
});