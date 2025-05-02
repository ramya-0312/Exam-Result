package com.example.examresult.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.examresult.model.StudentInfo;
import com.example.examresult.model.StudentInfoId;

public interface StudentInfoRepository extends JpaRepository<StudentInfo, StudentInfoId> {
	Optional<StudentInfo> findById(StudentInfoId id);
}
