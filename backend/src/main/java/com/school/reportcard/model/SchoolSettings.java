package com.school.reportcard.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "school_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SchoolSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String schoolName;
    private String schoolLogo;
    private String affiliationNumber;
    private String address;
    private String contactNumber;
    private String email;
    private String principalName;
    private String academicSession;
}
