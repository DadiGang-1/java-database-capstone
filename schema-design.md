# MySQL Database Design

### Table: patients
- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(255), Not Null
- last_name: VARCHAR(255), Not Null
- date_of_birth: DATE, Not Null
- gender: VARCHAR(20), Nullable
- email: VARCHAR(255), Unique, Nullable
- phone: VARCHAR(20), Nullable
- address: VARCHAR(255), Nullable
- created_at: DATETIME, Not Null

### Table: doctors
- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(255), Not Null
- last_name: VARCHAR(255), Not Null
- email: VARCHAR(255), Unique, Not Null
- phone: VARCHAR(20), Nullable
- specialty: VARCHAR(255), Not Null
- location_id: INT, Foreign Key → clinic_locations(id)
- created_at: DATETIME, Not Null

### Table: appointments
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id)
- patient_id: INT, Foreign Key → patients(id)
- location_id: INT, Foreign Key → clinic_locations(id)
- appointment_time: DATETIME, Not Null
- status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled)
- created_at: DATETIME, Not Null

### Table: admin
- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(255), Not Null
- last_name: VARCHAR(255), Not Null
- email: VARCHAR(255), Unique, Not Null
- password_hash: VARCHAR(255), Not Null
- role: VARCHAR(50), Not Null
- created_at: DATETIME, Not Null

### Table: clinic_locations
- id: INT, Primary Key, Auto Increment
- name: VARCHAR(255), Not Null
- address: VARCHAR(255), Not Null
- city: VARCHAR(100), Not Null
- postal_code: VARCHAR(20), Not Null
- country: VARCHAR(100), Not Null
- phone: VARCHAR(20), Nullable
- created_at: DATETIME, Not Null
  
### Table: payments
- id: INT, Primary Key, Auto Increment
- patient_id: INT, Foreign Key (patients.id), Not Null
- appointment_id: INT, Foreign Key (appointments.id), Nullable
- amount: DECIMAL(10,2), Not Null
- currency: VARCHAR(3), Not Null
- payment_method: VARCHAR(50), Not Null
- status: VARCHAR(50), Not Null
- transaction_reference: VARCHAR(255), Unique, Nullable
- payment_date: DATETIME, Nullable
- created_at: DATETIME, Not Null

# MongoDB Collection Design

### Collection: prescriptions
```json
{
  "_id": "ObjectId('64abc123456')",
  "patientName": "John Smith",
  "appointmentId": 51,
  "medication": "Paracetamol",
  "dosage": "500mg",
  "doctorNotes": "Take 1 tablet every 6 hours.",
  "refillCount": 2,
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street"
  }
}
```

### Collection: feedback
```json
{
  "_id": "ObjectId('64abc123457')",
  "patientId": 12,
  "appointmentId": 51,
  "doctorId": 7,
  "rating": 5,
  "comment": "Very professional and helpful.",
  "category": "doctor",
  "createdAt": "2026-11-11T10:00:00Z"
}
```
### Collection: logs
```json
{
  "_id": "ObjectId('64abc123458')",
  "userId": 3,
  "userType": "admin",
  "action": "CREATE_APPOINTMENT",
  "entity": "appointment",
  "entityId": 51,
  "details": "Appointment created successfully.",
  "ipAddress": "192.168.1.10",
  "createdAt": "2026-11-11T10:15:00Z"
}
```

### Collection: messages
```json
{
  "_id": "ObjectId('64abc123459')",
  "senderId": 12,
  "senderType": "patient",
  "receiverId": 7,
  "receiverType": "doctor",
  "appointmentId": 51,
  "content": "Hello doctor, I have a question about my appointment.",
  "isRead": false,
  "createdAt": "2026-11-11T10:30:00Z"
}
```
