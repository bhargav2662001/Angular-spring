package com.empower.ecom.cors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SuppressWarnings("unused")
@Configuration
public class MyCorsConfig {
    @Bean
    CorsFilter corsFilter() {
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        CorsConfiguration config = new CorsConfiguration();
	        config.setAllowCredentials(true); // Allow credentials (cookies, authorization headers, etc.)
	        config.addAllowedOrigin("http://localhost:4200"); // Allow any origin with pattern matching
	        config.addAllowedHeader("*"); // Allow all headers
	        config.addAllowedMethod("*"); // Allow all HTTP methods
	        source.registerCorsConfiguration("/**", config);
	        return new CorsFilter(source);
	    }
}
