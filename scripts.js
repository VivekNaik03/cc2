document.getElementById('attendanceForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const studentName = document.getElementById('studentName').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;

    const attendanceRecord = {
        id: Date.now().toString(),
        studentName,
        date,
        status
    };

    fetch('/api/attendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(attendanceRecord)
    })
    .then(response => response.json())
    .then(data => {
        alert('Attendance recorded successfully!');
        displayAttendance();
    })
    .catch(error => console.error('Error:', error));
});

function displayAttendance() {
    fetch('/api/attendance')
    .then(response => response.json())
    .then(data => {
        const attendanceTable = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
        attendanceTable.innerHTML = '';
        data.forEach(record => {
            const row = attendanceTable.insertRow();
            const nameCell = row.insertCell(0);
            const dateCell = row.insertCell(1);
            const statusCell = row.insertCell(2);
            
            nameCell.textContent = record.studentName;
            dateCell.textContent = record.date;
            statusCell.textContent = record.status;
        });
    })
    .catch(error => console.error('Error:', error));
}

function deleteAttendance(id) {
    fetch(`/api/attendance/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        displayAttendance();
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', displayAttendance);
