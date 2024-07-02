package com.empower.ecom.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empower.ecom.Repository.angularRepository;
import com.empower.ecom.model.login;



@Service
public class angularservice {

	 @Autowired
	    private angularRepository cr;
	 
	 public boolean emailExists(String email) {
	        // Translate the numeric result to boolean
	        return cr.existsByEmail(email) == 1;
	    }
	  
	    public login create(login login) {
	        return cr.save(login);
	    }

	    public List<login> readAll() {
	        return cr.findAll();
	    }

	    public login readById(Integer id) {
	        Optional<login> temp = cr.findById(id);
	        return temp.orElse(null);
	    }

	    public login update(login login) {
	        Optional<login> temp = cr.findById(login.getId());
	        if (temp.isPresent()) {
	            return cr.save(login);
	        } else {
	            return null;
	        }
	    }

	    public void deleteById(Integer id) {
	        Optional<login> temp = cr.findById(id);
	        temp.ifPresent(cr::delete);
	    }

	    public boolean checkLogin(String email, String password) {
	        Optional<login> optionalLogin = cr.findByEmailAndPassword(email, password);
	        return optionalLogin.isPresent();
	    }
	}
