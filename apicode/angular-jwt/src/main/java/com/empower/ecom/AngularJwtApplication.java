package com.empower.ecom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Data base API"))
public class AngularJwtApplication {

	public static void main(String[] args) {
		SpringApplication.run(AngularJwtApplication.class, args);
	}

}
