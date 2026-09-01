package com.school.reportcard.controller;

import com.school.reportcard.model.SchoolSettings;
import com.school.reportcard.repository.SchoolSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/school")
public class SchoolController {

    @Autowired
    private SchoolSettingsRepository schoolSettingsRepository;

    @GetMapping
    public SchoolSettings getSchoolSettings() {
        return schoolSettingsRepository.findAll().stream().findFirst().orElseGet(() -> {
            SchoolSettings defaults = new SchoolSettings();
            defaults.setSchoolName("MAHAVIRI SHISHU VIDYA MANDIR");
            defaults.setSchoolLogo("/mahaviri_shishu_vidya_mandir_logo/screen.png");
            defaults.setAffiliationNumber("RTE/SWN/0052 (G.F.E.R.T PATNA)");
            defaults.setAddress("Ward No-01 Lakhraw Siwan (Bihar)");
            defaults.setContactNumber("+91 98765 43210");
            defaults.setEmail("contact@mahavirishishu.edu.in");
            defaults.setPrincipalName("Dr. Rajan Kumar");
            defaults.setAcademicSession("2024-25");
            return schoolSettingsRepository.save(defaults);
        });
    }

    @PutMapping
    public SchoolSettings updateSchoolSettings(@RequestBody SchoolSettings settings) {
        return schoolSettingsRepository.save(settings);
    }
}
