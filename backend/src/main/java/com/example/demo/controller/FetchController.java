package com.example.demo.controller;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 他サイトの情報の取得に関するコントローラークラスです。
 */
@RestController
@RequestMapping("/api/fetch")
public class FetchController {

    /**
     * 与えられたURLのページタイトルを返します。
     * 
     * @param url URL
     * @return
     */
    @GetMapping("")
    public String fetch(@RequestParam String url) {
        // URLにhttp(s)://が付いていない場合は付ける
        if (!url.matches("^https?://")) {
            url = "http://" + url;
        }
        try {
            Document doc = Jsoup.connect(url).get();
            Elements elements = doc.select("head").select("title");
            return elements.text();
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }
}
