// ---------- STATE ----------
let students = JSON.parse(localStorage.getItem("Jspiders")) || [];
let filter = "all";
let sort = "";
let search = "";

// ---------- ELEMENTS ----------
const nameInput = document.getElementById("nameInput");
const joinInput = document.getElementById("join");
const courseSelect = document.getElementById("courses");
const batchSelect = document.getElementById("batch");

const totalEl = document.getElementById("total");
const placedEl = document.getElementById("placed");
const pendingEl = document.getElementById("pending");

const tableBody = document.querySelector("#studentTable tbody");

// ---------- SAVE ----------
function save() {
  localStorage.setItem("Jspiders", JSON.stringify(students));
}

// ---------- ENTER KEY ----------
nameInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addStudent();
});

// ---------- ADD ----------
function addStudent() {
  if (!nameInput.value.trim()) return;

  students.unshift({
    id: Date.now(),
    name: nameInput.value.trim(),
    join: joinInput.value,
    course: courseSelect.options[courseSelect.selectedIndex].text,
    batch: batchSelect.value,
    placed: false
  });

  nameInput.value = "";
  joinInput.value = "";

  save();
  render();
}

// ---------- STATS ----------
function updateStats() {
  totalEl.textContent = students.length;
  placedEl.textContent = students.filter(s => s.placed).length;
  pendingEl.textContent = students.filter(s => !s.placed).length;
}

// ---------- RENDER ----------
function render() {
  let data = [...students];

  // Filter
  if (filter === "completed") data = data.filter(s => s.placed);
  if (filter === "pending") data = data.filter(s => !s.placed);

  // Search
  if (search) {
    data = data.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort
  if (sort === "course") {
    data.sort((a, b) => a.course.localeCompare(b.course));
  }
  if (sort === "join") {
    data.sort((a, b) => (a.join || "").localeCompare(b.join || ""));
  }

  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML = `
      <tr class="empty-row">
        <td colspan="6">No students found</td>
      </tr>
    `;
    updateStats();
    return;
  }

  data.forEach((s, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${s.name}</td>
      <td>${s.join || "N/A"}</td>
      <td>${s.course}</td>
      <td>${s.batch}</td>
      <td>
        <span class="status ${s.placed ? "status-completed" : "status-pending"}"
              onclick="toggle(${s.id})">
          ${s.placed ? "Completed" : "Pending"}
        </span>
      </td>
    `;

    tableBody.appendChild(tr);
  });

  updateStats();
}

// ---------- TOGGLE ----------
function toggle(id) {
  students = students.map(s =>
    s.id === id ? { ...s, placed: !s.placed } : s
  );
  save();
  render();
}

// ---------- FILTER ----------
function setFilter(f, btn) {
  filter = f;
  document
    .querySelectorAll("#sort-buttons button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  render();
}

// ---------- CLEAR ----------
function clearData() {
  if (confirm("Clear all data?")) {
    students = [];
    save();
    render();
  }
}

// ---------- INIT ----------
render();
