package com.example.demo.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("others/{userId}")
public class OthersController {

    @RequestMapping(method = RequestMethod.GET, value ="my-page")
    public String getMyPage(@PathVariable Long userId,
                            Model model) {
        return "/For-backend-verification/mypage";
    }

    @RequestMapping(method = RequestMethod.GET, value = "favorite")
    public String getFavorite(@PathVariable Long userId,
                              Model model) {
        return "/For-backend-verification/nice";
    }

    @RequestMapping(method = RequestMethod.GET, value = "inquiry")
    public String getInquiry(@PathVariable Long userId,
                             Model model) {
        return "/For-backend-verification/enquiry";
    }

    @RequestMapping(method = RequestMethod.GET, value = "search")
    public String getSearch(@PathVariable Long userId,
                            Model model) {
        return "/For-backend-verification/search";
    }
}
