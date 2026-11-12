package com.project.back_end.models;

@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name cannot be null")
    @Size(min = 3, max = 100)
    private String name;

    @NotNull(message = "Specialty cannot be null")
    @Size(min = 3, max = 50)
    private String specialty;

    @NotNull(message = "Email cannot be null")
    @Email
    private String email;

    @NotNull(message = "Password cannot be null")
    @Size(min = 6)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @NotNull(message = "Phone cannot be null")
    @Pattern(regexp = "^[0-9]{10}$")
    private String phone;

    @ElementCollection
    private List<String> availableTimes;

    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getSpecialty() {
        return specialty;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public String getPhone() {
        return phone;
    }
    public List<String> getAvailableTimes() {
        return availableTimes;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public void setAvailableTimes(List<String> availableTimes) {
        this.availableTimes = availableTimes;
    }
// 8. Getters and Setters:
//    - Standard getter and setter methods are provided for all fields: id, name, specialty, email, password, phone, and availableTimes.

}

