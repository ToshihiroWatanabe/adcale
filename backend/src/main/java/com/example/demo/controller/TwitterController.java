package com.example.demo.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TwitterのAPIに関するコントローラークラスです。
 */
@RestController
@RequestMapping("/api/twitter")
public class TwitterController {

    private String TWITTER_BEARER_TOKEN = System.getenv("TWITTER_BEARER_TOKEN");

    /**
     * ユーザーネームからユーザー情報を取得します。
     */
    @GetMapping("/2/users/by/username/{userName}")
    public String getUsersByUserName(@PathVariable String userName) {
        try {
            Document document = Jsoup
                    .connect("https://api.twitter.com/2/users/by/username/" + userName
                            + "?user.fields=profile_image_url")
                    .header("Authorization", "Bearer " + TWITTER_BEARER_TOKEN).ignoreContentType(true).get();
            return document.body().text();
        } catch (Exception e) {
            e.printStackTrace();
            return e.toString();
        }
    }
}
