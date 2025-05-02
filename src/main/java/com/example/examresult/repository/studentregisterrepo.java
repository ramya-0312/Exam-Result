package com.example.examresult.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.examresult.model.studentregister;

public interface studentregisterrepo extends JpaRepository<studentregister, String> {
	studentregister findByregistered(String registered);

	studentregister findByregisteredAndDob(String registered, String dob);
}
