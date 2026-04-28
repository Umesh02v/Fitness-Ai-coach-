package com.fitmind;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FitMindApplication {
    public static void main(String[] args) {
        SpringApplication.run(FitMindApplication.class, args);
    }
}
