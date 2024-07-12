package com.empower.ecom.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.empower.ecom.model.sample;

public interface UserRepository extends JpaRepository<sample, Long> {
    Optional<sample> findByEmail(String email);
    Optional<sample> findByUsername(String username);
}