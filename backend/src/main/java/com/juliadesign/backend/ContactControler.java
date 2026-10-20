package com.juliadesign.backend;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ContactControler {

    @PostMapping("/contact")
    public String receiveContactForm(@RequestBody ContactRequest request) {
        
        
        System.out.println("=== НОВАЯ ЗАЯВКА ===");
        System.out.println("Имя: " + request.getName());
        System.out.println("Телефон: " + request.getPhone());
        System.out.println("Сообщение: " + request.getMessage());
        System.out.println("====================");

        
        return "SUCCESS";
    }
}