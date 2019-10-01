const leftDate = moment().subtract("days", 7);
const middleDate = moment();
const rightDate = moment().add("days", 7);

const previous = () => {
  leftDate.subtract("days", 7);
  middleDate.subtract("days", 7);
  rightDate.subtract("days", 7);
  renderAttendanceTableBody();
};

const next = () => {
  leftDate.add("days", 7);
  middleDate.add("days", 7);
  rightDate.add("days", 7);
  renderAttendanceTableBody();
};

document.getElementById("prevBtn").addEventListener("click", previous);
document.getElementById("nextBtn").addEventListener("click", next);

const users = [
  { name: "Andrea", attendances: {} },
  { name: "Cello", attendances: {} },
  { name: "Chrisse", attendances: {} },
  { name: "Clifford", attendances: {} },
  { name: "Ephrem", attendances: {} },
  { name: "Fredek", attendances: {} },
  { name: "Geno", attendances: {} },
  { name: "Gordan", attendances: {} },
  { name: "Hallsy", attendances: {} },
  { name: "Jarrad", attendances: {} },
  { name: "Jessamyn", attendances: {} },
  { name: "Kienan", attendances: {} },
  { name: "Mordecai", attendances: {} },
  { name: "Shelley", attendances: {} },
  { name: "Simonette", attendances: {} }
];

const renderAttendanceTableBody = () => {
  const attendanceTableBodyEl = document.getElementById("attendanceTableBody");

  attendanceTableBodyEl.innerHTML = "";

  const leftDateEl = document.getElementById("leftDate");
  const middleDateEl = document.getElementById("middleDate");
  const rightDateEl = document.getElementById("rightDate");

  leftDateEl.innerHTML = leftDate.format("DD/MM/YYYY");
  middleDateEl.innerHTML = middleDate.format("DD/MM/YYYY");
  rightDateEl.innerHTML = rightDate.format("DD/MM/YYYY");

  users.forEach((user, index) => {
    const row = attendanceTableBodyEl.insertRow(index);
    const cell1 = row.insertCell(0);
    cell1.innerHTML = user.name;

    renderAttendanceRow({
      user,
      date: leftDate.format("DD/MM/YYYY"),
      row,
      firstCell: 1
    });
    renderAttendanceRow({
      user,
      date: middleDate.format("DD/MM/YYYY"),
      row,
      firstCell: 7
    });
    renderAttendanceRow({
      user,
      date: rightDate.format("DD/MM/YYYY"),
      row,
      firstCell: 13
    });
  });
};

const renderAttendanceRow = ({ user, date, row, firstCell }) => {
  Array.from({ length: 6 }).forEach((item, index) => {
    const cell = row.insertCell(index + firstCell);

    let attendances = user.attendances[date];

    if (!attendances) {
      user.attendances[date] = Array.from({ length: 6 });
      attendances = user.attendances[date];
    }

    let attendanceIndicator = "&nbsp;";

    if (attendances[index]) attendanceIndicator = "V";
    if (attendances[index] === false) attendanceIndicator = "F";

    cell.innerHTML = attendanceIndicator;

    cell.addEventListener("click", () => {
      if (attendances[index]) {
        cell.innerHTML = "F";
        attendances[index] = false;
      } else {
        cell.innerHTML = "V";
        attendances[index] = true;
      }
    });
  });
};

renderAttendanceTableBody();
