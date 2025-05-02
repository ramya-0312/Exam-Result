package com.example.examresult.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.examresult.model.studentregister;

public interface StudentRegisterRepository extends JpaRepository<studentregister, String> {
	Optional<studentregister> findByRegisteredAndDob(String registered, String dob);
}
