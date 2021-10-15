package com.example.demo.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    /**
     * 指定されたURLのリクエストに対してindex.htmlを返します。
     * 
     * @param request
     * @return
     */
    @RequestMapping(value = { "/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}" })
    public String returnIndex(HttpServletRequest request) {
        return "/index.html";
    }
}
