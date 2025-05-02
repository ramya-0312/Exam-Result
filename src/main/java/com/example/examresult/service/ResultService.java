package com.example.examresult.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.examresult.model.StudentInfo;
import com.example.examresult.model.StudentInfoId;
import com.example.examresult.model.studentregister;
import com.example.examresult.repository.StudentInfoRepository;
import com.example.examresult.repository.StudentRegisterRepository;

@Service
public class ResultService {

	@Autowired
	private StudentRegisterRepository studentRegisterRepo;

	@Autowired
	private StudentInfoRepository studentInfoRepo;

	public Map<String, Object> getStudentResult(String registerNumber, String dob, String semester) {

		Optional<studentregister> studentOpt = studentRegisterRepo.findByRegisteredAndDob(registerNumber, dob);
		if (studentOpt.isEmpty()) {
			throw new NoSuchElementException("Student not found or DOB incorrect");
		}

		studentregister student = studentOpt.get();

		StudentInfoId infoId = new StudentInfoId();
		infoId.setRegistered(registerNumber);
		infoId.setSemester(semester);

		Optional<StudentInfo> infoOpt = studentInfoRepo.findById(infoId);
		if (infoOpt.isEmpty()) {
			throw new NoSuchElementException("No result found for the given semester");
		}

		StudentInfo info = infoOpt.get();

		List<Map<String, Object>> subjects = List.of(Map.of("name", "Tamil", "marks", info.getTamil()),
				Map.of("name", "English", "marks", info.getEnglish()),
				Map.of("name", "Maths", "marks", info.getMaths()),
				Map.of("name", "Science", "marks", info.getScience()),
				Map.of("name", "Social", "marks", info.getSocial()));

		String Grade = info.getGrade();

		String resultStatus = info.getResult();

		Map<String, Object> response = new LinkedHashMap<>();
		response.put("message", "Result fetched successfully");
		response.put("registered", student.getRegistered());
		response.put("name", student.getName());
		response.put("department", student.getDepartment());
		response.put("dob", student.getDob());
		response.put("subjects", subjects);
		response.put("totalMarks", Grade);
		response.put("resultStatus", resultStatus);

		return response;
	}
}
