package com.empower.ecom.Repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.empower.ecom.model.upload;

@Repository
public interface uploadRepository extends JpaRepository<upload, Integer> {
	List<upload> findAllByEmail(String email);
	
}
