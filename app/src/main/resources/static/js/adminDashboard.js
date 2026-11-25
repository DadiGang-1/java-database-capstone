import { createDoctorCard } from "./components/doctorCard";
import { openModal } from "./components/modals";
import { filterDoctors, getDoctors, saveDoctor } from "./services/doctorServices";

const contentDiv = document.getElementById("content");

async function loadDoctorCards() {
  if (!contentDiv) return;

  contentDiv.innerHTML = "";

	try {
		const doctors = await getDoctors();
		renderDoctorCards(doctors);
  } catch (error) {
	  console.error("Error loading doctors:", error);  
	}
}

async function filterDoctorsOnChange() {
	const name = document.getElementById("searchBar")?.value ??"";
	const time = document.getElementById("filterTime")?.value ??"";
	const specialty = document.getElementById("filterSpecialty")?.value ??"";
	try {
		const doctors = await filterDoctors(name, time, specialty);
		renderDoctorCards(doctors);
  } catch (error) {
	  console.error("Error filtering doctors:", error);  
	}
}

function renderDoctorCards(doctors) {
  if (!contentDiv) return;

  if (doctors.length === 0) {    
		contentDiv.innerHTML = "<p>No doctors found.</p>";
		return;  
	}
  
  contentDiv.innerHTML = doctors.map((doctor) => createDoctorCard(doctor)).join("");
}

async function adminAddDoctor() {

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Authentication token missing. Please log in again.');
    return;
  }

  const name = document.getElementById('doctorName').value.trim();
  const specialty = document.getElementById('specialization').value;
  const email = document.getElementById('doctorEmail').value.trim();
  const password = document.getElementById('doctorPassword').value;
  const phone = document.getElementById('doctorPhone').value.trim();
  const availableTimes = Array.from(
    document.querySelectorAll('input[name="availability"]:checked')
  ).map((checkbox) => checkbox.value);

  const doctor = {
    name,
    specialty,
    email,
    password,
    phone,
    availableTimes
  };

  try {
    const result = await saveDoctor(doctor, token);

    if (!result.success) {
        alert(result.message || "Failed to add doctor.");
        return;
    }

    alert(result.message || "Doctor added successfully!");
    return result;
  } catch (error) {
    console.error("Error adding doctor:", error);
    alert("An error occurred while adding the doctor.");
  }
}


document.addEventListener("DOMContentLoaded",() => {
	document.getElementById("addDocBtn")?.addEventListener("click",() => {    
		openModal("addDoctor");  
	});

	document.getElementById("searchBar")    
		?.addEventListener("input", filterDoctorsOnChange);
	document.getElementById("filterTime")    
		?.addEventListener("change", filterDoctorsOnChange);
	document.getElementById("filterSpecialty")    
		?.addEventListener("change", filterDoctorsOnChange);
		
  loadDoctorCards();
});

/*
  This script handles the admin dashboard functionality for managing doctors:
  - Loads all doctor cards
  - Filters doctors by name, time, or specialty
  - Adds a new doctor via modal form


  Attach a click listener to the "Add Doctor" button
  When clicked, it opens a modal form using openModal('addDoctor')


  When the DOM is fully loaded:
    - Call loadDoctorCards() to fetch and display all doctors


  Function: loadDoctorCards
  Purpose: Fetch all doctors and display them as cards

    Call getDoctors() from the service layer
    Clear the current content area
    For each doctor returned:
    - Create a doctor card using createDoctorCard()
    - Append it to the content div

    Handle any fetch errors by logging them


  Attach 'input' and 'change' event listeners to the search bar and filter dropdowns
  On any input change, call filterDoctorsOnChange()


  Function: filterDoctorsOnChange
  Purpose: Filter doctors based on name, available time, and specialty

    Read values from the search bar and filters
    Normalize empty values to null
    Call filterDoctors(name, time, specialty) from the service

    If doctors are found:
    - Render them using createDoctorCard()
    If no doctors match the filter:
    - Show a message: "No doctors found with the given filters."

    Catch and display any errors with an alert


  Function: renderDoctorCards
  Purpose: A helper function to render a list of doctors passed to it

    Clear the content area
    Loop through the doctors and append each card to the content area


  Function: adminAddDoctor
  Purpose: Collect form data and add a new doctor to the system

    Collect input values from the modal form
    - Includes name, email, phone, password, specialty, and available times

    Retrieve the authentication token from localStorage
    - If no token is found, show an alert and stop execution

    Build a doctor object with the form values

    Call saveDoctor(doctor, token) from the service

    If save is successful:
    - Show a success message
    - Close the modal and reload the page

    If saving fails, show an error message
*/
