// ===== State & elemen =====
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editingIndex = null;

const formAdd = document.getElementById("taskForm");
const inputTask = document.getElementById("Task");
const inputDate = document.getElementById("date");

const tbody = document.getElementById("todo-body");
const deleteAllBtn = document.getElementById("deleteAll");

// Panel edit
const editPanel  = document.getElementById("editPanel");
const editForm   = document.getElementById("editForm");
const editStatus = document.getElementById("editStatus");
const editAction = document.getElementById("editAction");

// ===== Util =====
function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTable() {
  tbody.innerHTML = "";
  todos.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.task}</td>
      <td>${item.date}</td>
      <td>${item.status}</td>
      <td>${item.action || "-"}</td>
      <td>
        <button type="button" class="btn-edit" data-index="${index}">Edit</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ===== Init =====
renderTable();

// ===== Tambah todo =====
formAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = inputTask.value.trim();
  const date = inputDate.value;

  if (!task || !date) return;

  todos.push({
    task,
    date,
    status: "Pekerjaan Belum Selesai",
    action: ""
  });

  save();
  renderTable();
  formAdd.reset();
});

// ===== Buka panel edit (klik tombol Edit di tabel) =====
tbody.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-edit");
  if (!btn) return;

  editingIndex = Number(btn.dataset.index);
  const item = todos[editingIndex];

  // isi nilai sekarang ke form edit
  editStatus.value = item.status;
  editAction.value = item.action || "";

  // tampilkan panel
  editPanel.classList.add("show");
  editPanel.scrollIntoView({ behavior: "smooth", block: "center" });
});

// ===== Submit perubahan dari panel edit =====
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (editingIndex === null) return;

  todos[editingIndex].status = editStatus.value;
  todos[editingIndex].action = editAction.value.trim();

  save();
  renderTable();

  // tutup panel edit & reset
  editPanel.classList.remove("show");
  editingIndex = null;
  editForm.reset();
});

// ===== Delete All (opsional) =====
deleteAllBtn?.addEventListener("click", () => {
  if (!todos.length) return;
  if (confirm("Yakin hapus semua todo?")) {
    todos = [];
    save();
    renderTable();
    editPanel.classList.remove("show");
    editingIndex = null;
  }
});
