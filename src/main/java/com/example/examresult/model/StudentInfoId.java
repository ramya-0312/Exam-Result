package com.example.examresult.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class StudentInfoId implements Serializable {
	private String registered;

	public String getRegistered() {
		return registered;
	}

	public void setRegistered(String registered) {
		this.registered = registered;
	}

	public String getSemester() {
		return semester;
	}

	public void setSemester(String semester) {
		this.semester = semester;
	}

	private String semester;

	// Getters, setters, equals, and hashCode
}