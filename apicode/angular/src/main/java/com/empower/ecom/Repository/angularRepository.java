package com.empower.ecom.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.empower.ecom.model.login;

@Repository
public interface angularRepository extends JpaRepository<login, Integer> {
    Optional<login> findByEmailAndPassword(String email, String password);
}
