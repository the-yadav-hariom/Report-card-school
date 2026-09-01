package com.school.reportcard.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String studentName;

    private String fatherName;
    private String motherName;
    private String dob;

    @Column(unique = true)
    private String enrollmentNumber;

    private String rollNumber;
    private String className;
    private String section;
    private String house;
    private String address;
    private String academicSession;
    private String studentPhoto;
    private String remarks;
    private String resultStatus = "Promote";
}
