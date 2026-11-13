package com.project.back_end.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import jakarta.validation.constraints.*;

import java.beans.Transient;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.LocalDate;

@Entity
public class Appointment {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @ManyToOne
  private Doctor doctor;

  @NotNull
  @ManyToOne
  private Patient patient;

  @Future  
  private LocalDateTime appointmentTime;

  @NotNull(message = "status cannot be null")
  //@Min(0)
  //@Max(1)
  private int status;

  @Transient 
  private LocalDateTime getEndTime() {
    return this.appointmentTime.plusHours(1);
  }
// 6. 'getEndTime' method:
//    - Type: private LocalDateTime
//    - Description:
//      - This method is a transient field (not persisted in the database).
//      - It calculates the end time of the appointment by adding one hour to the start time (appointmentTime).
//      - It is used to get an estimated appointment end time for display purposes.
  
  private LocalDate getAppointmentDate() {
    return this.appointmentTime.toLocalDate();
  }
// 7. 'getAppointmentDate' method:
//    - Type: private LocalDate
//    - Description:
//      - This method extracts only the date part from the appointmentTime field.
//      - It returns a LocalDate object representing just the date (without the time) of the scheduled appointment.
  
  private LocalTime getAppointmentTimeOnly() {
    return this.appointmentTime.toLocalTime();
  }
// 8. 'getAppointmentTimeOnly' method:
//    - Type: private LocalTime
//    - Description:
//      - This method extracts only the time part from the appointmentTime field.
//      - It returns a LocalTime object representing just the time (without the date) of the scheduled appointment.

  public Appointment() {}
  public Appointment(Doctor doctor, Patient patient, LocalDateTime appointmentTime, int status) {
    this.doctor = doctor;
    this.patient = patient;
    this.appointmentTime = appointmentTime;
    this.status = status;
  }
  
  public Long getId() {
      return id;
  }
  public Doctor getDoctor() {
      return doctor;
  }
  public Patient getPatient() {
      return patient;
  }
  public int getStatus() {
      return status;
  }

  public void setId(Long id) {
      this.id = id;
  }
  public void setDoctor(Doctor doctor) {
      this.doctor = doctor;
  }
  public void setPatient(Patient patient) {
      this.patient = patient;
  }
  public void setStatus(int status) {
      this.status = status;
  }
}

