/* ---------- LOGIN ---------- */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true"); // ✅ SAVE LOGIN
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  });
}

/* ---------- DASHBOARD PROTECTION ---------- */
if (window.location.pathname.includes("dashboard.html")) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    window.location.href = "index.html";
  }
}

/* ---------- EMPLOYEE LOGIC ---------- */
let employees = JSON.parse(localStorage.getItem("employees")) || [];

function renderEmployees(data = employees) {
  const table = document.getElementById("employeeTable");
  if (!table) return;

  table.innerHTML = "";

  data.forEach((emp, index) => {
    table.innerHTML += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.role}</td>
        <td>
          <button onclick="deleteEmployee(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function addEmployee() {
  const name = document.getElementById("empName").value;
  const role = document.getElementById("empRole").value;

  if (!name || !role) {
    alert("Fill all fields");
    return;
  }

  employees.push({ name, role });
  localStorage.setItem("employees", JSON.stringify(employees));

  document.getElementById("empName").value = "";
  document.getElementById("empRole").value = "";

  renderEmployees();
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  renderEmployees();
}

function searchEmployee() {
  const value = document.getElementById("search").value.toLowerCase();
  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(value)
  );
  renderEmployees(filtered);
}

function logout() {
  localStorage.removeItem("isLoggedIn"); // ✅ CLEAR LOGIN
  window.location.href = "index.html";
}

renderEmployees();


