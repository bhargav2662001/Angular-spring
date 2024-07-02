package com.empower.ecom.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.empower.ecom.model.login;

@Repository
public interface angularRepository extends JpaRepository<login, Integer> {
    Optional<login> findByEmailAndPassword(String email, String password);
    @Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END FROM login WHERE email = :email", nativeQuery = true)
    int existsByEmail(@Param("email") String email);
}
