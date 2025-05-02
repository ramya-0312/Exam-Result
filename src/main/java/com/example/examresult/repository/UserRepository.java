package com.example.examresult.repository;

//import com.expensetracker.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.examresult.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);

//	User findByUsername(String username);
//    boolean existsByUsername(String username);
//    boolean existsByEmail(String email);
}