const year = 2026;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function createCalendar(month, year) {
    const monthDays = document.createElement('div');
    monthDays.classList.add('month-calendar');

    const monthName = document.createElement('div');
    monthName.classList.add('month-name');
    monthName.textContent = `${months[month]} ${year}`;
    monthDays.appendChild(monthName);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    // Create weekday headers
    let headerRow = document.createElement('tr');
    weekdays.forEach(day => {
        let th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Calculate the first day of the month and number of days
    const firstDay = new Date(year, month, 1).getDay(); // 0-indexed day of the week
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // last day of the month

    let date = 1;
    for (let i = 0; i < 6; i++) { // Max 6 weeks in a month view
        let tr = document.createElement('tr');
        for (let j = 0; j < 7; j++) { // 7 days in a week
            let td = document.createElement('td');
            if (i === 0 && j < firstDay) {
                // Empty cells before the first day
                td.textContent = '';
            } else if (date > daysInMonth) {
                // Stop if we exceed the number of days in the month
                break;
            } else {
                td.textContent = date;
                // Highlight today's date if applicable (for current year/month)
                const today = new Date();
                if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    td.classList.add('today');
                }
                date++;
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        if (date > daysInMonth) break; // Exit outer loop if all days are placed
    }

    table.appendChild(tbody);
    monthDays.appendChild(table);
    document.getElementById('calendar-wrapper').appendChild(monthDays);
}

// Generate calendar for all 12 months of 2026
for (let i = 0; i < 12; i++) {
    createCalendar(i, year);
}