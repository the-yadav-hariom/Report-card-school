package com.school.reportcard.controller;

import com.school.reportcard.model.Student;
import com.school.reportcard.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        return studentRepository.findById(id).map(student -> {
            student.setStudentName(studentDetails.getStudentName());
            student.setFatherName(studentDetails.getFatherName());
            student.setMotherName(studentDetails.getMotherName());
            student.setDob(studentDetails.getDob());
            student.setClassName(studentDetails.getClassName());
            student.setSection(studentDetails.getSection());
            student.setRollNumber(studentDetails.getRollNumber());
            student.setHouse(studentDetails.getHouse());
            student.setAddress(studentDetails.getAddress());
            student.setRemarks(studentDetails.getRemarks());
            student.setResultStatus(studentDetails.getResultStatus());
            return ResponseEntity.ok(studentRepository.save(student));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        return studentRepository.findById(id).map(student -> {
            studentRepository.delete(student);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
