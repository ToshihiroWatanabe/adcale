package com.example.demo.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

/**
 * 予定のモデルクラスです。
 */
@Getter
@Setter
public class Schedule {
    private String id;
    private String calendarId;
    private LocalDate date;
    private String articleTitle;
    private String articleUrl;
    private String authorName;
    private String authorUrl;
    private String profileImageUrl;
}
