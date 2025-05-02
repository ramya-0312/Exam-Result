package com.example.examresult.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.examresult.model.studentresult_model;

@Repository
public interface studentresultrepo extends JpaRepository<studentresult_model, String> {
	studentresult_model findByregistered(String registered);

	@Query("SELECT s FROM studentresult_model s " + "JOIN studentregister r ON s.registered = r.registered "
			+ "WHERE s.registered = :registered")
	List<studentresult_model> findStudentInfoByRegisteredAndDob(@RequestParam("registered") String registered,
			@RequestParam("dob") String dob);

}
