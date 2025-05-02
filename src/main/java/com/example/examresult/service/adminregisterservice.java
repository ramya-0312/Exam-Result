package com.example.examresult.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.examresult.model.adminregister_model;
//import com.example.examresult.model.adminregister_model;
import com.example.examresult.repository.adminregisterrepo;

class maunal extends Exception {
	public maunal(String msg) {
		super(msg);
	}
}

@Service
public class adminregisterservice {
	@Autowired
	private adminregisterrepo adminregisterrepo;

	public String registered(adminregister_model std) throws maunal {
		// TODO Auto-generated method stub
		adminregister_model existingadminregistermail = adminregisterrepo.findByEmail(std.getEmail());
		String name = std.getName().toLowerCase();
		boolean nameflag = false;
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
		if (nameflag == true) {
			if (existingadminregistermail == null) {
				adminregisterrepo.save(std);
				return "Register Successfully ";
			} else {
				throw new maunal("already mail existed");
			}
		}
		throw new maunal("give correct input");

	}

	public String findByLogin(String email, String password) throws maunal {
		// TODO Auto-generated method stub
		adminregister_model model = adminregisterrepo.findByEmail(email);
		if (model == null) {
			throw new maunal("No id found");
		} else {
			if (password.equals(model.getPassword())) {
				return "login Successfully";
			} else {
				throw new maunal("Retry");
			}
		}
	}

	public String updatepassword(String email, String newPassword) throws maunal {
		adminregister_model checking = adminregisterrepo.findByEmail(email);
		if (checking != null) {
			checking.setPassword(newPassword);
			checking.setDepartment(checking.getDepartment());
			checking.setEmail(email);
			checking.setName(checking.getName());
			adminregisterrepo.save(checking);
			return "updated Successfully";
		}
		throw new maunal("No mail id found");
	}

	public String checkmail(String email) throws maunal {
		String emaila = email;
		adminregister_model mm = adminregisterrepo.findByEmail(email);
		if (mm != null) {
			return "mail found";
		}
		throw new maunal("No main found");
	}

	public String loginWithGoogle(String email) throws maunal {
		adminregister_model model = adminregisterrepo.findByEmail(email);
		if (model == null) {
			throw new maunal("No id found");
		} else {
			return "login Successfully (Google)";
		}
	}

}
