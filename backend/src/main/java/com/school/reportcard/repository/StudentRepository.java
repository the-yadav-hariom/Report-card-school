package com.school.reportcard.repository;

import com.school.reportcard.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEnrollmentNumber(String enrollmentNumber);
    List<Student> findByClassName(String className);
    List<Student> findByClassNameAndSection(String className, String section);
}
