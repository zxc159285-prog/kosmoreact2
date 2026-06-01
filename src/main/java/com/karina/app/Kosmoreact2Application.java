package com.karina.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Kosmoreact2Application {

    public static void main(String[] args) {
        SpringApplication.run(Kosmoreact2Application.class, args);
    }

}
