package com.example.examresult.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.examresult.model.studentregister;
import com.example.examresult.model.studentresult_model;
import com.example.examresult.repository.studentinforepo;
import com.example.examresult.repository.studentregisterrepo;
import com.example.examresult.repository.studentresultrepo;

class maunal extends Exception {
	public maunal(String msg) {
		super(msg);
	}
}

@Service
public class studentinfoservice {
	public boolean checking(studentregister model) {
		boolean dobflag = false;
		String s = "";
		int currentyear = LocalDate.now().getYear();
		String lengt = model.getDob();
		for (int i = 0; i <= 3; i++) {
			s += lengt.charAt(i);
		}
		int comingyear = Integer.parseInt(s);

		System.out.println(lengt);
		int checkdob = currentyear - comingyear;
		for (int i = 0; i <= 3; i++) {
			if (checkdob > 5) {
				dobflag = true;
			} else {
				dobflag = false;
				break;
			}
		}
		String name = model.getName();
		boolean nameflag = false;
		String one = model.getRegistered();
		boolean regflag = false;

		for (int i = 0; i <= one.length() - 1; i++) {
			if (one.charAt(i) >= 48 && one.charAt(i) <= 57) {
				regflag = true;
			} else {
				regflag = false;
				break;
			}
		}
		if (name.length() >= 3) {
			for (int i = 0; i <= name.length() - 1; i++) {
				if (name.charAt(i) >= 97 && name.charAt(i) <= 122) {
					nameflag = true;
				} else {
					nameflag = false;
					break;
				}
			}
		} else {
			nameflag = false;
		}
		if (regflag == true && nameflag == true && dobflag == true) {
			return true;
		}
		return false;

	}

	public String putresultgrade(String get) {
		int num = Integer.parseInt(get);
		int grade = Integer.parseInt(get);
		if (num <= 100 && num >= 91) {
			return "A";
		} else if (num <= 90 && num >= 81) {
			return "B";
		} else if (num <= 80 && num >= 71) {
			return "C";
		} else if (num <= 70 && num >= 61) {
			return "D";
		} else if (num <= 60 && num >= 50) {
			return "E";
		} else {
			return "U";
		}

	}

	public String putgrade(String get) {
		int num = Integer.parseInt(get);
		String grade = get;
		if (num <= 500 && num >= 451) {
			return "A";
		} else if (num <= 450 && num >= 401) {
			return "B";
		} else if (num <= 400 && num >= 301) {
			return "C";
		} else if (num <= 300 && num >= 250) {
			return "D";
		} else {
			return "U";
		}

	}

	public String result(String get) {
		if (get.equals("A") || get.equals("B") || get.equals("C") || get.equals("D")) {
			return "Pass";
		} else {
			return "Fail";
		}
	}

	@Autowired
	private studentinforepo repo;
	@Autowired
	private studentresultrepo resultrepo;
	@Autowired
	private studentregisterrepo studentregister;

	public String addstd(studentregister model) throws maunal {
		// TODO Auto-generated method stub

//		studentinfo_model m = repo.findByReg(model.getRegistered());
		studentregister m1 = studentregister.findByregistered(model.getRegistered());
		if (m1 == null) {
			if (checking(model)) {
				studentregister.save(model);
				return "student add";
			} else {
				throw new maunal("give correct value");
			}

		} else {
			throw new maunal("alredy found");

		}
	}

	public String postresult(studentresult_model oka) throws maunal {
		studentregister m1 = studentregister.findByregistered(oka.getRegistered());
//		studentinfo_model a = repo.findByregistered(oka.getRegistered());
//		List<studentresult_model om = (List<studentresult_model>) resultrepo.findByregistered(oka.getRegistered());

		if (m1 == null) {
			throw new maunal("student not registerd");
		}

		resultrepo.save(oka);
		return "posted";
	}

	public List<studentresult_model> getStudentResult(String registered, String dob) throws maunal {
		studentregister one = studentregister.findByregistered(registered);
		List<studentresult_model> results = resultrepo.findStudentInfoByRegisteredAndDob(registered, dob);
		if (results.isEmpty()) {

			throw new maunal("No data found");
		} else if (!one.getDob().equals(dob)) {
			throw new maunal("no data found");
		}
		return results;
	}

	public studentregister getstudentinfo(String registered, String dob) throws maunal {
		// TODO Auto-generated method stub
		studentregister one = studentregister.findByregistered(registered);
		if (one == null) {
			throw new maunal("no data found");
		} else if (!one.getDob().equals(dob)) {
			throw new maunal("crediantional misss match");
		}
		return one;
	}
}