package com.example.demo.app.controller;

import jakarta.persistence.Column;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("home/{userId}")
public class HomeController {

    @RequestMapping(method = RequestMethod.GET)
    public String home(@PathVariable Long userId,
                       Model model) {
        model.addAttribute("userId", userId);
        return "For-backend-verification/home";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/recommendation")
    public String osusume(@PathVariable Long userId,
                          Model model) {
        model.addAttribute("userId", userId);
        return "/For-backend-verification/osusume";
    }
}
