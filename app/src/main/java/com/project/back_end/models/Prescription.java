package com.project.back_end.models;

@Document(collection = "prescriptions")
public class Prescription {

  @Id
  private String id;

  @NotNull(message = "Patient name cannot be null")
  @Size(min = 3, max = 100)
  private String patientName;

  @NotNull(message = "Appointment id cannot be null")
  private Long appointmentId;

  @NotNull(message = "Medication cannot be null")
  @Size(min = 3, max = 100)
  private String medication;

  @NotNull(message = "Dosage cannot be null")
  private String dosage;

  @Size(max = 200)
  private String doctorNotes;

  public Prescription() {}
  public Prescription(String patientName, Long appointmentId, String medication, String dosage, String doctorNotes) {
    this.patientName = patientName;
    this.appointmentId = appointmentId;
    this.medication = medication;
    this.dosage = dosage;
    this.doctorNotes = doctorNotes;
  }
  
  public Long getAppointmentId() {
      return appointmentId;
  }
  public String getDoctorNotes() {
      return doctorNotes;
  }
  public String getDosage() {
      return dosage;
  }
  public String getId() {
      return id;
  }
  public String getMedication() {
      return medication;
  }
  public String getPatientName() {
      return patientName;
  }
  public void setAppointmentId(Long appointmentId) {
      this.appointmentId = appointmentId;
  }
  public void setDoctorNotes(String doctorNotes) {
      this.doctorNotes = doctorNotes;
  }
  public void setDosage(String dosage) {
      this.dosage = dosage;
  }
  public void setId(String id) {
      this.id = id;
  }
  public void setMedication(String medication) {
      this.medication = medication;
  }
  public void setPatientName(String patientName) {
      this.patientName = patientName;
  }

}
