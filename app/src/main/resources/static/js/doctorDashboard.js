import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

const today = new Date();
const todayString = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

let selectedDate = todayString;
let patientName = "null";
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("patientTableBody");
  const searchBar = document.getElementById("searchBar");
  const datePicker = document.getElementById("datePicker");
  const todayButton = document.getElementById("todayButton");

  if (!tableBody) return;

  if (datePicker) {
    datePicker.value = selectedDate;
    datePicker.addEventListener("change", () => {
      selectedDate = datePicker.value || todayString;
      loadAppointments(tableBody);
    });
  }

  searchBar?.addEventListener("input", () => {
    patientName = searchBar.value.trim() || "null";
    loadAppointments(tableBody);
  });

  todayButton?.addEventListener("click", () => {
    selectedDate = todayString;
    if (datePicker) datePicker.value = todayString;
    loadAppointments(tableBody);
  });

  loadAppointments(tableBody);
});

async function loadAppointments(tableBody) {
  tableBody.innerHTML = "";

  if (!token) {
    console.error("Cannot load appointments: authentication token is missing.");
    showMessage(tableBody, "Session expired. Please log in again.");
    return;
  }

  try {
    const result = await getAllAppointments(selectedDate, patientName, token);
    const appointments = Array.isArray(result)
      ? result
      : (Array.isArray(result?.appointments) ? result.appointments : []);

    if (appointments.length === 0) {
      showMessage(tableBody, "No appointments found for this date.");
      return;
    }

    appointments.forEach((appointment) => {
      const patient = {
        id: appointment.patientId,
        name: appointment.patientName,
        phone: appointment.patientPhone,
        email: appointment.patientEmail
      };

      tableBody.appendChild(
        createPatientRow(patient, appointment.id, appointment.doctorId)
      );
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
    showMessage(tableBody, "Error loading appointments. Try again later.");
  }
}

function showMessage(tableBody, message) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = 5;
  cell.textContent = message;
  row.appendChild(cell);
  tableBody.appendChild(row);
}
